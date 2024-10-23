import React, { useState, useRef, useEffect } from "react"
import { useParams } from "react-router-dom"

import io from "socket.io-client"
import { useAuth } from "@/auth/index"

import { Grid, GridItem, Spacer } from "@chakra-ui/react"

import { Loading } from "@/components/core"
import { TextEditor } from "@/components/actions"
import { DocumentHeader } from "@/components/document"

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
    const [title, setTitle] = useState("Untitled Document")
    const [content, setContent] = useState("")

    const inputRef = useRef(null)
    const socketRef = useRef(null)

    const isProcessingRef = useRef(false)
    const [isProcessing, setIsProcessing] = useState(false)

    const saveTimeoutRef = useRef(null)
    const lastContentRef = useRef(null)
    const processTimeout = useRef(null)

    useEffect(() => {
        const socket = io(import.meta.env.VITE_BACKEND_URL, {
            withCredentials: true,
            transports: ["websocket"],
        })
        const editor = inputRef.current.getEditor()

        inputRef.current?.focus()

        editor.disable()
        editor.setText("Fetching...")
        socketRef.current = socket
        setIsPending(true)

        socket.emit("join-room", id)

        socket.once("load-room", (document) => {
            editor.setContents(document.content)
            editor.enable()

            setTitle(document.title)
            setContent(document.content)
            lastContentRef.current = document.content

            setIsPending(false)
        })

        socket.on("cursor-update", ({ range, userId }) => {
            const cursors = editor.getModule("cursors")

            if (cursors) {
                cursors.createCursor(userId, "User " + userId, "blue")
                cursors.moveCursor(userId, range)
            }
        })

        socket.on("receive-changes", (delta, receivedId) => {
            if (inputRef.current == null || id !== receivedId) return
            editor.updateContents(delta)
            setProcessingState(true) // Use ref to avoid re-rendering
        })

        editor.on("selection-change", (range) => {
            if (range) {
                socket.emit("cursor-update", { range, userId: socket.id })
            }
        })

        return () => {
            socket.emit("leave-room", id)
            socket.off("cursor-update")
            socket.off("receive-changes")
            socket.disconnect()
        }
    }, [id])

    // Update processing status using ref
    const setProcessingState = (state) => {
        isProcessingRef.current = state
        // Set state for UI updates
        setIsProcessing(state)
    }

    const handleContentChange = (value, delta, source) => {
        if (socketRef.current == null || source !== "user") return

        socketRef.current.emit("send-changes", delta)

        clearTimeout(saveTimeoutRef.current)

        saveTimeoutRef.current = setTimeout(() => {
            if (value !== lastContentRef.current) {
                const editor = inputRef.current.getEditor()
                socketRef.current.emit("save-changes", editor.getContents())
                lastContentRef.current = editor.getContents()
                setProcessingState(true)
            }
        }, import.meta.env.VITE_SAVE_DELAY)
    }

    useEffect(() => {
        clearTimeout(processTimeout.current)

        // Hide spinner after 1.5 seconds
        if (isProcessingRef.current) {
            processTimeout.current = setTimeout(() => {
                setProcessingState(false)
            }, 1500)
        }
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
                />
            </GridItem>
            <GridItem>
                <Spacer />
            </GridItem>
        </Grid>
    )
}

export default DocumentPage
