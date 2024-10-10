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
                _id: "66eae0bd0f6e02824705d72a",
                email: "bYxkM@example.com",
                name: "Robin Johannesson",
                documents: ["67080abb97c1e14ff70913f0"],
                stats: {
                    totalDocuments: 1,
                    totalEdits: 5,
                    totalComments: 1,
                },
                createdAt: "9/1/2020, 11:36:33 AM",
                lastLogin: "9/1/2020, 11:36:33 AM",
                passwordHash: "hashedPassword1",
                profilePicture: "url_to_profile_pic_1",
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
