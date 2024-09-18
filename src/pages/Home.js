import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, Heading, List, ListItem, Icon, Box, Text} from "@chakra-ui/react";
import { MdFile, MdEdit } from "react-icons/md"; // Example icons

const Home = () => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/")
      .then((response) => setDocs(response.data.docs))
      .catch((error) => console.error("Error fetching documents", error));
  }, []);

  return (
    <>
      <Heading as="h1" size="xl" mb={4}>Välkommen till Dokument App</Heading>
      <p>Denna applikation hjälper dig att enkelt hantera och organisera dina dokument. Med vår intuitiva användargränssnitt kan du snabbt skapa, redigera och översiktligt se alla dina dokument. Utforska de befintliga dokumenten nedan eller skapa ett nytt dokument för att komma igång.</p>
      
      
      <Button colorScheme="teal" m={10}>
        <Link to="/new">Skapa Nytt Dokument</Link>
      </Button>

      <Heading as="h1" size="xl" mb={4}>Dokument lista</Heading>

      <List spacing={3}>
        <ListItem display="flex" alignItems="center">
            <Icon as={MdFile} boxSize={6} mr={4} color="teal.500" />
            <Text fontSize="lg" fontWeight="bold">ldas</Text>
        </ListItem>
        <ListItem display="flex" alignItems="center">
            <Icon as={MdFile} boxSize={6} mr={4} color="teal.500" />
            <Text fontSize="lg" fontWeight="bold">asd</Text>
        </ListItem>
        
      
        {/* {docs.map((doc) => (
          <ListItem key={doc.id}>
            <Link to={`/edit/${doc.id}`}>{doc.title}</Link>
          </ListItem>
        ))} */}
      </List>
    </>
  );
};

export default Home;
