import React, { useEffect, useState } from "react";
import { getAllUrls } from "../services/api";

const UrlList = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const { data } = await getAllUrls();
        setUrls(data);
      } catch (error) {
        console.error("Error fetching URLs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUrls();
  }, []);

  // IMPORTANT: Uses the same base URL as api.js for consistency
  // This allows mobile access when configured in api.js
  const baseUrl =
    import.meta.env.VITE_API_URL || "http://10.106.18.37:5000/api/url";

  if (loading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        All Shortened URLs
      </h2>
      {urls.length === 0 ? (
        <p className="text-gray-600">
          No URLs yet. Create your first shortened URL!
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Original URL
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Short URL
                </th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">
                  Clicks
                </th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">
                  Created
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {urls.map((url) => (
                <tr key={url._id} className="hover:bg-gray-50">
                  <td
                    className="px-4 py-3 text-sm text-gray-800 max-w-xs truncate"
                    title={url.originalUrl}
                  >
                    {url.originalUrl}
                  </td>
                  <td className="px-4 py-3">
                    <a
                      href={`${baseUrl}/${url.shortCode}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-500 hover:text-blue-700 underline"
                    >
                      {`${baseUrl}/${url.shortCode}`}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-gray-600">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {url.clicks}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-gray-500">
                    {new Date(url.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UrlList;
