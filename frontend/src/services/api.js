import axios from "axios";

// IMPORTANT: Replace with your computer's IP address to access from mobile
// Run 'ipconfig' on Windows or 'ifconfig' on Mac/Linux to find your IP
// Example: http://10.106.18.37:5000/api/url
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://10.106.18.37:5000/api/url",
});

export const shortenUrl = (originalUrl) =>
  API.post("/shorten", { originalUrl });
export const getQRCode = (shortCode) => API.get(`/qr/${shortCode}`);
export const getAllUrls = () => API.get("/all");
