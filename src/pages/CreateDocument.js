import { useState } from "react";
import { Button, Input, Textarea, FormControl, FormLabel, Checkbox, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateDocuments = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [ownerId, setOwnerId] = useState(""); // Added field for ownerId
  const [isLocked, setIsLocked] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title,
      content,
      ownerId,
      isLocked,
    };

    try {
      // Sending a POST request to create a new document
      const response = await axios.post("http://localhost:1337/api/document/create", data);
      console.log("Document created successfully:", response.data);
      navigate("/"); // Navigate back to the home page after saving
    } catch (error) {
      console.error("Error creating document", error);
    }
  };

  return (
    <>
      <Heading as="h1" size="xl" mb={4}>Skapa Nytt Dokument</Heading>
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

        <Button colorScheme="teal" type="submit">Spara</Button>
      </form>
    </>
  );
};

export default CreateDocuments;
