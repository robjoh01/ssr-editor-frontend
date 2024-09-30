import { useEffect, useState } from "react";
import {
  Button,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  Checkbox,
  Heading,
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditDocument = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the document ID from URL params
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocument = async () => {
      setLoading(true);
      setError(null); // Reset error state
      try {
        const response = await axios.get(`http://localhost:1337/api/document/${id}`);
        const { title, content, ownerId, isLocked } = response.data;

        // Set the state with the fetched data
        setTitle(title);
        setContent(content);
        setOwnerId(ownerId);
        setIsLocked(isLocked);
      } catch (err) {
        console.error("Error fetching document:", err);
        setError("Failed to fetch document. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data1 = { title, content, ownerId, isLocked };

    try {
        await axios.put(`http://localhost:1337/api/document/${id}`, data1);
        navigate("/");
    } catch (err) {
      console.error("Error updating document:", err);
      setError("Failed to update document. Please try again.");
    }
  };

  // Show loading spinner while fetching
  if (loading) return <Spinner size="xl" />;

  // Display error message if there's an error
  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  return (
    <>
      <Heading as="h1" size="xl" mb={4}>Redigera Dokument</Heading>
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

        <Button colorScheme="teal" type="submit">Uppdatera</Button>
      </form>
    </>
  );
};

export default EditDocument;
