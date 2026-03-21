import React, { useState } from "react";
import UrlForm from "../components/UrlForm";
import UrlList from "../components/UrlList";
import Scanner from "../components/Scanner";

const Dashboard = () => {
  const [showScanner, setShowScanner] = useState(false);
  const [scannedUrl, setScannedUrl] = useState("");

  return (
    <div className="max-w-5xl mx-auto space-y-12 py-12 px-4">
      <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
        Dashboard
      </h1>

      <button
        onClick={() => setShowScanner(true)}
        className="btn-primary w-full"
      >
        📷 Open Scanner
      </button>

      {showScanner && (
        <Scanner
          onScanSuccess={(url) => setScannedUrl(url)}
          onClose={() => setShowScanner(false)}
        />
      )}

      <UrlForm initialUrl={scannedUrl} />
      <UrlList />
    </div>
  );
};

export default Dashboard;
