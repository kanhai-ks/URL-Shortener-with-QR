import React, { useEffect, useState } from "react";
import { getAllUrls } from "../services/api";
import CopyButton from "./CopyButton";
import LoadingSpinner from "./LoadingSpinner";

const UrlList = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const { data } = await getAllUrls();
        setUrls(data);
      } catch (err) {
        console.error("Error fetching URLs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUrls();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-4">📋 Your Links</h2>
      {urls.length === 0 ? (
        <p>No links yet. Shorten one above!</p>
      ) : (
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">Short</th>
              <th className="py-2">Original</th>
              <th className="py-2">Clicks</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {urls.map((url) => {
              const baseUrl = (
                import.meta.env.VITE_API_URL || window.location.origin
              ).replace(/\/$/, "");
              const fullShortUrl = `${baseUrl}/${url.shortCode}`;
              return (
                <tr key={url._id} className="border-b">
                  <td>
                    <a
                      href={fullShortUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline"
                    >
                      /{url.shortCode}
                    </a>
                  </td>
                  <td className="truncate">{url.originalUrl}</td>
                  <td>{url.clicks}</td>
                  <td className="space-x-2">
                    <CopyButton text={fullShortUrl} />
                    <a
                      href={fullShortUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-primary text-sm px-3 py-1"
                    >
                      Open
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UrlList;
