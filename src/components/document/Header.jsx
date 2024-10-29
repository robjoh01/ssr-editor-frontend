import React, { useEffect, useState } from "react"

// Components
import {
    useDisclosure,
    HStack,
    Button,
    Input,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from "@chakra-ui/react"

import { ViewerList, ShareWindow, CommentHistory } from "@/components/document"
import { SyncLoader } from "react-spinners"
import { useHotkeys } from "react-hotkeys-hook"

// Icons
import { BiSolidShareAlt, BiChevronDown, BiConversation } from "react-icons/bi"

function Header({
    title,
    onTitleChange,
    isProcessing,
    documentId,
    viewers,
    comments,
    onCommentHighlight,
    onCommentsRefresh,
    onCommentsLoading,
}) {
    const shareModal = useDisclosure()
    const commentModal = useDisclosure()

    useHotkeys("ctrl+m", () => {
        if (commentModal.isOpen) {
            commentModal.onClose()
        } else {
            commentModal.onOpen()
        }
    })

    useEffect(() => {
        if (!commentModal.isOpen) return

        onCommentsRefresh()
    }, [commentModal.isOpen])

    return (
        <>
            <HStack justifyContent="space-between" width="full">
                <HStack spacing={2} width="full">
                    <Menu>
                        <MenuButton as={Button} rightIcon={<BiChevronDown />}>
                            File
                        </MenuButton>
                        <MenuList>
                            <MenuItem>New Document</MenuItem>
                            <MenuItem>Open</MenuItem>
                            <MenuItem>Save</MenuItem>
                        </MenuList>
                    </Menu>

                    <Menu>
                        <MenuButton as={Button} rightIcon={<BiChevronDown />}>
                            Edit
                        </MenuButton>
                        <MenuList>
                            <MenuItem>Undo</MenuItem>
                            <MenuItem>Redo</MenuItem>
                            <MenuItem>Cut</MenuItem>
                            <MenuItem>Copy</MenuItem>
                            <MenuItem>Paste</MenuItem>
                        </MenuList>
                    </Menu>

                    <Input
                        value={title}
                        onChange={onTitleChange}
                        fontWeight="bold"
                        size="md"
                        maxW="xl"
                    />

                    {isProcessing && <SyncLoader color="#36d7b7" />}
                </HStack>
                <HStack gap={4}>
                    <ViewerList viewers={viewers} />

                    <Button
                        leftIcon={<BiConversation />}
                        colorScheme="orange"
                        onClick={() => commentModal.onOpen()}
                    >
                        History
                    </Button>

                    <Button
                        leftIcon={<BiSolidShareAlt />}
                        colorScheme="blue"
                        onClick={shareModal.onOpen}
                    >
                        Share
                    </Button>
                </HStack>
            </HStack>

            {/* Share Modal */}
            <ShareWindow
                documentId={documentId}
                isOpen={shareModal.isOpen}
                onClose={shareModal.onClose}
            />

            {/* Comment Modal */}
            <CommentHistory
                documentId={documentId}
                isOpen={commentModal.isOpen}
                onClose={commentModal.onClose}
                isLoading={onCommentsLoading}
                onHighlight={onCommentHighlight}
                comments={comments}
            />
        </>
    )
}

export default Header
