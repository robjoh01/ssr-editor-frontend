import { ChakraProvider, Box, Container } from "@chakra-ui/react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import Home from "./pages/Home"
import CreateDocument from "./pages/CreateDocument"
import EditDocument from "./pages/EditDocument"

const queryClient = new QueryClient()

function App() {
    return (
        <ChakraProvider>
            <QueryClientProvider client={queryClient}>
                <Router>
                    <Box bg="gray.900" minH="100vh" color="white">
                        <Container maxW="container.md" py={5}>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route
                                    path="/new"
                                    element={<CreateDocument />}
                                />
                                <Route
                                    path="/edit/:id"
                                    element={<EditDocument />}
                                />
                            </Routes>
                        </Container>
                    </Box>
                </Router>
            </QueryClientProvider>
        </ChakraProvider>
    )
}

export default App
