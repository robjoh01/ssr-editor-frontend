import React, { createContext, useContext, useState } from "react"
import { getDefaultValue } from "@utils/getDefaultValue"

import { useNavigate } from "react-router-dom"

// Create the UserContext
const UserContext = createContext()

// Create a custom hook to use the UserContext
export const useUser = () => {
    return useContext(UserContext)
}

// Create the UserProvider component
export const UserProvider = ({ children }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState(
        getDefaultValue(
            {
                name: "John Doe",
                email: "john.doe@me.com",
                picture: "",
                isAdmin: false,
                password: "foo",
                createdAt: new Date("2022-01-01"),
                lastSignIn: new Date(),
                documentsCreated: 3,
                documentsShared: 10,
                documentsAccess: 5,
            },
            null
        )
    ) // User details
    const [isLoggedIn, setIsLoggedIn] = useState(getDefaultValue(true, false)) // Authentication status

    // Function to log in the user
    const logIn = (userData) => {
        setUser(userData) // Set user data
        setIsLoggedIn(true) // Update login status
        console.log("Logged in")
        navigate("/dashboard")
    }

    // Function to log out the user
    const logOut = () => {
        setUser(null) // Clear user data
        setIsLoggedIn(false) // Update login status
        console.log("Logged out")
        navigate("/")
    }

    // Context value
    const value = {
        user,
        isLoggedIn,
        logIn,
        logOut,
    }

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
