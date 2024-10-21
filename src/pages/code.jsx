import React, { useState, useRef, useEffect } from "react"
import { useMutation } from "@tanstack/react-query"
import axios from "@/utils/axios.js"

import {
    Container,
    Box,
    Button,
    HStack,
    VStack,
    Heading,
    Text,
    Grid,
    GridItem,
    Spacer,
} from "@chakra-ui/react"

import { CodeEditor } from "@/components/actions"

import { BeatLoader } from "react-spinners"

function CodePage() {
    const editorRef = useRef()

    const [output, setOutput] = useState()
    const [hasOutputError, setHasOutputError] = useState(false)

    const runCodeMutation = useMutation({
        mutationFn: () => {
            return axios.post("https://execjs.emilfolino.se/code", {
                code: btoa(editorRef.current.getValue()),
            })
        },
        onSuccess: ({ data }) => {
            console.log(data)

            const decodedOutput = atob(data.output)
            console.log(decodedOutput)

            setOutput(decodedOutput ? decodedOutput.split("\n") : [])
            setHasOutputError(data.stderr)
        },
        onError: (error) => {
            // TODO: Add tost message

            console.error(error)
        },
    })

    return (
        <Box height="full">
            <Grid templateColumns="1fr 30%" height="full" gap={4}>
                <GridItem>
                    <VStack spacing={4} align="stretch" height="full">
                        <Heading>Editor</Heading>
                        <CodeEditor ref={editorRef} />
                    </VStack>
                </GridItem>
                <GridItem>
                    <VStack spacing={4} align="stretch" height="full">
                        <Heading size="lg">Output</Heading>
                        <Button
                            variant="outline"
                            colorScheme="green"
                            onClick={() => runCodeMutation.mutate()}
                            isLoading={runCodeMutation.isLoading}
                            loadingText="Updating"
                            spinner={<BeatLoader size={8} color="white" />}
                        >
                            Run Code
                        </Button>
                        <Box
                            width="full"
                            height="full"
                            p={4}
                            border="1px solid"
                            color={hasOutputError ? "red.500" : "gray.600"}
                            borderColor={
                                hasOutputError ? "red.500" : "gray.300"
                            }
                            borderRadius="md"
                        >
                            {output ? (
                                output.map((line, index) => (
                                    <Text key={index}>{line}</Text>
                                ))
                            ) : (
                                <Text>Click "Run Code" to get output</Text>
                            )}

                            {hasOutputError && (
                                <Text>Error: {hasOutputError}</Text>
                            )}
                        </Box>
                    </VStack>
                </GridItem>
            </Grid>
        </Box>
    )
}

export default CodePage
