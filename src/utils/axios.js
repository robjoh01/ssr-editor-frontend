import axios from "axios"

/**
 * The `api` object is an instance of Axios that is used to make requests to the
 * backend API. It is configured to use the `baseURL` and `withCredentials` set
 * to `true` so that the API can handle authentication and validation.
 *
 * @type {AxiosInstance}
 */
const api = axios.create({
    /**
     * The base URL of the API. This is set to the value of the `VITE_BACKEND_URL`
     * environment variable, which is set in the `vite.config.js` file.
     *
     * @type {string}
     */
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,

    /**
     * The headers that are sent with each request. This is set to `application/json`
     * so that the API can handle JSON data.
     *
     * @type {Object}
     */
    headers: {
        "Content-Type": "application/json",
    },

    /**
     * Whether or not the `withCredentials` flag is set. This is set to `true` so
     * that the API can handle authentication and validation.
     *
     * @type {boolean}
     */
    withCredentials: true,
})

export default api
