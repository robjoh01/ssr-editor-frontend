import axios from "axios"

async function fetchAllDocuments() {
    const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/document/all`
    )
    return data
}

async function fetchDocument(id) {
    const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/document/${id}`
    )
    return data
}

async function updateDocument({ id, document }) {
    const { data } = await axios.put(
        `${process.env.REACT_APP_API_URL}/document/${id}`,
        document
    )
    return data
}

async function createDocument(document) {
    const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/document/create`,
        document
    )
    return data
}

async function deleteDocument(id) {
    const { data } = await axios.delete(
        `${process.env.REACT_APP_API_URL}/document/${id}`
    )
    return data
}

export {
    fetchAllDocuments,
    fetchDocument,
    updateDocument,
    createDocument,
    deleteDocument,
}
