import React, { useState } from "react";
import { shortenUrl, getQRCode } from "../services/api";
import { toast } from "react-toastify";

const UrlForm = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) {
      toast.error("Please enter a URL");
      return;
    }

    setLoading(true);
    try {
      const { data } = await shortenUrl(url);
      // IMPORTANT: Uses the same base URL as api.js for consistency
      // This allows mobile access when configured in api.js
      const baseUrl =
        import.meta.env.VITE_API_URL || "http://10.106.18.37:5000/api/url";
      setShortUrl(`${baseUrl}/${data.shortCode}`);

      const qr = await getQRCode(data.shortCode);
      setQrCode(qr.data.qr);
      toast.success("URL shortened successfully!");
    } catch (error) {
      toast.error("Error shortening URL");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">URL Shortener</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter URL (e.g., https://example.com)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-200 disabled:bg-gray-400"
        >
          {loading ? "Shortening..." : "Shorten URL"}
        </button>
      </form>

      {shortUrl && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">Short URL:</p>
          <div className="flex items-center gap-2">
            <a
              href={shortUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 underline break-all"
            >
              {shortUrl}
            </a>
            <button
              onClick={copyToClipboard}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm whitespace-nowrap"
            >
              Copy
            </button>
          </div>
          {qrCode && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">QR Code:</p>
              <img src={qrCode} alt="QR Code" className="w-32 h-32" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UrlForm;
