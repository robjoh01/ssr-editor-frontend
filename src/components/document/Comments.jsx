import React from "react"

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    Text,
} from "@chakra-ui/react"

function Comments({ isOpen, onClose }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Comments</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>No comments yet</Text>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default Comments
