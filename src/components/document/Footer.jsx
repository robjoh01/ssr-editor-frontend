import React from "react"

import { Box, HStack } from "@chakra-ui/react"

function Footer({ wordCount, lastEdited }) {
    return (
        <HStack justifyContent="space-between" width="full" p={4} mb={32}>
            <Box>Word Count: {wordCount}</Box>
            <Box>Last Edited: {lastEdited}</Box>
        </HStack>
    )
}

export default Footer
