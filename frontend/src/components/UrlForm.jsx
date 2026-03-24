import React, { useState } from "react";
import { shortenUrl, getQRCode } from "../services/api";
import CopyButton from "./CopyButton";
import LoadingSpinner from "./LoadingSpinner";

const UrlForm = ({ initialUrl = "" }) => {
  const [url, setUrl] = useState(initialUrl);
  const [shortUrl, setShortUrl] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    try {
      const data = await shortenUrl({ originalUrl: url }); // FIXED
      const baseUrl = (
        import.meta.env.VITE_API_URL || window.location.origin
      ).replace(/\/$/, "");
      const fullShortUrl = `${baseUrl}/${data.shortCode}`;
      setShortUrl(fullShortUrl);

      const qrResponse = await getQRCode(data.shortCode); // FIXED
      setQrCode(qrResponse.qr);
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to shorten URL");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="url"
          placeholder="Enter URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="input-field"
          required
        />
        <button type="submit" className="btn-primary w-full" disabled={loading}>
          {loading ? <LoadingSpinner /> : "🚀 Shorten URL"}
        </button>
      </form>

      {shortUrl && (
        <div className="mt-6 text-center space-y-3">
          <p className="font-bold text-lg">Your Short URL:</p>
          <a
            href={shortUrl}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline"
          >
            {shortUrl}
          </a>
          <CopyButton text={shortUrl} />

          {qrCode && (
            <div className="mt-6">
              <p className="font-semibold">📱 QR Code</p>
              <img src={qrCode} alt="QR Code" className="mx-auto w-48 h-48" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UrlForm;
