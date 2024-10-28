import React, { useState, useRef, useEffect } from "react"
import { useParams } from "react-router-dom"

import io from "socket.io-client"

import { Grid, GridItem, Spacer } from "@chakra-ui/react"

import { Loading } from "@/components/core"
import { TextEditor } from "@/components/actions"
import {
    Header,
    Footer,
    ViewerList,
    CommentHistory,
} from "@/components/document"
import { useAuth } from "@/systems/Auth"

// FIXME: Add ability to share the document
// FIXME: Add ability to comment on the document
// FIXME: Add document history

function DocumentPage() {
    const { user } = useAuth()
    const { id: documentId } = useParams()

    // Document's state
    const [title, setTitle] = useState("Untitled Document")
    const [content, setContent] = useState("")
    const [comments, setComments] = useState([])
    const [users, setUsers] = useState([])
    const [isProcessing, setIsProcessing] = useState(false)

    // Editor's state
    const contentRef = useRef(null)
    const socketRef = useRef(null)
    const sendTimeoutRef = useRef(null)

    useEffect(() => {
        if (!user) return

        const socket = io(import.meta.env.VITE_BACKEND_URL, {
            withCredentials: true,
            transports: ["websocket"],
        })

        const editor = contentRef.current.getEditor()
        editor.setText("")
        editor.disable()
        socketRef.current = socket

        socket.emit("join_room", documentId, user)

        socket.once("load_room", (document, comments) => {
            setTitle(document.title)
            setContent(document.content)
            setComments(comments)

            editor.setContents(document.content)
            editor.enable()

            contentRef.current?.focus()
        })

        socket.on("users_changed", (userList) => {
            setUsers(userList)
        })

        socket.on("save_pending", () => {
            editor.disable()
            setIsProcessing(true)
        })

        socket.on("save_success", (content) => {
            setContent(content)
            setIsProcessing(false)

            editor.setContents(content)
            editor.enable()

            contentRef.current?.focus()
        })

        socket.on("receive_changes", (content) => {
            setContent(content)
            editor.setContents(content)
        })

        editor.on("selection-change", (range) => {
            if (!range) return

            socket.emit("cursor_pending", {
                range,
                userId: socket.id,
                userName: user.name,
            })
        })

        socket.on(
            "cursor_changed",
            ({ range, userId, userName, colorDetails }) => {
                const cursors = editor.getModule("cursors")

                if (!cursors) return

                // Create a cursor for the user, if it doesn't exist.
                cursors.createCursor(userId, userName, colorDetails.color)

                // Move the cursor to the new range
                cursors.moveCursor(userId, range)
            }
        )

        return () => {
            socket.disconnect()
        }
    }, [documentId, user])

    const handleContentChange = (value, delta, source) => {
        if (socketRef.current == null || source !== "user") return

        clearTimeout(sendTimeoutRef.current)

        sendTimeoutRef.current = setTimeout(() => {
            const editor = contentRef.current.getEditor()
            const content = editor.getContents()

            socketRef.current.emit("send_changes", {
                title,
                content,
            })
            setContent(content)
        }, import.meta.env.VITE_SEND_DELAY)
    }

    return (
        <Grid templateRows="auto 1fr 10%" h="full">
            <GridItem>
                <Header
                    title={title}
                    onTitleChange={(e) => setTitle(e.target.value)}
                    isProcessing={isProcessing}
                    viewers={users}
                />
            </GridItem>
            <GridItem mt={4} display="flex" flexDirection="column">
                <TextEditor
                    ref={contentRef}
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
