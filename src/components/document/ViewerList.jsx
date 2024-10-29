import React from "react"

import { Avatar, AvatarGroup, Tooltip } from "@chakra-ui/react"

function ViewerList({ viewers }) {
    return (
        <AvatarGroup size="sm" max={2}>
            {viewers?.map((viewer, index) => (
                <Avatar key={index} name={viewer.name} />
            ))}
        </AvatarGroup>
    )
}

export default ViewerList
