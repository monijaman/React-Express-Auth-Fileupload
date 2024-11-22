import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Updated imports for v6
import { AuthProvider } from "@/context/AuthContext"; // AuthContext for user state
import Login from "@/components/Login";
import Register from "@/components/Register";
import PrivateRoute from "@/components/PrivateRoute"; // Assuming @ alias is configured
 import Dashboard from "@/components/Dashboard";
const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Protect the dashboard route with PrivateRoute */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
