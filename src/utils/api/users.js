"use strict"

import axios from "@utils/axios.js"

/**
 * Create a new user
 * @param {Object} user - Data for the new user
 * @param {string} user.name - Name of the user
 * @param {string} user.email - Email of the user
 * @param {string} user.password - Password of the user
 * @returns {Promise<{data: *, status: number, statusText: string}>}
 */
export async function createUser(user) {
    const { data, status, statusText } = await axios.post("/user/create", user)
    return { data, status, statusText }
}
