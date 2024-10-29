import React, {
    createContext,
    useContext,
    useEffect,
    useLayoutEffect,
    useState,
} from "react"

import axios from "@/utils/axios.js"

const AuthContext = createContext(undefined)

export const useAuth = () => {
    /**
     * Hook to get the authentication context.
     *
     * @returns {Object} The context object containing the user's authentication status and user data.
     * @throws {Error} If the hook is used outside of an `AuthProvider`.
     */
    const authContext = useContext(AuthContext)

    if (!authContext)
        throw new Error(
            "useAuth must be used within an AuthProvider. Make sure you wrap your app with the AuthProvider component."
        )

    return authContext
}

/**
 * The provider component for the authentication context.
 *
 * @param {Object} props The component props.
 * @param {ReactNode} props.children The children components.
 * @returns {ReactElement} The context provider component.
 */
export const AuthProvider = ({ children }) => {
    /**
     * The state for the authentication token.
     *
     * @type {string|null}
     */
    const [token, setToken] = useState()

    /**
     * The state for the user data.
     *
     * @type {Object|null}
     */
    const [user, setUser] = useState()

    /**
     * The state for the user's authentication status.
     *
     * @type {boolean}
     */
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    /**
     * Fetches the user data from the server.
     *
     * @returns {Promise<Object>} The user data.
     */
    const fetchUser = async () => {
        try {
            const { data } = await axios.get("/auth/myself")

            setToken(data.accessToken)
            // delete data.accessToken
            setUser(data.user)
            setIsLoggedIn(true)
            return data
        } catch (err) {
            setToken(null)
            setUser(null)
            setIsLoggedIn(false)
            return {}
        }
    }

    /**
     * Fetches the user data when the component mounts.
     */
    useEffect(() => {
        fetchUser()
    }, [])

    /**
     * Adds an interceptor to the axios client to add the authentication token to the requests.
     */
    useLayoutEffect(() => {
        const interceptor = axios.interceptors.request.use((config) => {
            config.headers["Authorization"] =
                !config._retry && token
                    ? `Bearer ${token}`
                    : config.headers["Authorization"]
            return config
        })

        return () => {
            axios.interceptors.request.eject(interceptor)
        }
    }, [token])

    /**
     * Adds an interceptor to the axios client to handle expired tokens.
     */
    useLayoutEffect(() => {
        const interceptor = axios.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error?.config

                if (
                    error?.response?.status === 403 &&
                    error?.response?.data === "No token provided"
                ) {
                    try {
                        const res = await axios.post("/auth/refresh")
                        setToken(res.data.accessToken)

                        originalRequest.headers[
                            "Authorization"
                        ] = `Bearer ${res.data.accessToken}`
                        originalRequest._retry = true

                        return axios(originalRequest)
                    } catch (refreshError) {
                        setToken(null)
                        setUser(null)
                        setIsLoggedIn(false)
                    }
                }
                return Promise.reject(error)
            }
        )

        return () => {
            axios.interceptors.response.eject(interceptor)
        }
    }, [])

    /**
     * Logs the user out.
     */
    const logOut = async () => {
        setToken(null)
        setUser(null)
        setIsLoggedIn(false)

        await axios.post("/auth/logout")
    }

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                user,
                fetchUser,
                logOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
