import React, { useEffect, useState } from "react";
import axios from "axios";

const UrlList = () => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/all`,
        );
        setUrls(data);
      } catch (error) {
        console.error("Error fetching URLs", error);
      }
    };
    fetchUrls();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">All Shortened URLs</h2>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Original URL</th>
            <th className="border px-4 py-2">Short URL</th>
            <th className="border px-4 py-2">Clicks</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((url) => (
            <tr key={url._id}>
              <td className="border px-4 py-2">{url.originalUrl}</td>
              <td className="border px-4 py-2">
                <a
                  href={`${process.env.REACT_APP_API_URL}/${url.shortCode}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 underline"
                >
                  {`${process.env.REACT_APP_API_URL}/${url.shortCode}`}
                </a>
              </td>
              <td className="border px-4 py-2">{url.clicks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UrlList;
