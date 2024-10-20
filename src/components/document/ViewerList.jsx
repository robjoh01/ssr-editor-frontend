import React from "react"

import { Avatar, HStack, Tooltip } from "@chakra-ui/react"

function ViewerList({ viewers }) {
    return (
        <HStack spacing={2}>
            {viewers?.map((viewer, idx) => (
                <Tooltip
                    key={idx}
                    label={viewer}
                    aria-label={`Viewer ${viewer}`}
                >
                    <Avatar name={viewer} size="sm" />
                </Tooltip>
            ))}
        </HStack>
    )
}

export default ViewerList
