import React from "react"
import { Link, useLocation } from "react-router-dom"
import { Box, Heading, Text, Icon, Button } from "@chakra-ui/react"
import { BiSolidGhost } from "react-icons/bi"

function Error() {
    const { state } = useLocation()

    // Destructure with default values
    const { status = 404, message = "An unexpected error occurred." } =
        state || {}

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
                {status} Error
            </Heading>
            <Text fontSize="lg" color="gray.600">
                {message}
            </Text>
            <Button as={Link} mt={6} colorScheme="teal" to="..">
                Go Back
            </Button>
        </Box>
    )
}

export default Error
