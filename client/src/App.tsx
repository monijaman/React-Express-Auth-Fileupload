import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Updated imports for v6
import { AuthProvider } from "./Context/AuthContext"; // AuthContext for user state
 import Login from "./Components/Login";
import Register from "./Components/Register";
import PrivateRoute from "./Components/PrivateRoute"; // Assuming @ alias is configured
 import Dashboard from "./Components/Dashboard";
const App = () => {
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
