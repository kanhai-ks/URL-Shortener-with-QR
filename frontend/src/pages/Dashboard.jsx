import React from "react";
import Scanner from "../components/Scanner";
import UrlList from "../components/UrlList";

const Dashboard = () => {
  return (
    <div className="p-6">
      <Scanner />
      <UrlList />
    </div>
  );
};

export default Dashboard;
