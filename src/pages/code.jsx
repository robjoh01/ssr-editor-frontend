import React, { useState, useRef } from "react"
import { useMutation } from "@tanstack/react-query"
import axios from "@/utils/axios.js"

import {
    Box,
    Button,
    VStack,
    Heading,
    Text,
    Grid,
    GridItem,
} from "@chakra-ui/react"

import { CodeEditor } from "@/components/actions"

import { BeatLoader } from "react-spinners"
import { useSnackbar } from "notistack"

function CodePage() {
    const { enqueueSnackbar } = useSnackbar()

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
            enqueueSnackbar(error.message, { variant: "error" })
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
                            isLoading={runCodeMutation.isPending}
                            loadingText="Updating"
                            disabled={runCodeMutation.isPending}
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
                                <Text>
                                    Click &quot;Run Code&quot; to get output
                                </Text>
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
