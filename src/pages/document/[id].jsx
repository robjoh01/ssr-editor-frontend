import React, { useState, useRef, useEffect } from "react"
import { useParams } from "react-router-dom"

import {
    // Container,
    // Box,
    // useDisclosure,
    // VStack,
    Grid,
    GridItem,
    Spacer,
} from "@chakra-ui/react"

import io from "socket.io-client"

import {
    DocumentHeader,
    // DocumentFooter,
    // Toc,
    // Toolbar,
    // Comments,
    // CommentBubble,
} from "@/components/document"

import { TextEditor } from "@/components/actions"

// TODO: Watch this video: https://www.youtube.com/watch?v=Ytc0XfkNbVQ&t=1305s

// TODO: Check user's privileges to access the document

function DocumentPage() {
    const { id } = useParams()

    const inputRef = useRef(null)
    const [socket, setSocket] = useState(null)

    const [title, setTitle] = useState("Untitled Document")
    const [content, setContent] = useState("")

    // Debounce timer for saving
    const saveTimeoutRef = useRef(null)

    // Track last content to prevent unnecessary saves
    const lastContentRef = useRef(null)

    useEffect(() => {
        const socket = io(import.meta.env.VITE_BACKEND_URL)
        const editor = inputRef.current.getEditor()

        inputRef.current?.focus()

        // Initialize the editor as disabled until the document is loaded
        editor.disable()
        editor.setText("Fetching...")
        setSocket(socket)

        // Join the room for the document
        socket.emit("join-room", id)

        // Load the document once from the server
        socket.once("load-room", (document) => {
            editor.setContents(document.content)
            editor.enable() // Enable editor after loading

            setTitle(document.title)
            setContent(document.content)

            lastContentRef.current = document.content // Save initial content state
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
    }, [])

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
            }
        }, import.meta.env.VITE_SAVE_DELAY)
    }

    return (
        <Grid templateRows="auto 1fr 10%" h="full">
            <GridItem>
                <DocumentHeader title={title} />
            </GridItem>
            <GridItem mt={4} display="flex" flexDirection="column">
                <TextEditor
                    ref={inputRef}
                    value={content}
                    onChange={handleContentChange}
                />
            </GridItem>
            <GridItem>
                <Spacer />
            </GridItem>
        </Grid>
    )
}

export default DocumentPage
