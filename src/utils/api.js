import axios from "axios"

/**
 * Fetch all documents with filters
 * @param {Object} filters - Filters to apply
 * @param {string} [filters.userId] - Filter by either the owner's user ID or the collaborator's user ID
 * @param {string} [filters.grant] - Comma-separated list of grants
 * @param {string} [filters.title] - Title to search for (case-insensitive)
 * @param {number} [filters.totalViews] - Filter by total views (exact match)
 * @param {number} [filters.activeUsers] - Filter by active users (exact match)
 * @param {string} [filters.sort] - Sorting option (e.g., "lastUpdated" or "alphabetical")
 * @returns {Promise<{data: *, status: number, statusText: string}>}
 */
export async function fetchAllDocuments(filters = {}) {
    const { userId, grants, title, totalViews, activeUsers, sort } = filters

    const queryParams = new URLSearchParams()

    if (userId) queryParams.append("userId", userId)
    if (grants) queryParams.append("grants", grants)
    if (title) queryParams.append("title", title)
    if (totalViews !== undefined) queryParams.append("totalViews", totalViews)
    if (activeUsers !== undefined)
        queryParams.append("activeUsers", activeUsers)
    if (sort) queryParams.append("sort", sort)

    const { data, status, statusText } = await axios.get(
        `${import.meta.env.VITE_API_URL}/document/all?${queryParams.toString()}`
    )

    return { data, status, statusText }
}

/**
 * Fetch a document by ID
 * @param {string} id - ID of the document to fetch
 * @returns {Promise<{data: *, status: number, statusText: string}>}
 */
export async function fetchDocument(id) {
    const { data, status, statusText } = await axios.get(
        `${import.meta.env.VITE_API_URL}/document/${id}`
    )
    return { data, status, statusText }
}

/**
 * Update a document
 * @param {string} id - ID of the document to update
 * @param {Object} document - Updated document data
 * @returns {Promise<{data: *, status: number, statusText: string}>}
 */
export async function updateDocument({ id, document }) {
    const { data, status, statusText } = await axios.put(
        `${import.meta.env.VITE_API_URL}/document/${id}`,
        document
    )
    return { data, status, statusText }
}

/**
 * Create a new document
 * @param {Object} document - Document data
 * @returns {Promise<{data: *, status: number, statusText: string}>}
 */
export async function createDocument(document) {
    const { data, status, statusText } = await axios.post(
        `${import.meta.env.VITE_API_URL}/document/create`,
        document
    )
    return { data, status, statusText }
}

/**
 * Delete a document
 * @param {string} id - ID of the document to delete
 * @returns {Promise<{data: *, status: number, statusText: string}>}
 */
export async function deleteDocument(id) {
    const { data, status, statusText } = await axios.delete(
        `${import.meta.env.VITE_API_URL}/document/${id}`
    )
    return { data, status, statusText }
}
