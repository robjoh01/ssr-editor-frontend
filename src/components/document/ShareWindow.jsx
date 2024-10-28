import React, { useState, useEffect } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "@/utils/axios.js"
import {
    Text,
    Button,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    List,
    ListItem,
    Checkbox,
    Skeleton,
    Alert,
    Divider,
} from "@chakra-ui/react"
import { useSnackbar } from "notistack"

const SAVE_DELAY = 2000

function ShareWindow({ isOpen, onClose }) {
    const { enqueueSnackbar } = useSnackbar()
    const [input, setInput] = useState("")
    const [debouncedInput, setDebouncedInput] = useState(input)
    const [selectedUsers, setSelectedUsers] = useState([]) // To track selected users

    // Debounce input when modal is open
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                setDebouncedInput(input)
            }, 500) // Adjust the debounce delay as needed

            return () => clearTimeout(timer)
        }
    }, [input, isOpen])

    // Function to fetch emails by debounced input
    const fetchEmails = async () => {
        if (!debouncedInput || !isOpen) return null

        const response = await axios.post("/graphql", {
            query: `
                query EmailQuery($email: String!) {
                    usersByEmail(email: $email) {
                        name,
                        email
                    }
                }
            `,
            variables: { email: debouncedInput },
        })

        return response.data
    }

    // Query to get emails based on debounced input
    const emailQuery = useQuery({
        queryKey: ["usersByEmail", debouncedInput, isOpen],
        queryFn: fetchEmails,
        enabled: !!debouncedInput && isOpen, // Fetch only if input and modal is open
        suspense: false,
    })

    // Mutation to share document with selected email
    const shareDocumentMutation = useMutation({
        mutationFn: async () => {
            const emailsToShare = selectedUsers.map((user) => ({
                email: user.email,
                canWrite: user.canWrite,
            }))

            await axios.post("/graphql", {
                query: `
                    mutation ShareDocument($emails: [UserInput!]!) {
                        shareDocument(emails: $emails) {
                            success
                        }
                    }
                `,
                variables: { emails: emailsToShare },
            })
        },
        onSuccess: () => {
            enqueueSnackbar("Document shared successfully", {
                variant: "success",
            })
            onClose() // Close modal on success
        },
        onError: (error) => {
            const errorMessage =
                error.response?.data || "An unknown error occurred"
            enqueueSnackbar(`Failed to share document: ${errorMessage}`, {
                variant: "error",
            })
        },
    })

    const handleInputChange = (e) => {
        setInput(e.target.value)
    }

    const handleUserSelect = (user) => {
        setSelectedUsers((prev) => {
            const isAlreadySelected = prev.some((u) => u.email === user.email)
            if (isAlreadySelected) {
                return prev.filter((u) => u.email !== user.email)
            } else {
                return [...prev, { ...user, canWrite: false }] // Default canWrite to false
            }
        })
    }

    const handleCheckboxChange = (email) => {
        setSelectedUsers((prev) =>
            prev.map((user) =>
                user.email === email
                    ? { ...user, canWrite: !user.canWrite }
                    : user
            )
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        shareDocumentMutation.mutate()
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Share Document</ModalHeader>
                <ModalBody>
                    {/* Input field to search for emails with debounce */}
                    <Input
                        placeholder="Search emails..."
                        value={input}
                        onChange={handleInputChange}
                        autoFocus
                    />

                    {/* Display search results */}
                    {emailQuery.isFetching ? (
                        <List spacing={3} mt={4}>
                            {[...Array(5)].map((_, i) => (
                                <ListItem key={i}>
                                    <Skeleton height="20px" />
                                </ListItem>
                            ))}
                        </List>
                    ) : emailQuery.error ? (
                        <Alert status="error" mt={4}>
                            Error fetching emails
                        </Alert>
                    ) : (
                        <List spacing={3} mt={4}>
                            {emailQuery.data?.data?.usersByEmail?.map(
                                (user, index) => (
                                    <ListItem
                                        key={index}
                                        py={2}
                                        px={3}
                                        border="1px solid"
                                        borderRadius="md"
                                        bg={
                                            selectedUsers.some(
                                                (u) => u.email === user.email
                                            )
                                                ? "blue.100"
                                                : "white"
                                        } // Highlight selected users
                                        onClick={() => handleUserSelect(user)}
                                        cursor="pointer"
                                    >
                                        <Checkbox
                                            isChecked={selectedUsers.some(
                                                (u) => u.email === user.email
                                            )}
                                            onChange={() =>
                                                handleUserSelect(user)
                                            }
                                        >
                                            {user.name} ({user.email})
                                        </Checkbox>
                                    </ListItem>
                                )
                            )}
                        </List>
                    )}
                    <Divider my={4} />

                    <List spacing={3} mt={4}>
                        <strong>Selected Users:</strong>
                        {selectedUsers.length === 0 ? (
                            <ListItem>No users selected</ListItem>
                        ) : (
                            selectedUsers.map((user, index) => (
                                <ListItem
                                    key={index}
                                    py={2}
                                    px={3}
                                    border="1px solid"
                                    borderRadius="md"
                                    bg="green.100"
                                >
                                    <Text>
                                        {user.name} ({user.email})
                                    </Text>
                                    <Checkbox
                                        isChecked={user.canWrite}
                                        onChange={() =>
                                            handleCheckboxChange(user.email)
                                        }
                                        ml={4}
                                    >
                                        Can Write
                                    </Checkbox>
                                </ListItem>
                            ))
                        )}
                    </List>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                        Share
                    </Button>
                    <Button variant="ghost" onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ShareWindow
