import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { toast } from "react-toastify";

const Scanner = () => {
  const [scannedResult, setScannedResult] = useState(null);
  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false,
    );

    scanner.render(
      (decodedText) => {
        setScannedResult(decodedText);
        setIsScanning(false);
        scanner.clear();
        toast.success("QR Code scanned successfully!");
      },
      (error) => {
        console.warn(error);
      },
    );

    return () => {
      try {
        scanner.clear();
      } catch (e) {
        // Scanner may not be ready yet
      }
    };
  }, []);

  const handleRedirect = () => {
    if (scannedResult) {
      window.open(scannedResult, "_blank");
    }
  };

  const handleReset = () => {
    setScannedResult(null);
    setIsScanning(true);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">QR Code Scanner</h2>

      {isScanning && <div id="reader" className="w-full"></div>}

      {scannedResult && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">Scanned Result:</p>
          <p className="text-lg font-semibold text-gray-800 break-all mb-4">
            {scannedResult}
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleRedirect}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
            >
              Open URL
            </button>
            <button
              onClick={handleReset}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
            >
              Scan Another
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scanner;
