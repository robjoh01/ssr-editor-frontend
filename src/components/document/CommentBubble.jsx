import React from "react"

import { Box, Textarea, Button } from "@chakra-ui/react"

function CommentBubble({ position, onComment }) {
    return (
        <Box
            position="absolute"
            top={position.top}
            left={position.left}
            border="1px solid gray"
            borderRadius="md"
            p={2}
            shadow="md"
        >
            <Textarea placeholder="Add your comment..." size="sm" />
            <Button mt={2} colorScheme="blue" onClick={onComment}>
                Comment
            </Button>
        </Box>
    )
}

export default CommentBubble
