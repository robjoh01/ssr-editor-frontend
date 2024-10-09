import React, { useState } from "react"

import {
    Grid,
    Textarea,
    Box,
    Button,
    HStack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Input,
    useDisclosure,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    IconButton,
    Text,
    VStack,
    Select,
    Tooltip,
    Badge,
} from "@chakra-ui/react"

import {
    DocumentHeader,
    DocumentBody,
    DocumentFooter,
    Toc,
    Toolbar,
    Comments,
    CommentBubble,
} from "@/components/document"

function View() {
    const [documentTitle, setDocumentTitle] = useState("Untitled Document")
    const [viewers, setViewers] = useState(["John Doe", "Jane Smith"])
    const [wordCount, setWordCount] = useState(0)
    const [lastEdited, setLastEdited] = useState("10/10/2024")

    const {
        isOpen: isTocOpen,
        onOpen: onTocOpen,
        onClose: onTocClose,
    } = useDisclosure()
    const {
        isOpen: isCommentsOpen,
        onOpen: onCommentsOpen,
        onClose: onCommentsClose,
    } = useDisclosure()

    // TODO: Make this page read-only, or remove this component entirely, if edit page can be read-only.

    return (
        <VStack>
            <DocumentHeader title={documentTitle} viewers={viewers} />
            <Toolbar />
            <DocumentBody />
            <DocumentFooter wordCount={wordCount} lastEdited={lastEdited} />
        </VStack>
    )
}

export default View
