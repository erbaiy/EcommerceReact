import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_HOST,
    // Set default headers for CORS
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true
    },
    // Enable sending cookies across domains
    withCredentials: true
})

// add token to request header
axiosInstance.interceptors.request.use(
    (config) => {
        config.withCredentials = true
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default axiosInstance
