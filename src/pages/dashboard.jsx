import React, { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"

import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "@/utils/axios.js"

import {
    Box,
    Badge,
    Select,
    Grid,
    GridItem,
    Text,
    Button,
    Heading,
    VStack,
    HStack,
    IconButton,
    Divider,
    CardHeader,
    CardBody,
    CardFooter,
} from "@chakra-ui/react"
import { BiPlus, BiTrash } from "react-icons/bi"
import PortraitCard from "@/components/visuals/PortraitCard.jsx"
import TextTruncate from "react-text-truncate"

import moment from "moment"

function Dashboard() {
    const navigate = useNavigate()

    const [activeFilters, setActiveFilters] = useState(["owned", "shared"])
    const [sortOption, setSortOption] = useState("lastUpdated")
    const [documents, setDocuments] = useState([])

    const myselfQuery = useQuery({
        queryKey: ["myself"],
        queryFn: () => {
            return axios.post("/graphql", {
                query: `
                    query UsersQuery {
                        myself {
                            ownedDocuments {
                                id,
                                title,
                                createdAt,
                                updatedAt
                                owner {
                                    name
                                }
                            },

                            sharedDocuments {
                                id,
                                title,
                                createdAt,
                                updatedAt
                                owner {
                                    name
                                }
                            }
                        }
                    }`,
            })
        },
    })

    const newDocumentMutation = useMutation({
        mutationFn: () => {
            return axios.post("documents", {
                title: "New Document",
            })
        },
        onSuccess: ({ data }) => {
            navigate(`/document/${data._id}`)
        },
        onError: (error) => {
            console.error("Error creating document:", error)
        },
    })

    const deleteDocumentMutation = useMutation({
        mutationFn: (id) => {
            return axios.delete(`documents/${id}`)
        },
        onSuccess: () => {
            // Update documents
            myselfQuery.refetch()
        },
        onError: (error) => {
            console.error("Error deleting document:", error)
        },
    })

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

    useEffect(() => {
        if (!myselfQuery.data) return

        const data = myselfQuery.data.data.data.myself

        if (!data) return []

        let docs = []

        if (activeFilters.includes("owned")) {
            docs = [...docs, ...data.ownedDocuments]
        }
        if (activeFilters.includes("shared")) {
            docs = [...docs, ...data.sharedDocuments]
        }
        // Default to showing both owned and shared if no filter is selected
        if (docs.length === 0) {
            docs = [...data.ownedDocuments, ...data.sharedDocuments]
        }

        // Sorting based on selected option
        if (sortOption === "lastUpdated") {
            docs.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        } else if (sortOption === "alphabetical") {
            docs.sort((a, b) => a.title.localeCompare(b.title))
        }

        setDocuments(docs)
    }, [myselfQuery.data, activeFilters, sortOption])

    return (
        <Box p={5} as="section">
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={6}
            >
                <Box display="flex" gap={2}>
                    <Badge
                        variant={
                            activeFilters.includes("owned")
                                ? "solid"
                                : "outline"
                        }
                        cursor="pointer"
                        onClick={() => handleFilterChange("owned")}
                    >
                        Owned
                    </Badge>
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
                    <PortraitCard>
                        <Button
                            variant="outline"
                            minWidth="full"
                            minHeight="full"
                            onClick={() => newDocumentMutation.mutate()}
                        >
                            <HStack
                                spacing={2}
                                minWidth="full"
                                minHeight="full"
                                justifyContent="center"
                            >
                                <Text>Create Document</Text>
                                <BiPlus />
                            </HStack>
                        </Button>
                    </PortraitCard>
                </GridItem>
                {documents.map((doc) => (
                    <GridItem key={doc.id}>
                        <Link to={`/document/${doc.id}`}>
                            <PortraitCard>
                                <CardHeader
                                    display="flex"
                                    flexDirection="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    pb={2}
                                >
                                    <Heading size="md" fontWeight="bold">
                                        <TextTruncate
                                            line={2}
                                            element="span"
                                            truncateText="..."
                                            text={doc.title}
                                        />
                                    </Heading>
                                    <IconButton
                                        icon={<BiTrash />}
                                        variant="ghost"
                                        size="sm"
                                        aria-label="Delete document"
                                        onClick={() =>
                                            deleteDocumentMutation.mutate(
                                                doc.id
                                            )
                                        }
                                        color="red.500"
                                    />
                                </CardHeader>

                                <CardBody>
                                    <VStack align="flex-start" spacing={2}>
                                        <Text fontSize="sm" color="gray.600">
                                            <Text
                                                as="span"
                                                fontWeight="semibold"
                                            >
                                                Author:
                                            </Text>{" "}
                                            {doc.owner.name}
                                        </Text>
                                        <Text fontSize="sm" color="gray.600">
                                            <Text
                                                as="span"
                                                fontWeight="semibold"
                                            >
                                                Created:
                                            </Text>{" "}
                                            {moment(
                                                doc.createdAt,
                                                "YYYY-MM-DDTHH:mm:ss.sssZ"
                                            ).format()}
                                        </Text>
                                        <Text fontSize="sm" color="gray.600">
                                            <Text
                                                as="span"
                                                fontWeight="semibold"
                                            >
                                                Last Updated:
                                            </Text>{" "}
                                            {moment(
                                                doc.updatedAt,
                                                "YYYY-MM-DDTHH:mm:ss.sssZ"
                                            ).format("YYYY/MM/DD")}
                                        </Text>
                                    </VStack>
                                </CardBody>

                                <Divider />

                                <CardFooter textAlign="left">
                                    <Text fontSize="xs" color="gray.500">
                                        Document ID: {doc.id}
                                    </Text>
                                </CardFooter>
                            </PortraitCard>
                        </Link>
                    </GridItem>
                ))}
            </Grid>
        </Box>
    )
}

export default Dashboard
