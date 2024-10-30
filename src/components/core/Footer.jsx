import React from "react"
import { Link } from "react-router-dom"

import { Box, Button, Text, VStack, HStack } from "@chakra-ui/react"

function Footer() {
    return (
        <Box as="footer" py={4} textAlign="center">
            <VStack justify="center" spacing={4}>
                <Text fontSize="sm" color="gray.500">
                    © 2024 SSR Editor. All rights reserved.
                </Text>
                <HStack justify="center" spacing={4}>
                    <Button as={Link} to="/about" variant="outline">
                        <Text fontSize="sm" color="gray.500">
                            About
                        </Text>
                    </Button>

                    <Button as={Link} to="/redovisning" variant="outline">
                        <Text fontSize="sm" color="gray.500">
                            Redovisning
                        </Text>
                    </Button>
                </HStack>
            </VStack>
        </Box>
    )
}

export default Footer
