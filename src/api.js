import axios from "axios"

async function fetchAllDocuments() {
    const { data, status, statusText } = await axios.get(
        `${process.env.REACT_APP_API_URL}/document/all`
    )
    return { data, status, statusText }
}

async function fetchDocument(id) {
    const { data, status, statusText } = await axios.get(
        `${process.env.REACT_APP_API_URL}/document/${id}`
    )
    return { data, status, statusText }
}

async function updateDocument({ id, document }) {
    const { data, status, statusText } = await axios.put(
        `${process.env.REACT_APP_API_URL}/document/${id}`,
        document
    )
    return { data, status, statusText }
}

async function createDocument(document) {
    const { data, status, statusText } = await axios.post(
        `${process.env.REACT_APP_API_URL}/document/create`,
        document
    )
    return { data, status, statusText }
}

async function deleteDocument(id) {
    const { data, status, statusText } = await axios.delete(
        `${process.env.REACT_APP_API_URL}/document/${id}`
    )
    return { data, status, statusText }
}

export {
    fetchAllDocuments,
    fetchDocument,
    updateDocument,
    createDocument,
    deleteDocument,
}