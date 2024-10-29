import React, { useState } from "react"

// API
import { useMutation } from "@tanstack/react-query"
import axios from "@/utils/axios.js"

// Components
import {
    Popover,
    PopoverTrigger,
    PopoverBody,
    PopoverContent,
    PopoverArrow,
    Textarea,
    Button,
    IconButton,
    VStack,
} from "@chakra-ui/react"

// Icons
import { BiCommentDetail } from "react-icons/bi"

// Hooks
import { useSnackbar } from "notistack"

function CommentContextMenu({ documentId, textRange }) {
    const { enqueueSnackbar } = useSnackbar()

    const [isOpen, setIsOpen] = useState(false)
    const [value, setValue] = useState("")

    const createCommentMutation = useMutation({
        mutationFn: async () =>
            axios.post(`/documents/${documentId}/comment`, {
                documentId,
                position: `${textRange.index}:${textRange.length}`,
                content: value,
            }),
        onSuccess: () => {
            enqueueSnackbar("Comment added", { variant: "success" })

            setIsOpen(false)
            setValue("")
        },
        onError: (error) => {
            const errorMessage =
                error.response?.data || "An unknown error occurred"

            enqueueSnackbar(`Failed to add comment: ${errorMessage}`, {
                variant: "error",
            })
        },
    })

    const handleChange = (e) => {
        e.preventDefault()

        setValue(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        createCommentMutation.mutate()
    }

    return (
        <Popover
            id="comment-popup"
            isOpen={isOpen}
            placement="left"
            position="relative"
        >
            <PopoverTrigger>
                <IconButton
                    position="absolute"
                    right="1rem"
                    bottom="1rem"
                    colorScheme="teal"
                    icon={<BiCommentDetail />}
                    aria-label="Comment"
                    onClick={() => {
                        setIsOpen(!isOpen)
                    }}
                />
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverBody>
                    <VStack gap={2} align="stretch">
                        <Textarea
                            value={value}
                            placeholder="Add your comment..."
                            onChange={handleChange}
                        />
                        <Button
                            colorScheme="orange"
                            onClick={handleSubmit}
                            isLoading={createCommentMutation.isPending}
                            disabled={!value || createCommentMutation.isPending}
                            loadingText="Adding comment"
                        >
                            Submit
                        </Button>
                    </VStack>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}

export default CommentContextMenu
