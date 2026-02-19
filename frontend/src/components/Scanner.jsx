import React, { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const Scanner = () => {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 });
    scanner.render(
      (decodedText) => {
        alert(`Scanned result: ${decodedText}`);
      },
      (error) => {
        console.warn(error);
      },
    );
  }, []);

  return <div id="reader" style={{ width: "100%" }}></div>;
};

export default Scanner;
