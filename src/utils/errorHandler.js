"use strict"

import { useNavigate } from "react-router-dom"

const errorMessages = {
    unauthorized: { status: 403, message: "Unauthorized access" },
    notFound: { status: 404, message: "Page not found" },
    serverError: { status: 500, message: "Internal server error" },
    // Add more errors as needed
}

const useErrorHandler = () => {
    const navigate = useNavigate()

    /**
     * Navigates to the error page with the corresponding error message and status.
     * @param {ErrorMessageKey} errorKey - The key corresponding to the error message.
     */
    const navigateToError = (errorKey) => {
        const error = errorMessages[errorKey]
        if (error) {
            navigate("/error", { state: error })
        } else {
            // Handle unknown error gracefully, using defaults
            navigate("/error", {
                state: {
                    status: 500,
                    message: "An unexpected error occurred.",
                },
            })
        }
    }

    return { navigateToError }
}

export default useErrorHandler
