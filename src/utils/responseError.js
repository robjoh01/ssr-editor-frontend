"use strict"

/**
 * A class that represents a response error.
 *
 * @class ResponseError
 * @extends Error
 */
class ResponseError extends Error {
    /**
     * Create a new ResponseError.
     *
     * @param {Error} error - The error that caused the response error.
     * @param {number} status - The status code of the response.
     */
    constructor(error, status) {
        super()
        /**
         * The error that caused the response error.
         *
         * @type {Error}
         */
        this.error = error
        /**
         * The status code of the response.
         *
         * @type {number}
         */
        this.status = status
    }

    /**
     * A string representation of the response error.
     *
     * @return {string} A string representation of the response error.
     */
    toString() {
        return `${this.status}: ${this.error.message}`
    }

    /**
     * A JSON representation of the response error.
     *
     * @return {Object} A JSON representation of the response error.
     */
    toJSON() {
        return {
            /**
             * The status code of the response.
             *
             * @type {number}
             */
            status: this.status,
            /**
             * The message of the error.
             *
             * @type {string}
             */
            message: this.error.message,
        }
    }
}

export default ResponseError
