import axios from 'axios'

export const sendForm = (data) => {
    return axios.post("/api/create-form", data)
}