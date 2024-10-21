"use strict"

import axios from "@utils/axios.js"

/**
 * Login a user
 * @param {string} email - The user's email
 * @param {string} password - The user's password
 * @returns {Promise<{data: *, status: number, statusText: string}>}
 */
export async function login(email, password) {
    if (!email || !password) throw new Error("Email and password are required")

    const { data, status, statusText } = await axios.post("/auth/login", {
        email,
        password,
    })

    return { data, status, statusText }
}

export async function logout() {
    const { data, status, statusText } = await axios.get("/auth/logout")
    return { data, status, statusText }
}

export async function authWithGithub() {
    const { data, status, statusText } = await axios.get("/auth/github")
    return { data, status, statusText }
}

export async function authWithGoogle() {
    const { data, status, statusText } = await axios.get("/auth/google")
    return { data, status, statusText }
}

/**
 * Refresh the user's token
 * @param {string} token - JWT token
 * @returns {Promise<{data: *, status: number, statusText: string}>}
 */
export async function refresh() {
    const { data, status, statusText } = await axios.post("/auth/refresh")
    console.log(`Refreshing token: ${JSON.stringify(data)}`)
    return { data, status, statusText }
}

/**
 * Get the user's details
 * @returns {Promise<{data: *, status: number, statusText: string}>}
 */
export async function fetchMyself() {
    const { data, status, statusText } = await axios.get("/auth/myself")
    return { data, status, statusText }
}

/**
 * Update the user's details
 * @param {Object} user - Updated user data
 * @param {string} user.name - Name of the user
 * @param {string} user.email - Name of the user
 * @param {string} user.password - Name of the user
 * @returns {Promise<{data: *, status: number, statusText: string}>}
 */
export async function updateMyself(user) {
    console.log(`Updating user: ${JSON.stringify(user)}`)
    const { data, status, statusText } = await axios.put("/auth/myself", user)
    return { data, status, statusText }
}
