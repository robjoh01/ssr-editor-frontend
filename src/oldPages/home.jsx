import React from "react"
import { Link } from "react-router-dom"
import { fetchAllDocuments } from "../utils/api"
import { useQuery } from "@tanstack/react-query"

import {
    Flex,
    Button,
    Heading,
    Text,
    Spinner,
    Alert,
    AlertIcon,
} from "@chakra-ui/react"

import DocumentList from "../components/DocumentList"

const Home = () => {
    // Fetching documents using useQuery
    const {
        data: documents,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["docs"],
        queryFn: fetchAllDocuments,
        select: (response) => response.data,
    })

    // Render loading skeleton and spinner while documents are being fetched
    if (isLoading) {
        return (
            <Flex justify="center" align="center" height="100vh">
                <Spinner size="xl" />
            </Flex>
        )
    }

    // Render error message if there was an error fetching documents
    if (isError) {
        return (
            <Alert status="error" mb={4}>
                <AlertIcon />
                {error.message || "Kunde inte hämta dokumenten."}
            </Alert>
        )
    }

    return (
        <>
            <Heading as="h1" size="xl" mb={4}>
                Välkommen till SSR Editor
            </Heading>
            <Text mb={4}>
                Denna applikation hjälper dig att enkelt hantera och organisera
                dina dokument. Med vår intuitiva användargränssnitt kan du
                snabbt skapa, redigera och översiktligt se alla dina dokument.
            </Text>
            <Text>
                Utforska de befintliga dokumenten nedan eller skapa ett nytt
                dokument för att komma igång.
            </Text>

            <Flex mt={8} justifyContent={"space-between"}>
                <Flex direction="column">
                    <Heading as="h2" size="lg" mb={4}>
                        Dokument lista
                    </Heading>
                    <DocumentList documents={documents} />
                </Flex>

                <Flex direction="column">
                    <Button as={Link} to="/new" colorScheme="orange">
                        Skapa Nytt Dokument
                    </Button>

                    <Button as={Link} to="/about" colorScheme="teal" mt={4}>
                        Om SSR Editor
                    </Button>
                </Flex>
            </Flex>
        </>
    )
}

export default Home
