import React from "react"
import { Link } from "react-router-dom"
import { fetchAllDocuments } from "../api"
import { useQuery } from "@tanstack/react-query"

import {
    Button,
    Heading,
    List,
    ListItem,
    Icon,
    Text,
    Spinner,
    Alert,
    AlertIcon,
} from "@chakra-ui/react"
import { IoDocumentText } from "react-icons/io5"

const Home = () => {
    // Fetching documents using useQuery
    const {
        data: docs = [],
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["docs"],
        queryFn: fetchAllDocuments,
    })

    // Render loading spinner while documents are being fetched
    if (isLoading) {
        return <Spinner size="xl" />
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
                Välkommen till Dokument App
            </Heading>
            <Text>
                Denna applikation hjälper dig att enkelt hantera och organisera
                dina dokument. Med vår intuitiva användargränssnitt kan du
                snabbt skapa, redigera och översiktligt se alla dina dokument.
                Utforska de befintliga dokumenten nedan eller skapa ett nytt
                dokument för att komma igång.
            </Text>

            <Button colorScheme="teal" m={10}>
                <Link to="/new">Skapa Nytt Dokument</Link>
            </Button>

            <Heading as="h2" size="lg" mb={4}>
                Dokument lista
            </Heading>

            <List spacing={3}>
                {docs.length > 0 ? (
                    docs.map((doc) => (
                        <ListItem
                            key={doc.id}
                            display="flex"
                            alignItems="center"
                        >
                            <Icon
                                as={IoDocumentText}
                                boxSize={6}
                                mr={4}
                                color="teal.500"
                            />
                            <Link to={`/edit/${doc.id}`}>
                                <Text fontSize="lg" fontWeight="bold">
                                    {doc.title}
                                </Text>
                            </Link>
                        </ListItem>
                    ))
                ) : (
                    <Text>Inga dokument tillgängliga.</Text>
                )}
            </List>
        </>
    )
}

export default Home
