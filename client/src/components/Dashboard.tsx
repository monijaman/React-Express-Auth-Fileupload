import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import FileList from "./FileList";
import FileUpload from "./FileUpload";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="bg-blue-800 text-white w-64 p-4 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-8">MyApp Dashboard</h1>
          <ul className="space-y-4">
            <li className="hover:text-gray-300">
              <a href="/dashboard">Overview</a>
            </li>
            <li className="hover:text-gray-300">
              <a href="/dashboard/settings">Settings</a>
            </li>
            <li className="hover:text-gray-300">
              <a href="/dashboard/profile">Profile</a>
            </li>
          </ul>
        </div>
        <button
          onClick={handleLogout}
          className="mt-8 p-3 bg-red-500 hover:bg-red-600 rounded-md"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold text-gray-800">
            Welcome, {user?.fullName || "User"}
          </h2>
        </header>

        {/* Existing Widgets */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-medium text-gray-700">Statistics</h3>
            <p className="text-gray-600 mt-2">
              View your data and statistics here.
            </p>
          </div>
        </section>

        {/* File Components */}
        <FileUpload />
        <FileList />
      </main>
    </div>
  );
};

export default Dashboard;
