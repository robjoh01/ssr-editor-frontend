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

function Toc({ isOpen, onClose }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Table of Contents</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>Section 1</Text>
                    <Text>Section 2</Text>
                    <Text>Section 3</Text>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default Toc
