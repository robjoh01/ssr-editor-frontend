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
    Heading,
    Text,
    Button,
    VStack,
    HStack,
    IconButton,
    Divider,
    Skeleton,
    CardHeader,
    CardBody,
    CardFooter,
    Link as ChakraLink,
} from "@chakra-ui/react"

import { BiPlus, BiTrash } from "react-icons/bi"

import PortraitCard from "@/components/visuals/PortraitCard.jsx"

import { useSnackbar } from "notistack"
import { useErrorBoundary } from "react-error-boundary"
import ResponseError from "@/utils/responseError.js"
import { usePrompt } from "@/systems/Prompt.jsx"

function Dashboard() {
    const navigate = useNavigate()

    const { enqueueSnackbar } = useSnackbar()
    const { showBoundary } = useErrorBoundary()
    const { showPrompt } = usePrompt()

    const [activeFilters, setActiveFilters] = useState(["owned", "shared"])
    const [sortOption, setSortOption] = useState("lastUpdated")
    const [documents, setDocuments] = useState([])

    const myselfQuery = useQuery({
        queryKey: ["myself"],
        queryFn: () =>
            axios.post("/graphql", {
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
            }),
    })

    useEffect(() => {
        const { errors } = myselfQuery.data?.data || {}

        if (Array.isArray(errors) && errors.length > 0) {
            errors.forEach((error) => {
                showBoundary(new ResponseError(error.message, 500))
                return
            })
        }
    }, [myselfQuery.data, showBoundary])

    const newDocumentMutation = useMutation({
        mutationFn: async () =>
            axios.post("documents", {
                title: "New Document",
            }),
        onSuccess: ({ data }) => {
            enqueueSnackbar("Document created", { variant: "success" })

            navigate(`/documents/${data._id}`)
        },
        onError: (error) => {
            const errorMessage =
                error.response?.data || "An unknown error occurred"

            enqueueSnackbar(`Failed to create document: ${errorMessage}`, {
                variant: "error",
            })
        },
    })

    const deleteDocumentMutation = useMutation({
        mutationFn: async (id) => axios.delete(`documents/${id}/delete`),
        onSuccess: () => {
            enqueueSnackbar("Document deleted", { variant: "success" })

            // Update documents
            myselfQuery.refetch()
        },
        onError: (error) => {
            const errorMessage =
                error.response?.data || "An unknown error occurred"

            enqueueSnackbar(`Failed to delete document: ${errorMessage}`, {
                variant: "error",
            })
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

    const handleDeleteDocument = (id) => {
        showPrompt({
            title: "Delete Document",
            message:
                "Are you sure you want to delete this document? This action cannot be undone.",
            confirmText: `Delete ${id}`,
            cancelText: "Cancel",
            onConfirm: () => {
                deleteDocumentMutation.mutate(id)
            },
            loadingText: "Deleting",
        })
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
                templateColumns={{
                    base: "1fr",
                    sm: "repeat(2, 1fr)",
                    lg: "repeat(3, 1fr)",
                }}
                gap={6}
            >
                {/* Create Document Card */}
                <GridItem>
                    <PortraitCard _hover={{ bg: "gray.100" }}>
                        <Button
                            variant="outline"
                            minWidth="full"
                            minHeight="full"
                            onClick={() => newDocumentMutation.mutate()}
                            _hover={{ bg: "gray.100" }}
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

                {/* Document Cards */}
                {myselfQuery.isFetching
                    ? [...Array(5)].map((_, idx) => (
                          <GridItem key={idx}>
                              <Skeleton height="200px" />
                          </GridItem>
                      ))
                    : documents?.map((doc) => (
                          <GridItem key={doc.id}>
                              <PortraitCard
                                  _hover={{ bg: "gray.100" }}
                                  position="relative"
                              >
                                  <CardHeader
                                      display="flex"
                                      flexDirection="row"
                                      justifyContent="space-between"
                                      alignItems="center"
                                      pb={2}
                                  >
                                      <ChakraLink
                                          as={Link}
                                          to={`/documents/${doc.id}`}
                                      >
                                          <Heading
                                              as="h3"
                                              size="sm"
                                              noOfLines={1}
                                          >
                                              {doc.title}
                                          </Heading>
                                      </ChakraLink>

                                      <IconButton
                                          icon={<BiTrash />}
                                          variant="ghost"
                                          size="sm"
                                          aria-label="Delete document"
                                          onClick={(e) => {
                                              e.stopPropagation() // Prevents triggering the Link click event

                                              handleDeleteDocument(doc.id)
                                          }}
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
                                              {new Date(
                                                  doc.createdAt
                                              ).toLocaleString()}
                                          </Text>
                                          <Text fontSize="sm" color="gray.600">
                                              <Text
                                                  as="span"
                                                  fontWeight="semibold"
                                              >
                                                  Last Updated:
                                              </Text>{" "}
                                              {new Date(
                                                  doc.updatedAt
                                              ).toLocaleString()}
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
                          </GridItem>
                      ))}
            </Grid>
        </Box>
    )
}

export default Dashboard
