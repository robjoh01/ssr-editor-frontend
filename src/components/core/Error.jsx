import React from "react"

import { Box, Heading, Text, Icon, Button } from "@chakra-ui/react"
import { BiSolidGhost } from "react-icons/bi"

function Error({ error, resetErrorBoundary }) {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            p={4}
        >
            <Icon as={BiSolidGhost} boxSize={40} color="teal.500" mb={4} />
            <Heading as="h1" size="2xl" mb={2}>
                {error.status || 500} Error
            </Heading>
            <Text fontSize="lg" color="gray.600">
                {error.message}
            </Text>
            <Button mt={6} colorScheme="teal" onClick={resetErrorBoundary}>
                Go Back
            </Button>
        </Box>
    )
}

export default Error
