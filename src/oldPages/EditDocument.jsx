import React, { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { useMutation, useQuery } from "@tanstack/react-query"
import { fetchDocument, updateDocument, deleteDocument } from "../utils/api"

import {
    Flex,
    Skeleton,
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
        select: (response) => response.data,
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
        isLoading: isUpdating,
        isError: isUpdateError,
        error: updateError,
    } = useMutation({
        mutationFn: (data) => updateDocument(data),
        onSuccess: () => {
            console.log("Document updated successfully")
        },
    })

    // Mutation for deleting the document
    const {
        mutate: deleteMutate,
        isLoading: isDeleting,
        isError: isDeleteError,
        error: deleteError,
    } = useMutation({
        mutationFn: () => deleteDocument(id),
        onSuccess: () => {
            console.log("Document deleted successfully")
            navigate("/")
        },
    })

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault()
        const documentData = { title, content, ownerId, isLocked }
        updateMutate({ id, document: documentData })
    }

    // Centered loading spinner or skeletons for loading states
    if (isFetchingDocument) {
        return (
            <Flex justify="center" align="center" height="100vh">
                <Spinner size="xl" />
            </Flex>
        )
    }

    if (fetchError) {
        return (
            <Alert status="error" mb={4}>
                <AlertIcon />
                {fetchError.message || "Failed to fetch document."}
            </Alert>
        )
    }

    return (
        <>
            <Heading as="h1" size="xl" mb={4}>
                Redigera Dokument
            </Heading>
            <form onSubmit={handleSubmit}>
                <FormControl mb={4}>
                    <FormLabel>Dokument Titel</FormLabel>
                    {isFetchingDocument ? (
                        <Skeleton height="40px" />
                    ) : (
                        <Input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Skriv dokumentets titel"
                            required
                            _placeholder={{ color: "gray.500" }}
                        />
                    )}
                </FormControl>

                <FormControl mb={4}>
                    <FormLabel>Dokument Innehåll</FormLabel>
                    {isFetchingDocument ? (
                        <Skeleton height="100px" />
                    ) : (
                        <Textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Skriv innehållet för dokumentet"
                            required
                            _placeholder={{ color: "gray.500" }}
                        />
                    )}
                </FormControl>

                <FormControl mb={4}>
                    <FormLabel>ID av Ägare</FormLabel>
                    {isFetchingDocument ? (
                        <Skeleton height="40px" />
                    ) : (
                        <Input
                            type="text"
                            value={ownerId}
                            onChange={(e) => setOwnerId(e.target.value)}
                            placeholder="Skriv ägarens ID"
                            required
                            _placeholder={{ color: "gray.500" }}
                        />
                    )}
                </FormControl>

                <FormControl mb={4}>
                    {isFetchingDocument ? (
                        <Skeleton height="20px" width="150px" />
                    ) : (
                        <Checkbox
                            isChecked={isLocked}
                            onChange={(e) => setIsLocked(e.target.checked)}
                        >
                            Låst dokument
                        </Checkbox>
                    )}
                </FormControl>

                <Box mb={4} display="flex" gap={4}>
                    <Button
                        colorScheme="green"
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

                {/* Error Alerts for Updates and Deletes */}
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
