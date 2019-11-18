import axios from 'axios'

const axiosInstance = axios.create({ baseURL: process.env.API_BASE_URL || 'http://localhost:8080/api/v1' })

export default axiosInstance

