import Url from "../models/Url.js";
import { isValidUrl } from "../utils/validateUrl.js";
import shortid from "shortid";
import QRCode from "qrcode";

// Shorten URL
export const shortenUrl = async (req, res) => {
  const { originalUrl } = req.body;

  if (!isValidUrl(originalUrl)) {
    return res.status(400).json({ error: "Invalid URL" });
  }

  try {
    let url = await Url.findOne({ originalUrl });
    if (url) {
      return res.json(url);
    } else {
      const shortCode = shortid.generate();
      const newUrl = new Url({ originalUrl, shortCode });
      await newUrl.save();
      res.json(newUrl);
    }
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Redirect
export const redirectUrl = async (req, res) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.code });
    if (url) {
      url.clicks++;
      await url.save();
      return res.redirect(url.originalUrl);
    } else {
      return res.status(404).json({ error: "URL not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Generate QR Code
export const generateQRCode = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const url = await Url.findOne({ shortCode });
    if (!url) return res.status(404).json({ error: "URL not found" });

    // IMPORTANT: BASE_URL should be set in .env file
    // For mobile access, use your computer's IP: http://10.106.18.37:5000
    const baseUrl = process.env.BASE_URL || "http://10.106.18.37:5000";
    const qr = await QRCode.toDataURL(`${baseUrl}/${shortCode}`);
    res.json({ qr });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Get all URLs
export const getAllUrls = async (req, res) => {
  try {
    const urls = await Url.find().sort({ createdAt: -1 });
    res.json(urls);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};
