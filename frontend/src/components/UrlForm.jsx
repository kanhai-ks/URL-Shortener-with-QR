import React, { useState } from "react";
import { shortenUrl, getQRCode } from "../services/api";
import { toast } from "react-toastify";
// import QRCode from "qrcode.react";

const UrlForm = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [qrCode, setQrCode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await shortenUrl(url);
      setShortUrl(`${process.env.REACT_APP_API_URL}/${data.shortCode}`);
      const qr = await getQRCode(data.shortCode);
      setQrCode(qr.data.qr);
      toast.success("URL shortened successfully!");
    } catch (error) {
      toast.error("Error shortening URL");
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Shorten
        </button>
      </form>

      {shortUrl && (
        <div className="mt-4">
          <p>
            Short URL:{" "}
            <a href={shortUrl} target="_blank" rel="noreferrer">
              {shortUrl}
            </a>
          </p>
          {qrCode && <img src={qrCode} alt="QR Code" />}
        </div>
      )}
    </div>
  );
};

export default UrlForm;
