import React from "react"

import { Box, useColorMode, useColorModeValue } from "@chakra-ui/react"

import { ScaleLoader } from "react-spinners"

function Loading() {
    return (
        <Box
            height="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <ScaleLoader
                color={useColorModeValue("#000000", "#ffffff")}
                loading
                size={30}
                cssOverride={{
                    display: "block",
                    margin: "0 auto",
                }}
            />
        </Box>
    )
}

export default Loading
