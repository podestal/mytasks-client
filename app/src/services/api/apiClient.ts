import axios from "axios"

// Get API URL from environment variables
// Vite automatically replaces import.meta.env.VITE_* at build time
// It reads from .env.production when mode=production
// It reads from netlify.toml [build.environment] when building on Netlify
const URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/'

// Log in development only
if (import.meta.env.DEV) {
  console.log('API URL:', URL)
  console.log('Environment Mode:', import.meta.env.MODE)
  console.log('VITE_API_URL from env:', import.meta.env.VITE_API_URL)
}
const axiosInstance = axios.create({
    baseURL: URL,
    withCredentials: true,
})

class APIClient<ResponseType, RequestType = ResponseType> {
    endpoint: string

    constructor( endpoint: string) {
        this.endpoint = endpoint
    }
    
    get = (access?: string, params?: Record<string, string>) => {

        const config: any = {}
        if (params) {
            config.params = params
        }
        if (access) {
            config.headers = { ...config.headers, Authorization: `JWT ${access}` };
        }
    
        return axiosInstance
            .get<ResponseType>(this.endpoint, config)
            .then(res => res.data);
    }

    post = (data: RequestType, access?: string, params?: Record<string, string>) => {

        const config: any = {}
        if (access) {
            config.headers = { Authorization: `JWT ${access}` }
        }

        if (params) {
            config.params = params
        }

        return axiosInstance
            .post<ResponseType>(this.endpoint, data, config)
            .then(res => res.data)            
    }

    update = (data: RequestType, access?: string, params?: Record<string, string>) => {

        const config: any = {}
        if (access) {
            config.headers = { Authorization: `JWT ${access}` }
        }

        if (params) {
            config.params = params
        }

        return axiosInstance
            .patch<ResponseType>(this.endpoint, data, config)
            .then(res => res.data)
    }

    delete = (access?: string, params?: Record<string, string>) => {

        const config: any = {}

        if (access) {
            config.headers = { Authorization: `JWT ${access}` }
        }

        if (params) {
            config.params = params
        }

        return axiosInstance
            .delete<ResponseType>(this.endpoint, config)
            .then(res => res.data)
    }
}

export default APIClient