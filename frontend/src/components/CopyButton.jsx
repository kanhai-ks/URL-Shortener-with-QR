import React, { useState } from "react";

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button onClick={handleCopy} className="btn-secondary text-sm px-3 py-1">
      {copied ? "✓ Copied!" : "📋 Copy"}
    </button>
  );
};

export default CopyButton;
