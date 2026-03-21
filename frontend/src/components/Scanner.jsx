import React, { useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { toast } from "react-toastify";
import { CameraIcon, XIcon } from "lucide-react";

const Scanner = ({ onScanSuccess, onClose }) => {
  const scannerRef = useRef(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "scanner-container",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false,
    );

    scanner.render(
      (decodedText) => {
        if (onScanSuccess) {
          onScanSuccess(decodedText);
          toast.success(`Scanned: ${decodedText}`);
        }
      },
      (error) => {
        if (error?.name !== "NotFoundException") {
          console.warn("Scanner error:", error);
        }
      },
    );

    scannerRef.current = scanner;

    return () => {
      scanner.clear().catch(console.error);
    };
  }, [onScanSuccess]);

  return (
    <div className="card relative fade-in">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow">
            <CameraIcon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            QR Scanner
          </h3>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <XIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        )}
      </div>

      {/* Scanner Container */}
      <div
        id="scanner-container"
        className="w-full h-72 flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-b-xl"
      />
    </div>
  );
};

export default Scanner;
