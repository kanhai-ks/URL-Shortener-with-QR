import axios from "axios";

const API_BASE =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/url";

const api = axios.create({
  baseURL: API_BASE,
});

// API methods
export const shortenUrl = async (data) => {
  const response = await api.post("/shorten", data);
  return response.data;
};

export const getAllUrls = async () => {
  const response = await api.get("/all");
  return response.data;
};

export const getQRCode = async (shortCode) => {
  const response = await api.get(`/qr/${shortCode}`);
  return response.data;
};

export default api;
