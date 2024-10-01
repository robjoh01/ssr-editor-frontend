import { ChakraProvider, Box, Container, Text } from "@chakra-ui/react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import Home from "./pages/Home"
import CreateDocument from "./pages/CreateDocument"
import EditDocument from "./pages/EditDocument"
import About from "./pages/About"

const queryClient = new QueryClient()

function App() {
    return (
        <ChakraProvider>
            <QueryClientProvider client={queryClient}>
                <Router
                    basename={`~${process.env.REACT_APP_DEPLOY_USER}/editor`}
                >
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
                                <Route path="/about" element={<About />} />
                            </Routes>
                        </Container>
                    </Box>
                </Router>
            </QueryClientProvider>
        </ChakraProvider>
    )
}

export default App
