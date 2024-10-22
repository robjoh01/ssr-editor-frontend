import React from "react"
import { Link } from "react-router-dom"

import { Box, Text } from "@chakra-ui/react"

function Footer() {
    return (
        <Box as="footer" py={4} textAlign="center">
            <Link to="/about">
                <Text fontSize="sm" color="gray.500">
                    © 2024 SSR Editor. All rights reserved.
                </Text>
            </Link>
        </Box>
    )
}

export default Footer
