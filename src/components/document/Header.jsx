import React, { useEffect, useState } from "react"

import { useAuth } from "@/systems/Auth"

// Components
import {
    useDisclosure,
    Badge,
    HStack,
    Button,
    Input,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Tooltip,
} from "@chakra-ui/react"

import {
    ViewerList,
    ShareWindow,
    CommentHistory,
    ChatWindow,
} from "@/components/document"
import { SyncLoader } from "react-spinners"
import { useHotkeys } from "react-hotkeys-hook"

// Icons
import {
    BiSolidShareAlt,
    BiChevronDown,
    BiConversation,
    BiChat,
} from "react-icons/bi"

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
    socketRef,
}) {
    const { user } = useAuth()

    const [unreadCount, setUnreadCount] = useState(0)

    const shareModal = useDisclosure()
    const commentModal = useDisclosure()
    const chatModal = useDisclosure()

    useHotkeys("ctrl+m", () => {
        if (commentModal.isOpen) {
            commentModal.onClose()
        } else {
            commentModal.onOpen()
        }
    })

    useHotkeys("ctrl+n", () => {
        if (chatModal.isOpen) {
            chatModal.onClose()
        } else {
            chatModal.onOpen()
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

                    <Tooltip label="Live Chat (CTRL + N)">
                        <Button
                            leftIcon={<BiChat />}
                            colorScheme="blue"
                            onClick={() => chatModal.onOpen()}
                        >
                            Live
                            {unreadCount > 0 && (
                                <Badge
                                    color="black"
                                    bg="red.300"
                                    _dark={{ color: "white", bg: "red.500" }}
                                    position="absolute"
                                    top={0}
                                    right={0}
                                    transform="translate(25%, -25%)"
                                    borderRadius="full"
                                    px={2}
                                >
                                    {unreadCount}
                                </Badge>
                            )}
                        </Button>
                    </Tooltip>

                    <Tooltip label="Comment History (CTRL + M)">
                        <Button
                            leftIcon={<BiConversation />}
                            colorScheme="orange"
                            onClick={() => commentModal.onOpen()}
                        >
                            History
                        </Button>
                    </Tooltip>

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

            {/* Chat Modal */}
            <ChatWindow
                socketRef={socketRef}
                user={user}
                documentId={documentId}
                isOpen={chatModal.isOpen}
                onClose={chatModal.onClose}
                setUnreadCount={setUnreadCount}
            />
        </>
    )
}

export default Header
