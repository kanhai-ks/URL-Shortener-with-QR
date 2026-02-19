import axios from "axios";

const API = axios.create({
  // baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api/url",
  baseURL: "http://localhost:5000/api/url",
});

export const shortenUrl = (originalUrl) =>
  API.post("/shorten", { originalUrl });
export const getQRCode = (shortCode) => API.get(`/qr/${shortCode}`);
