import React from "react";
import { Route, Navigate } from "react-router-dom"; // Updated imports for v6
import { useAuth } from "@/context/AuthContext"; // Assuming @ alias is configured

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user } = useAuth(); // Assuming user is fetched from AuthContext

  if (!user) {
    return <Navigate to="/login" replace />; // Redirect to login if not authenticated
  }

  return <>{children}</>; // Render the protected component if authenticated
};

export default PrivateRoute;
