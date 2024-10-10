import React from "react"
import { Link } from "react-router-dom"
import { Box, Heading, Text, Icon, Button } from "@chakra-ui/react"
import { BiSolidGhost } from "react-icons/bi"

function Error() {
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
                404 Error
            </Heading>
            <Text fontSize="lg" color="gray.600">
                Page not found.
            </Text>
            <Button as={Link} mt={6} colorScheme="teal" to="..">
                Go Back
            </Button>
        </Box>
    )
}

export default Error
