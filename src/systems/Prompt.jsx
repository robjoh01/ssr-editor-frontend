import React, { createContext, useContext, useState, useRef } from "react"

import Dialog from "@/components/actions/Dialog"

const PromptContext = createContext()

export const usePrompt = () => {
    const promptContext = useContext(PromptContext)

    if (!promptContext)
        throw new Error("usePrompt must be used within an PromptProvider")

    return promptContext
}

export const PromptProvider = ({ children }) => {
    const [isPromptOpen, setIsPromptOpen] = useState(false)
    const [promptContent, setPromptContent] = useState({
        title: "",
        message: "",
        confirmText: "",
        cancelText: "",
        isLoading: false,
        loadingText: "Loading",
    })
    const confirmActionRef = useRef(null)

    /**
     * Shows a prompt dialog with the specified content and settings.
     *
     * @param {Object} options - The options for the prompt dialog.
     * @param {string} options.title - The title of the prompt dialog.
     * @param {string} options.message - The message to display in the prompt dialog.
     * @param {string} options.confirmText - The text for the confirm button.
     * @param {string} options.cancelText - The text for the cancel button.
     * @param {Function} options.onConfirm - Callback function to call when confirm is clicked.
     * @param {boolean} [options.isLoading=false] - Flag to indicate if the confirm button is in a loading state.
     * @param {string} [options.loadingText="Loading"] - Text to display when the confirm button is in a loading state.
     */
    const showPrompt = ({
        title,
        message,
        confirmText,
        cancelText,
        onConfirm,
        isLoading = false,
        loadingText = "Loading",
    }) => {
        // Set the content and settings for the prompt dialog
        setPromptContent({
            title,
            message,
            confirmText,
            cancelText,
            isLoading,
            loadingText,
        })
        // Store the onConfirm callback reference
        confirmActionRef.current = onConfirm
        // Open the prompt dialog
        setIsPromptOpen(true)
    }

    const hidePrompt = () => {
        setIsPromptOpen(false)
    }

    const handleConfirm = () => {
        if (confirmActionRef.current) {
            confirmActionRef.current()
        }

        hidePrompt()
    }

    return (
        <PromptContext.Provider
            value={{
                showPrompt,
                hidePrompt,
                isPromptOpen,
            }}
        >
            {children}
            <Dialog
                isOpen={isPromptOpen}
                onClose={hidePrompt}
                onConfirm={handleConfirm}
                title={promptContent.title}
                message={promptContent.message}
                isLoading={promptContent.isLoading}
                loadingText={promptContent.loadingText}
                confirmText={promptContent.confirmText}
                cancelText={promptContent.cancelText}
            />
        </PromptContext.Provider>
    )
}
