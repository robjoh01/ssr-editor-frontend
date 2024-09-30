import { ChakraProvider, Box, Container } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateDocument from "./pages/CreateDocument";
import EditDocument from "./pages/EditDocument";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Box bg="gray.900" minH="100vh" color="white">
          <Container maxW="container.md" py={5}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<CreateDocument />} />
              <Route path="/edit/:id" element={<EditDocument />} /> 
            </Routes>
          </Container>
        </Box>
      </Router>
    </ChakraProvider>
  );
}

export default App;
