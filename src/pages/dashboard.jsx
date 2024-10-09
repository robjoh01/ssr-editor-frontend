import React, { useState, useEffect } from "react"
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

function Dashboard() {
    const { isLoggedIn } = useUser()
    const { navigateToError } = useErrorHandler()

    useEffect(() => {
        if (!isLoggedIn) {
            navigateToError("unauthorized")
        }
    }, [isLoggedIn, navigateToError])

    const [activeFilters, setActiveFilters] = useState([])
    const [sortOption, setSortOption] = useState("lastUpdated")

    const filteredDocuments = [
        {
            id: 1,
            title: "Document 1",
            lastUpdated: "2024-10-01",
            owner: "User A",
            shared: true,
            modifiable: false,
        },
        {
            id: 2,
            title: "Document 2",
            lastUpdated: "2024-10-02",
            owner: "User B",
            shared: false,
            modifiable: true,
        },
        // Add more documents as needed
    ]

    const handleFilterChange = (filter) => {
        setActiveFilters((prev) =>
            prev.includes(filter)
                ? prev.filter((f) => f !== filter)
                : [...prev, filter]
        )
    }

    const handleSortChange = (e) => {
        setSortOption(e.target.value)
        // Add sorting logic based on selected option
    }

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
                            >
                                <HStack spacing={2}>
                                    <Text>Create New Document</Text>
                                    <BiPlus />
                                </HStack>
                            </Button>
                        </Card>
                    </GridItem>
                    {filteredDocuments.map((doc) => (
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
