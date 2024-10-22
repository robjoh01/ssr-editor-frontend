"use strict"

/**
 * Custom error class for HTTP errors
 * @class HttpError
 * @extends {Error}
 */
class HttpError extends Error {
    /**
     * Creates an instance of HttpError.
     * @param {string} message - The error message
     * @param {number} statusCode - The HTTP status code
     * @memberof HttpError
     */
    constructor(message, statusCode) {
        super(message)
        this.name = "HttpError"
        this.statusCode = statusCode // Attach the status code
    }
}

export default HttpError
