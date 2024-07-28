import axios from 'axios';

const BASE_API_URL = "http://localhost:8000";

export const baseApi = axios.create({
    baseURL: BASE_API_URL,
});

// Request interceptor to include token
baseApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor to handle errors
baseApi.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error);
        return Promise.reject(error);
    }
);

// API endpoints
export const LoginUri = "/auth/login";
export const GetUserUri = "/user/fetchProfile";
