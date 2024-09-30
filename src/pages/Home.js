import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, Heading, List, ListItem, Icon, Text, Spinner, Box } from "@chakra-ui/react";
import { IoDocumentText } from "react-icons/io5"; 
import { MdInsertDriveFile } from 'react-icons/md';

const Home = () => {
  const [docs, setDocs] = useState([]);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get("http://localhost:1337/api/document/all");
        if (response.status === 200) {
          setDocs(response.data);
        } else {
          setDocs([]);
        }
      } catch (error) {
        setError("Error fetching documents");
        console.error("Error fetching documents", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  // Render loading spinner while documents are being fetched
  if (loading) {
    return <Spinner size="xl" />;
  }

  // Render error message if there was an error fetching documents
  if (error) {
    return <Text color="red.500">{error}</Text>;
  }

  return (
    <>
      <Heading as="h1" size="xl" mb={4}>
        Välkommen till Dokument App
      </Heading>
      <Text>
        Denna applikation hjälper dig att enkelt hantera och organisera dina
        dokument. Med vår intuitiva användargränssnitt kan du snabbt skapa,
        redigera och översiktligt se alla dina dokument. Utforska de befintliga
        dokumenten nedan eller skapa ett nytt dokument för att komma igång.
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
            <ListItem key={doc.id} display="flex" alignItems="center">
              <Icon as={IoDocumentText} boxSize={6} mr={4} color="teal.500" /> {/* Using IoDocumentText */}
              <Link to={`/edit/${doc.id}`}>
                <Text fontSize="lg" fontWeight="bold">{doc.title}</Text> {/* Displaying the title instead of ID */}
              </Link>
            </ListItem>
          ))
        ) : (
          <Text>Inga dokument tillgängliga.</Text>  // Message if no documents are available
        )}
      </List>
    </>
  );
};

export default Home;

