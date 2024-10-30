import React, { useState, useEffect, useRef } from "react"

// Components
import {
    Box,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    VStack,
    HStack,
    Text,
    Input,
    Button,
} from "@chakra-ui/react"

// Libraries
import { useSnackbar } from "notistack"

function ChatWindow({
    socketRef,
    documentId,
    user,
    isOpen,
    onClose,
    setUnreadCount,
}) {
    const { enqueueSnackbar } = useSnackbar

    const [messages, setMessages] = useState([])
    const [input, setInput] = useState("")

    const firstField = useRef()

    // Listen for incoming messages
    useEffect(() => {
        if (!socketRef.current) return

        // Handle incoming messages
        socketRef.current.on("receive_message", (message) => {
            // Add message to the list
            setMessages((prev) => [...prev, message])

            if (isOpen) return

            // Update unread count
            setUnreadCount((prev) => prev + 1)
        })

        return () => {
            socketRef.current.off("receive_message")
        }
    }, [socketRef, documentId, user, isOpen])

    // Reset badge when chat is opened
    useEffect(() => {
        if (!isOpen) return

        setUnreadCount(0)
    }, [isOpen])

    // Send message function
    const sendMessage = (e) => {
        e.preventDefault()

        if (!input.trim()) {
            enqueueSnackbar("Message is empty", { variant: "warning" })
            return
        }

        const message = {
            sender: user,
            text: input,
            timestamp: new Date(),
        }

        // Emit message to the server
        socketRef.current.emit("send_message", documentId, message)

        // Clear input
        setInput("")
    }

    return (
        <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            initialFocusRef={firstField}
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Live Chat</DrawerHeader>

                <DrawerBody>
                    <VStack>
                        {messages
                            .slice() // Create a shallow copy of messages
                            .reverse() // Reverse the order for newest at the top
                            .map((msg, index) => (
                                <Box
                                    key={index}
                                    bg="gray.100"
                                    _dark={{ bg: "gray.800" }}
                                    p={3}
                                    borderRadius="xl"
                                    width="full"
                                >
                                    <HStack justifyContent="space-between">
                                        <Text fontWeight="bold">
                                            {msg.sender.name}
                                        </Text>
                                        <Text fontSize="sm" color="gray.500">
                                            {new Date(
                                                msg.timestamp
                                            ).toLocaleTimeString()}
                                        </Text>
                                    </HStack>
                                    <Text>{msg.text}</Text>
                                </Box>
                            ))}
                    </VStack>
                </DrawerBody>

                <DrawerFooter>
                    <HStack width="full" as="form">
                        <Input
                            ref={firstField}
                            type="text"
                            placeholder="Type your message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <Button
                            colorScheme="blue"
                            onClick={sendMessage}
                            type="submit"
                        >
                            Send
                        </Button>
                    </HStack>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default ChatWindow
