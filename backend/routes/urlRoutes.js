import express from "express";
import {
  shortenUrl,
  redirectUrl,
  generateQRCode,
  getAllUrls,
} from "../controllers/urlController.js";

const router = express.Router();

router.post("/shorten", shortenUrl);
router.get("/all", getAllUrls);
router.get("/:code", redirectUrl);
router.get("/qr/:shortCode", generateQRCode);

export default router;
