import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 shadow-lg">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">URL Shortener Scanner</h1>
            <div className="flex gap-6">
              <Link
                to="/"
                className="hover:text-blue-200 transition duration-200"
              >
                Home
              </Link>
              <Link
                to="/dashboard"
                className="hover:text-blue-200 transition duration-200"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </nav>
        <main className="container mx-auto py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </Router>
  );
}

export default App;
