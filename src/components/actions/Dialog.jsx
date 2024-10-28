import React, { useRef } from "react"

import {
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    Button,
    Text,
} from "@chakra-ui/react"

/**
 * A dialog component that displays a message and allows the user to
 * confirm or cancel. It handles displaying a loading state and disabling
 * the confirm button when the loading state is on.
 *
 * @param {boolean} isOpen - Whether the dialog should be open
 * @param {function} onClose - Callback to close the dialog
 * @param {function} onConfirm - Callback to call when confirm is clicked
 * @param {string} title - The title of the dialog
 * @param {string} message - The message to display in the dialog
 * @param {string} confirmText - The text for the confirm button
 * @param {string} cancelText - The text for the cancel button
 * @param {boolean} isLoading - Whether the confirm button is in a loading state
 * @param {string} loadingText - The text to display when the confirm button is in a loading state
 */
function Dialog({
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
    const cancelRef = useRef()

    return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        {title}
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        <Text>{message}</Text>
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button
                            ref={cancelRef}
                            onClick={onClose}
                            variant="ghost"
                        >
                            {cancelText}
                        </Button>
                        <Button
                            colorScheme="red"
                            onClick={onConfirm}
                            isLoading={isLoading}
                            loadingText={loadingText}
                            ml={3}
                            disabled={isLoading}
                        >
                            {confirmText}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}

export default Dialog
