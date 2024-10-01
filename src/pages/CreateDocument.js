import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { createDocument } from "../api"

import {
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
    const [content, setContent] = useState("")
    const [ownerId, setOwnerId] = useState("")
    const [isLocked, setIsLocked] = useState(false)
    const [error, setError] = useState(null)

    // Mutation for creating a document
    const mutation = useMutation({
        mutationFn: createDocument,
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

    return (
        <>
            <Heading as="h1" size="xl" mb={4}>
                Skapa Nytt Dokument
            </Heading>
            <form onSubmit={handleSubmit}>
                <FormControl mb={4}>
                    <FormLabel>Dokument Titel</FormLabel>
                    <Input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Skriv dokumentets titel"
                        required
                    />
                </FormControl>

                <FormControl mb={4}>
                    <FormLabel>Dokument Innehåll</FormLabel>
                    <Textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Skriv innehållet för dokumentet"
                        required
                    />
                </FormControl>

                <FormControl mb={4}>
                    <FormLabel>ID av Ägare</FormLabel>
                    <Input
                        type="text"
                        value={ownerId}
                        onChange={(e) => setOwnerId(e.target.value)}
                        placeholder="Skriv ägarens ID"
                        required
                    />
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
                        colorScheme="teal"
                        type="submit"
                        isLoading={mutation.isLoading}
                    >
                        Spara
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
