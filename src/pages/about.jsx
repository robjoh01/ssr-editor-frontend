import React from "react"

import {
    Box,
    Heading,
    Text,
    SimpleGrid,
    Avatar,
    Badge,
    Link,
    VStack,
    HStack,
} from "@chakra-ui/react"
import {
    BiEditAlt,
    BiServer,
    BiHistory,
    BiFont,
    BiLockAlt,
} from "react-icons/bi"

function About() {
    return (
        <Box maxW="4xl" mx="auto" p={8}>
            <VStack spacing={8} align="stretch">
                <Box textAlign="center">
                    <Heading as="h1" size="xl" fontWeight="bold">
                        About SSR Editor
                    </Heading>
                    <Text fontSize="lg" mt={2}>
                        A powerful, collaborative document editing platform
                    </Text>
                </Box>

                {/* Our Goal Section */}
                <Box>
                    <Heading as="h2" size="lg" mb={4}>
                        Our Goal
                    </Heading>
                    <Text color="gray.600" _dark={{ color: "gray.400" }}>
                        SSR Editor is designed to revolutionize the way teams
                        collaborate on documents. By leveraging the power of
                        server-side rendering and real-time updates, we provide
                        a seamless editing experience that&apos;s fast,
                        reliable, and accessible from anywhere.
                    </Text>
                </Box>

                {/* Key Features Section */}
                <Box>
                    <Heading as="h2" size="lg" mb={4}>
                        Key Features
                    </Heading>
                    <VStack align="start" spacing={2}>
                        <HStack>
                            <BiEditAlt />
                            <Text>Real-time collaborative editing</Text>
                        </HStack>
                        <HStack>
                            <BiServer />
                            <Text>
                                Server-side rendering for improved performance
                            </Text>
                        </HStack>
                        <HStack>
                            <BiHistory />
                            <Text>Version history and document recovery</Text>
                        </HStack>
                        <HStack>
                            <BiFont />
                            <Text>Advanced formatting and styling options</Text>
                        </HStack>
                        <HStack>
                            <BiLockAlt />
                            <Text>
                                Secure document sharing and permissions
                                management
                            </Text>
                        </HStack>
                    </VStack>
                </Box>

                {/* Our Team Section */}
                <Box>
                    <Heading as="h2" size="lg" mb={4}>
                        Our Team
                    </Heading>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                        <Box
                            p={4}
                            border="1px"
                            borderRadius="md"
                            borderColor="gray.200"
                        >
                            <HStack>
                                <Avatar src="/placeholder.svg" size="xl" />
                                <VStack align="start">
                                    <Heading as="h3" size="md">
                                        Robin Johannesson
                                    </Heading>
                                    <Text color="gray.500">
                                        Full Stack Developer
                                    </Text>
                                </VStack>
                            </HStack>
                        </Box>
                        <Box
                            p={4}
                            border="1px"
                            borderRadius="md"
                            borderColor="gray.200"
                        >
                            <HStack>
                                <Avatar src="/placeholder.svg" size="xl" />
                                <VStack align="start">
                                    <Heading as="h3" size="md">
                                        Moawya Mearza
                                    </Heading>
                                    <Text color="gray.500">
                                        Full Stack Developer
                                    </Text>
                                </VStack>
                            </HStack>
                        </Box>
                    </SimpleGrid>
                </Box>

                {/* Technology Stack Section */}
                <Box>
                    <Heading as="h2" size="lg" mb={4}>
                        Technology Stack
                    </Heading>
                    <HStack spacing={2} wrap="wrap">
                        <Badge variant="outline" colorScheme="blue">
                            React
                        </Badge>
                        <Badge variant="outline" colorScheme="blue">
                            Vite
                        </Badge>
                        <Badge variant="outline" colorScheme="blue">
                            JavaScript
                        </Badge>
                        <Badge variant="outline" colorScheme="blue">
                            Chakra UI
                        </Badge>
                        <Badge variant="outline" colorScheme="blue">
                            Node.js
                        </Badge>
                        <Badge variant="outline" colorScheme="blue">
                            WebSockets
                        </Badge>
                        <Badge variant="outline" colorScheme="blue">
                            MongoDB
                        </Badge>
                        <Badge variant="outline" colorScheme="blue">
                            Azure
                        </Badge>
                    </HStack>
                </Box>

                {/* Get Involved Section */}
                <Box>
                    <Heading as="h2" size="lg" mb={4}>
                        Get Involved
                    </Heading>
                    <Text color="gray.600">
                        We&apos;re always looking for passionate developers and
                        designers to join our team. If you&apos;re interested in
                        contributing to SSR Editor, check out our
                        <Link
                            href="https://github.com/robjoh01/ssr-editor-frontend"
                            color="blue.500"
                            isExternal
                            ml={1}
                        >
                            GitHub repository
                        </Link>{" "}
                        or
                        <Link
                            href="mailto:roje22@student.bth.se"
                            color="blue.500"
                            ml={1}
                        >
                            get in touch
                        </Link>
                        .
                    </Text>
                </Box>
            </VStack>
        </Box>
    )
}

export default About
