"use strict"

/**
 * ResponseError is an error that wraps an error with a status code
 */
class ResponseError extends Error {
    constructor(error, status) {
        super()
        this.error = error
        this.status = status
    }

    toString() {
        return `${this.status}: ${this.error.message}`
    }

    toJSON() {
        return {
            status: this.status,
            message: this.error.message,
        }
    }
}

export default ResponseError
