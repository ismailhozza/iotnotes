import axios from 'axios'
const baseUrl = 'http://localhost:3002/picturelist'

const getAll = () => {
    return axios
        .get(baseUrl)
        .then(response => response.data)
}

const getOne = (id) => {
    return axios
        .get(`${baseUrl}/${id}`)
        .then(response => response.data)
}

// Post one.
const create = (newObject) => {
    return axios.post(`${baseUrl}/create`, newObject)
}

// Put one.
const updateOne = (id, newObject) => {
    return axios.put(`${baseUrl}/update/${id}`, newObject)
}

// Delete one.
const deleteOne = (id) => {
    return axios.delete(`${baseUrl}/delete/${id}`)
}

export default { getAll, getOne, create, updateOne, deleteOne }