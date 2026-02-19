import React from "react";
import UrlForm from "../components/UrlForm";

const Home = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">URL Shortener</h1>
      <UrlForm />
    </div>
  );
};

export default Home;
