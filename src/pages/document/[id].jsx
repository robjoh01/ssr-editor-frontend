import React, { useState, useRef, useEffect } from "react"
import { useParams } from "react-router-dom"

import io from "socket.io-client"
import { useAuth } from "@/auth/index"

import {
    // Container,
    // Box,
    // useDisclosure,
    // VStack,
    Grid,
    GridItem,
    Spacer,
} from "@chakra-ui/react"

import {
    DocumentHeader,
    // DocumentFooter,
    // Toc,
    // Comments,
    // CommentBubble,
} from "@/components/document"

import { TextEditor } from "@/components/actions"
import { Loading } from "@/components/core"

// FIXME: Add prompt for share the document
// FIXME: Add ability to comment on the document

// TODO: Add table of contents
// TODO: Fix viewer list

function onAddComment(callback) {
    // get called when `ADD COMMENT` btn on options bar is clicked
    console.log("commentAddClick")

    // UX works to get comment from user, like showing modal dialog
    // $('#inputCommentModal').modal('show');
    // But after whatever UX works, call the `callback` with comment to pass back comment

    const comment = "test comment"
    callback(comment)
}

function onClickedComments() {
    // comments btn callback
    // get called when you click `COMMENTS` btn on options bar for you to do additional things beside color on/off. Color on/off is already done before the callback is called.
}

function DocumentPage() {
    const { user } = useAuth()
    const { id } = useParams()

    const [isPending, setIsPending] = useState(false)

    const [isProcessing, setIsProcessing] = useState(false)

    const inputRef = useRef(null)
    const [socket, setSocket] = useState(null)

    const [title, setTitle] = useState("Untitled Document")
    const [content, setContent] = useState("")

    // Debounce timer for saving
    const saveTimeoutRef = useRef(null)

    // Track last content to prevent unnecessary saves
    const lastContentRef = useRef(null)

    useEffect(() => {
        const socket = io(import.meta.env.VITE_BACKEND_URL, {
            withCredentials: true,
            transports: ["websocket"],
        })
        const editor = inputRef.current.getEditor()

        inputRef.current?.focus()

        // Initialize the editor as disabled until the document is loaded
        editor.disable()
        editor.setText("Fetching...")
        setSocket(socket)
        setIsPending(true)

        // Join the room for the document
        socket.emit("join-room", id)

        // Load the document once from the server
        socket.once("load-room", (document) => {
            editor.setContents(document.content)
            editor.enable() // Enable editor after loading

            setTitle(document.title)
            setContent(document.content)

            lastContentRef.current = document.content // Save initial content state

            setIsPending(false)
        })

        socket.on("cursor-update", ({ range, userId }) => {
            const cursors = editor.getModule("cursors")

            if (cursors) {
                cursors.createCursor(userId, "User " + userId, "blue") // Custom cursor appearance
                cursors.moveCursor(userId, range)
            }
        })

        // Update the editor content when receiving changes from other users
        socket.on("receive-changes", (delta, receivedId) => {
            if (inputRef.current == null || id !== receivedId) return
            editor.updateContents(delta)
            setIsProcessing(true)
        })

        // Send local cursor changes to the server
        editor.on("selection-change", (range) => {
            if (range) {
                socket.emit("cursor-update", { range, userId: socket.id })
            }
        })

        return () => {
            socket.emit("leave-room", id)

            socket.off("cursor-update")
            socket.off("receive-changes")

            // Disconnect from the socket
            socket.disconnect()
        }
    }, [id])

    // Handle content changes with debounce
    const handleContentChange = (value, delta, source) => {
        if (socket == null || source !== "user") return // Only handle user input

        // Send changes to other clients
        socket.emit("send-changes", delta)

        // Clear the previous save timeout
        clearTimeout(saveTimeoutRef.current)

        // Debounce: Save only if there are no changes for 2 seconds
        saveTimeoutRef.current = setTimeout(() => {
            if (value !== lastContentRef.current) {
                const editor = inputRef.current.getEditor()
                socket.emit("save-changes", editor.getContents()) // Send updated content to server
                lastContentRef.current = editor.getContents() // Track the last saved content
                setIsProcessing(true)
            }
        }, import.meta.env.VITE_SAVE_DELAY)
    }

    const processTimeout = useRef(null)

    useEffect(() => {
        clearTimeout(processTimeout.current)

        // Hide spinner after 1.5 seconds
        processTimeout.current = setTimeout(() => {
            setIsProcessing(false)
        }, 1500)
    }, [isProcessing])

    if (isPending) {
        return <Loading />
    }

    return (
        <Grid templateRows="auto 1fr 10%" h="full">
            <GridItem>
                <DocumentHeader title={title} isProcessing={isProcessing} />
            </GridItem>
            <GridItem mt={4} display="flex" flexDirection="column">
                <TextEditor
                    ref={inputRef}
                    value={content}
                    onChange={handleContentChange}
                    userId={123}
                    userName={"User 123"}
                    onAddComment={onAddComment}
                    onClickedComments={onClickedComments}
                />
            </GridItem>
            <GridItem>
                <Spacer />
            </GridItem>
        </Grid>
    )
}

export default DocumentPage
