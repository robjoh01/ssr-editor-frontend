import React, { useState, useRef, useEffect } from "react"
import { useParams } from "react-router-dom"

import { useDisclosure, VStack } from "@chakra-ui/react"

import {
    DocumentHeader,
    DocumentFooter,
    Toc,
    Toolbar,
    Comments,
    CommentBubble,
} from "@/components/document"

import { TextEditor } from "@/components/actions"

function DocumentPage() {
    const { id } = useParams()

    // TODO: Fetch the document from the database

    // TODO: Check user's privileges to access the document

    // FIXME: Use reference to the TextEditor component.

    // TODO: Use other packages for Quill to edit the document.
    // https://www.npmjs.com/package/quill-wordcounter

    const editor = useRef()

    const [documentTitle, setDocumentTitle] = useState("Untitled Document")
    const [viewers, setViewers] = useState(["John Doe", "Jane Smith"])
    const [charCount, setCharCount] = useState(0)
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

    return (
        <VStack height="full">
            <DocumentHeader
                title={documentTitle}
                setTitle={setDocumentTitle}
                viewers={viewers}
                setViewers={setViewers}
            />
            <TextEditor ref={editor} />
            <DocumentFooter
                wordCount={0}
                charCount={editor?.current?.getValue()?.length}
                lastEdited={""}
            />
        </VStack>
    )
}

export default DocumentPage
