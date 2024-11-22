import React from "react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Sidebar */}
      <div className="bg-blue-800 text-white w-64 p-4">
        <h2 className="text-xl font-semibold mb-6">Dashboard</h2>
        <ul>
          <li className="mb-4 hover:text-gray-300">
            <a href="/dashboard">Overview</a>
          </li>
          <li className="mb-4 hover:text-gray-300">
            <a href="/dashboard/settings">Settings</a>
          </li>
          <li className="mb-4 hover:text-gray-300">
            <a href="/dashboard/profile">Profile</a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          Welcome to the Dashboard
        </h1>

        {/* Card or Widget Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-medium text-gray-700">Statistics</h3>
            <p className="text-gray-600 mt-2">
              View your data and statistics here.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-medium text-gray-700">
              Recent Activities
            </h3>
            <p className="text-gray-600 mt-2">
              Track your recent activities and interactions.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-medium text-gray-700">Settings</h3>
            <p className="text-gray-600 mt-2">
              Update your preferences and settings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
