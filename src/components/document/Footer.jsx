import React from "react"

import { Text, HStack } from "@chakra-ui/react"

function Footer({ wordCount, charCount, lastEdited }) {
    return (
        <>
            <HStack justifyContent="space-between" width="full" p={4}>
                <HStack>
                    <Text>Words: {wordCount ?? 0}</Text>
                    <Text>Characters: {charCount ?? 0}</Text>
                </HStack>
                <Text>Last Edited: {lastEdited ?? ""}</Text>
            </HStack>
        </>
    )
}

export default Footer
