import axios from 'axios'
const baseUrl = '/api/persons'


const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}
const newPerson = (newPerson) => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

const updatePerson = (personOb, id) => {
    const request = axios.put(`${baseUrl}/${id}`, personOb)
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

export default{
    getAll,
    newPerson,
    updatePerson,
    deletePerson
}
