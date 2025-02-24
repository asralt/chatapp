import axios from 'axios'

export const axiostInstance = axios.create({
    baseURL: "http://localhost:5173/api",
    withCredentials: true,
})