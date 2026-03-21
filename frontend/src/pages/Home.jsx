import React from "react";
import UrlForm from "../components/UrlForm";

const Home = () => (
  <div className="text-center py-20 px-4">
    <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
      Shorten • Scan • Share
    </h1>
    <p className="text-lg text-gray-600 mb-10">
      The ultimate URL shortener with instant QR code generation.
    </p>
    <UrlForm />
    <a href="/dashboard" className="btn-primary mt-10 inline-block">
      🚀 Go to Dashboard
    </a>
  </div>
);

export default Home;
