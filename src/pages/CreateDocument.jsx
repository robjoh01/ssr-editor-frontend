import React from "react"
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { createDocument } from "../api"

import {
    Flex,
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Checkbox,
    Button,
    Alert,
    AlertIcon,
    Spinner,
} from "@chakra-ui/react"

const CreateDocument = () => {
    const navigate = useNavigate()
    const [title, setTitle] = useState("")
    const [titleHasFocus, setTitleHasFocus] = useState(true)
    const [content, setContent] = useState("")
    const [contentHasFocus, setContentHasFocus] = useState(true)
    const [ownerId, setOwnerId] = useState("")
    const [ownerIdHasFocus, setOwnerIdHasFocus] = useState(true)
    const [isLocked, setIsLocked] = useState(false)
    const [error, setError] = useState(null)

    // Mutation for creating a document
    const mutation = useMutation({
        mutationFn: createDocument,
        select: (response) => response.data,
        onSuccess: () => {
            navigate("/")
        },
        onError: (err) => {
            console.error("Error creating document:", err)
            setError("Failed to create document. Please try again.")
        },
    })

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault()

        const data = {
            title,
            content,
            ownerId,
            isLocked,
        }

        mutation.mutate(data) // Trigger the mutation with the document data
    }

    // Loading state - Show centered spinner and skeleton
    if (mutation.isLoading) {
        return (
            <Flex align="center" justify="center" height="100vh">
                <Spinner size="xl" />
            </Flex>
        )
    }

    return (
        <>
            <Heading as="h1" size="xl" mb={4}>
                Skapa Nytt Dokument
            </Heading>
            <form onSubmit={handleSubmit}>
                <FormControl mb={4} isRequired>
                    <FormLabel>Dokument Titel</FormLabel>
                    <Input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Skriv dokumentets titel"
                        required
                        onFocus={() => setTitleHasFocus(true)}
                        onBlur={() => setTitleHasFocus(false)}
                        _placeholder={{ color: "gray.500" }}
                    />
                    {title.trim() === "" && !titleHasFocus && (
                        <Alert status="warning" mt={2}>
                            <AlertIcon />
                            Titel krävs.
                        </Alert>
                    )}
                </FormControl>

                <FormControl mb={4} isRequired>
                    <FormLabel>Dokument Innehåll</FormLabel>
                    <Textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Skriv innehållet för dokumentet"
                        required
                        onFocus={() => setContentHasFocus(true)}
                        onBlur={() => setContentHasFocus(false)}
                        _placeholder={{ color: "gray.500" }}
                    />
                    {content.trim() === "" && !contentHasFocus && (
                        <Alert status="warning" mt={2}>
                            <AlertIcon />
                            Innehåll krävs.
                        </Alert>
                    )}
                </FormControl>

                <FormControl mb={4} isRequired>
                    <FormLabel>ID av Ägare</FormLabel>
                    <Input
                        type="text"
                        value={ownerId}
                        onChange={(e) => setOwnerId(e.target.value)}
                        placeholder="Skriv ägarens ID"
                        required
                        onFocus={() => setOwnerIdHasFocus(true)}
                        onBlur={() => setOwnerIdHasFocus(false)}
                        _placeholder={{ color: "gray.500" }}
                    />
                    {ownerId.trim() === "" && !ownerIdHasFocus && (
                        <Alert status="warning" mt={2}>
                            <AlertIcon />
                            Ägarens ID krävs.
                        </Alert>
                    )}
                </FormControl>

                <FormControl mb={4}>
                    <Checkbox
                        isChecked={isLocked}
                        onChange={(e) => setIsLocked(e.target.checked)}
                    >
                        Låst dokument
                    </Checkbox>
                </FormControl>

                <Box mb={4} display="flex" gap={4}>
                    <Button
                        colorScheme="green"
                        type="submit"
                        isLoading={mutation.isLoading}
                    >
                        Skapa
                    </Button>

                    <Button colorScheme="orange" as={Link} to="/">
                        Tillbaka
                    </Button>
                </Box>

                {error && (
                    <Alert status="error" mt={4}>
                        <AlertIcon />
                        {error}
                    </Alert>
                )}
            </form>
        </>
    )
}

export default CreateDocument
