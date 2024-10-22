import React from "react"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text,
} from "@chakra-ui/react"

import { BeatLoader } from "react-spinners"

function Prompt({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText,
    cancelText,
    isLoading = false,
    loadingText = "Loading",
}) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>{message}</Text>
                </ModalBody>

                <ModalFooter>
                    <Button variant="ghost" onClick={onClose}>
                        {cancelText}
                    </Button>
                    <Button
                        colorScheme="red"
                        onClick={onConfirm}
                        isLoading={isLoading}
                        loadingText={loadingText}
                        spinner={<BeatLoader size={8} color="white" />}
                        disabled={isLoading}
                        ml={3}
                    >
                        {confirmText}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default Prompt
