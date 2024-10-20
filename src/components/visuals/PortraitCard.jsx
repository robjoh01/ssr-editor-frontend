import React from "react"
import { Card, Flex } from "@chakra-ui/react"

function PortraitCard({ children }) {
    return (
        <Card
            width="full"
            height="full"
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            variant="outline"
        >
            <Flex direction="column" width="full" height="full">
                {children}
            </Flex>
        </Card>
    )
}

export default PortraitCard
