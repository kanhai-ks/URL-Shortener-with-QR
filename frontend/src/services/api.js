import axios from "axios";
import { toast } from "react-toastify";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || window.location.origin,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for auth/logging
API.interceptors.request.use(
  (config) => {
    // Add auth token if implemented
    // const token = localStorage.getItem('token');
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    console.log("API Request:", config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  },
);

// Response interceptor for error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.status, error.response?.data);

    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      const message = error.response.data?.message || "Something went wrong";

      switch (status) {
        case 400:
          toast.error(`Invalid request: ${message}`);
          break;
        case 401:
          toast.error("Unauthorized. Please log in.");
          // Optionally redirect to login
          break;
        case 403:
          toast.error("Forbidden. Insufficient permissions.");
          break;
        case 404:
          toast.error("Resource not found.");
          break;
        case 429:
          toast.error("Too many requests. Please try again later.");
          break;
        case 500:
          toast.error("Server error. Please try again.");
          break;
        default:
          toast.error(message);
      }
    } else if (error.request) {
      // Network error
      toast.error("Network error. Check your connection.");
    } else {
      toast.error("Unexpected error occurred.");
    }

    return Promise.reject(error);
  },
);

// API methods with retry logic
const apiCall = async (fn, retries = 2) => {
  for (let i = 0; i <= retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === retries || error.response?.status >= 500) {
        throw error;
      }
      // Wait exponential backoff
      await new Promise((resolve) =>
        setTimeout(resolve, Math.pow(2, i) * 1000),
      );
    }
  }
};

export const shortenUrl = (data) => apiCall(() => API.post("/shorten", data));
export const getQRCode = (shortCode) =>
  apiCall(() => API.get(`/qr/${shortCode}`));
export const getAllUrls = () => apiCall(() => API.get("/all"));

// Utility to update VITE_API_URL fallback
export const setApiBaseUrl = (url) => {
  API.defaults.baseURL = url;
};
