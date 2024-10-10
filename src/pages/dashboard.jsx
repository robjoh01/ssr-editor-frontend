import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useUser } from "@/hooks/UserContext"
import useErrorHandler from "@/utils/errorHandler"

import {
    Box,
    Badge,
    Button,
    HStack,
    Heading,
    Text,
    Select,
    Grid,
    GridItem,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
} from "@chakra-ui/react"

import { BiPlus } from "react-icons/bi"

import { useMutation, useQuery } from "@tanstack/react-query"
import { createDocument, fetchAllDocuments } from "@/utils/api"

function Dashboard() {
    const navigate = useNavigate()
    const { user, isLoggedIn } = useUser()
    const { navigateToError } = useErrorHandler()

    useEffect(() => {
        if (!isLoggedIn) {
            navigateToError("unauthorized")
        }
    }, [isLoggedIn, navigateToError])

    const [activeFilters, setActiveFilters] = useState(["shared"])
    const [sortOption, setSortOption] = useState("lastUpdated")

    const handleFilterChange = (filter) => {
        setActiveFilters((prev) =>
            prev.includes(filter)
                ? prev.filter((f) => f !== filter)
                : [...prev, filter]
        )
    }

    const handleSortChange = (e) => {
        setSortOption(e.target.value)
    }

    // Fetch all documents with filters and sorting via the API
    const {
        data: documents,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["documents", activeFilters, sortOption],
        queryFn: () => {
            const grantArray = []

            if (activeFilters.includes("shared")) {
                grantArray.push("read")
            }
            if (activeFilters.includes("modifiable")) {
                grantArray.push("write")
            }

            // Call the API with the constructed filter
            return fetchAllDocuments({
                userId: user._id,
                grants: grantArray,
                sort: sortOption,
            })
        },
    })

    const [docData] = useState({
        title: "New Document",
        content: "",
    })

    const mutation = useMutation({
        mutationFn: (newDocument) => createDocument(newDocument),
        onSuccess: (data) => {
            console.log("Document created successfully:", data)
            navigate(`/document/${data.data.id}`)
        },
        onError: (error) => {
            console.error("Error creating document:", error)
        },
    })

    if (isLoading) return <Text>Loading...</Text>
    if (error) return <Text>Error fetching documents</Text>

    return (
        <Box p={5}>
            <section>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={6}
                >
                    <Box display="flex" gap={2}>
                        <Badge
                            variant={
                                activeFilters.includes("shared")
                                    ? "solid"
                                    : "outline"
                            }
                            cursor="pointer"
                            onClick={() => handleFilterChange("shared")}
                        >
                            Shared
                        </Badge>
                        <Badge
                            variant={
                                activeFilters.includes("modifiable")
                                    ? "solid"
                                    : "outline"
                            }
                            cursor="pointer"
                            onClick={() => handleFilterChange("modifiable")}
                        >
                            Modifiable
                        </Badge>
                    </Box>
                    <Select
                        width="180px"
                        onChange={handleSortChange}
                        defaultValue={sortOption}
                        placeholder="Sort by"
                    >
                        <option value="lastUpdated">Last Updated</option>
                        <option value="alphabetical">Alphabetical</option>
                    </Select>
                </Box>

                <Grid
                    templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
                    gap={6}
                >
                    <GridItem>
                        <Card
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Button
                                variant="outline"
                                width="full"
                                height="180px"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                onClick={() => mutation.mutate(docData)}
                            >
                                <HStack spacing={2}>
                                    <Text>
                                        {mutation.isLoading
                                            ? "Creating..."
                                            : "Create Document"}
                                    </Text>
                                    <BiPlus />
                                </HStack>
                            </Button>
                        </Card>
                    </GridItem>
                    {documents?.data.map((doc) => (
                        <GridItem key={doc.id}>
                            <Card>
                                <CardHeader>
                                    <Heading size="md">{doc.title}</Heading>
                                </CardHeader>
                                <CardBody>
                                    <Text fontSize="sm" color="gray.500">
                                        Last updated: {doc.lastUpdated}
                                    </Text>
                                    <Text fontSize="sm" color="gray.500">
                                        Owner: {doc.owner}
                                    </Text>
                                </CardBody>
                                <CardFooter
                                    display="flex"
                                    justifyContent="space-between"
                                >
                                    {doc.shared && <Badge>Shared</Badge>}
                                    {doc.modifiable && (
                                        <Badge variant="outline">
                                            Modifiable
                                        </Badge>
                                    )}
                                </CardFooter>
                            </Card>
                        </GridItem>
                    ))}
                </Grid>
            </section>
        </Box>
    )
}

export default Dashboard
