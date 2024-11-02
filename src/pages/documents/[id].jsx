import React, { useState, useRef, useEffect } from "react"
import { useParams } from "react-router-dom"

// Libraries
import io from "socket.io-client"
import { useAuth } from "@/systems/Auth"
import { useErrorBoundary } from "react-error-boundary"

// API
import axios from "@/utils/axios.js"
import { useQuery } from "@tanstack/react-query"

// Components
import { Grid, GridItem, Skeleton } from "@chakra-ui/react"
import { TextEditor } from "@/components/actions"
import { Header, CommentContextMenu } from "@/components/document"

function DocumentPage() {
    const { user } = useAuth()
    const { id: documentId } = useParams()
    const { showBoundary } = useErrorBoundary()

    // Document's state
    const [isOwner, setIsOwner] = useState(false)
    const [title, setTitle] = useState("Untitled Document")
    const [content, setContent] = useState("")
    const [users, setUsers] = useState([])
    const [isProcessing, setIsProcessing] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [textRange, setTextRange] = useState({ index: 0, length: 0 })

    // Editor's state
    const contentRef = useRef(null)
    const socketRef = useRef(null)
    const saveTimeoutRef = useRef(null)

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

        socket.once("error", (error) => {
            showBoundary(new Error(error))
        })

        socket.emit("join_room", documentId, user)

        socket.once("load_room", async (document) => {
            contentRef.current?.focus()
            editor.enable()

            setIsOwner(document.ownerId === user._id)
            setTitle(document.title)
            setContent(document.content)
            setIsLoading(false)
        })

        socket.on("users_changed", (userList) => {
            setUsers(userList)
        })

        socket.on("save_incoming", () => {
            editor.disable()
            setIsProcessing(true)
        })

        socket.on("save_complete", (data) => {
            editor.enable()

            const { title = null, content = null } = data

            if (title) setTitle(title)
            if (content) setContent(content)
            setIsProcessing(false)
        })

        socket.on("receive_changes", (content) => {
            setContent(content)
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

        const editor = contentRef.current.getEditor()
        const content = editor.getContents()
        socketRef.current.emit("send_changes", content)

        clearTimeout(saveTimeoutRef.current)

        saveTimeoutRef.current = setTimeout(() => {
            socketRef.current.emit("save_changes", { title, content })
        }, import.meta.env.VITE_SAVE_DELAY)
    }

    const handleCommentHighlight = (comment) => {
        const editor = contentRef.current.getEditor()

        // Extract index and length from the position string
        const [index, length] = comment.position.split(":").map(Number)

        console.log(index, length)

        // Set selection in the editor
        editor.setSelection(index, length)
    }

    const handleSelectionChange = (range) => {
        if (!range) return

        setTextRange(range)
    }

    const commentsQuery = useQuery({
        queryKey: ["comments", documentId],
        queryFn: async () => {
            const response = await axios.post("/graphql", {
                query: `
                query($id: ID!) {
                    myself {
                        document(id: $id) {
                            comments {
                                id,
                                position,
                                content,
                                user {
                                    id,
                                    name,
                                    email
                                },
                                createdAt,
                                updatedAt
                            }
                        }
                    }
                }
            `,
                variables: { id: documentId },
            })
            return response.data.data.myself.document.comments
        },
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        suspense: false,
        enabled: false,
    })

    useEffect(() => {
        const editor = contentRef.current.getEditor()
        editor.setContents(content)

        contentRef.current?.focus()
    }, [content])

    return (
        <Grid templateRows="auto 1fr 10%" height="full">
            <GridItem>
                <Skeleton isLoaded={!isLoading}>
                    <Header
                        title={title}
                        setTitle={setTitle}
                        isProcessing={isProcessing}
                        documentId={documentId}
                        isOwner={isOwner}
                        viewers={users}
                        comments={commentsQuery.data || []}
                        onCommentHighlight={handleCommentHighlight}
                        onCommentsRefresh={async () =>
                            await commentsQuery.refetch()
                        }
                        onCommentsLoading={commentsQuery.isFetching}
                        socketRef={socketRef}
                    />
                </Skeleton>
            </GridItem>
            <GridItem mt={4} height="full">
                <Skeleton
                    isLoaded={!isLoading}
                    display="flex"
                    flexDirection="column"
                    height="full"
                >
                    <TextEditor
                        ref={contentRef}
                        onChange={handleContentChange}
                        onChangeSelection={handleSelectionChange}
                    />
                </Skeleton>
            </GridItem>
            <GridItem position="relative">
                {textRange.length > 0 && (
                    <CommentContextMenu
                        documentId={documentId}
                        textRange={textRange}
                    />
                )}
            </GridItem>
        </Grid>
    )
}

export default DocumentPage
