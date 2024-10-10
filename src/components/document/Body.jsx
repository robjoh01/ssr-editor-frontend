import React from "react"

import { Box, Textarea } from "@chakra-ui/react"

function Body() {
    return (
        <Textarea
            placeholder="Start writing your document here..."
            rows={20}
            size="md"
            resize="none"
            spellCheck="true"
            overflowY="auto"
        />
    )
}

export default Body
