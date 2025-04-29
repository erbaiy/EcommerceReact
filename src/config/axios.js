import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_HOST,
})

// // add token to request header
// axiosInstance.interceptors.request.use(
//     (config) => {
//         config.withCredentials = true
//         const token = localStorage.getItem('ticket')
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`
//         }
//         return config
//     },   
//     (error) => {
//         return Promise.reject(error)
//     }
// )

export default axiosInstance