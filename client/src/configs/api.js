import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 15000,
    withCredentials: true,
})

// Attach Authorization header automatically when token exists in localStorage
api.interceptors.request.use(
    (config) => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers = config.headers || {};
                config.headers.Authorization = token;
            }
            
            // For FormData, don't set Content-Type header - let browser/axios handle it
            // This ensures proper multipart/form-data formatting with boundary
            if (config.data instanceof FormData) {
                // Delete Content-Type so axios doesn't set it - browser will set it with boundary
                if (config.headers) {
                    delete config.headers['Content-Type'];
                }
            }
        } catch {
            // ignore
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api