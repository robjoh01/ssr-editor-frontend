import React, {
    createContext,
    useContext,
    useEffect,
    useLayoutEffect,
    useState,
} from "react"

// import { fetchMyself, refresh } from "@/utils/api/auth"
import axios from "@/utils/axios.js"

const AuthContext = createContext(undefined)

export const useAuth = () => {
    const authContext = useContext(AuthContext)

    if (!authContext)
        throw new Error("useAuth must be used within an AuthProvider")

    return authContext
}

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState()
    const [user, setUser] = useState()
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const fetchUser = async () => {
        try {
            const { data } = await axios.get("/auth/myself")

            setToken(data.accessToken)
            // delete data.accessToken
            setUser(data.user)
            setIsLoggedIn(true)
            return data
        } catch (error) {
            setToken(null)
            setUser(null)
            setIsLoggedIn(false)
            return {}
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

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
                logOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
