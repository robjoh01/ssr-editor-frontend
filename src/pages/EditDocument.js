import React, { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { useMutation, useQuery } from "@tanstack/react-query"
import { fetchDocument, updateDocument, deleteDocument } from "../api"

import {
    Box,
    Button,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Checkbox,
    Spinner,
    Alert,
    AlertIcon,
} from "@chakra-ui/react"

const EditDocument = () => {
    const navigate = useNavigate()
    const { id } = useParams() // Get the document ID from URL params

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [ownerId, setOwnerId] = useState("")
    const [isLocked, setIsLocked] = useState(false)

    // Query to fetch the document
    const {
        data: document,
        isLoading: isFetchingDocument,
        error: fetchError,
    } = useQuery({
        queryKey: ["document", id],
        queryFn: () => fetchDocument(id),
        enabled: !!id, // Only run query if id is available
    })

    useEffect(() => {
        // TODO: Check if document is alive, otherwise navigate to 404

        if (document) {
            setTitle(document.title)
            setContent(document.content)
            setOwnerId(document.ownerId)
            setIsLocked(document.isLocked)
        }
    }, [document])

    // Mutation for updating the document
    const {
        mutate: updateMutate,
        isPending: isUpdating,
        isError: isUpdateError,
        error: updateError,
    } = useMutation({
        mutationFn: (data) => updateDocument(data),
        onSuccess: () => {
            console.log("Document updated successfully")
            // Optionally navigate or show a success message
        },
        onError: (err) => {
            console.error("Error updating document:", err)
        },
    })

    // Mutation for deleting the document
    const {
        mutate: deleteMutate,
        isPending: isDeleting,
        isError: isDeleteError,
        error: deleteError,
    } = useMutation({
        mutationFn: () => deleteDocument(id),
        onSuccess: () => {
            console.log("Document deleted successfully")
            navigate("/")
        },
        onError: (err) => {
            console.error("Error deleting document:", err)
        },
    })

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault()

        const documentData = { title, content, ownerId, isLocked }

        // Trigger the mutation with the document ID and the new data
        updateMutate({ id, document: documentData })
    }

    // Loading state for both fetching and mutation
    if (isFetchingDocument || isUpdating || isDeleting) {
        return <Spinner size="xl" />
    }

    if (fetchError)
        return (
            <div>
                Error: {fetchError.message || "Failed to fetch document."}
            </div>
        )

    return (
        <>
            <Heading as="h1" size="xl" mb={4}>
                Redigera Dokument
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
                        isLoading={isUpdating}
                    >
                        Uppdatera
                    </Button>

                    <Button colorScheme="orange" as={Link} to="/">
                        Tillbaka
                    </Button>

                    <Button
                        colorScheme="red"
                        ml={4}
                        onClick={() => deleteMutate()}
                        isLoading={isDeleting}
                    >
                        Ta bort
                    </Button>
                </Box>

                {isUpdateError && (
                    <Alert status="error" mt={4}>
                        <AlertIcon />
                        {updateError.message || "Failed to update document."}
                    </Alert>
                )}
                {isDeleteError && (
                    <Alert status="error" mt={4}>
                        <AlertIcon />
                        {deleteError.message || "Failed to delete document."}
                    </Alert>
                )}
            </form>
        </>
    )
}

export default EditDocument
