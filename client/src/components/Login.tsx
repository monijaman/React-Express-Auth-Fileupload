import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useAuth } from "../Context/AuthContext"; // Assuming you have an AuthContext
import Cookies from "js-cookie";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const { login, error } = useAuth(); // Assuming login and error come from AuthContext
  const [email, setEmail] = useState<string>("monir4@example.com");
  const [password, setPassword] = useState<string>("monir");
  const navigate = useNavigate(); // Initialize useNavigate
  const token = Cookies.get("token"); // Retrieve token from cookies
  
  // Redirect if token is already present
  useEffect(() => {
    if (token) {
       // Validate the token
      validateToken(token);
    }
  }, [token]);

  // Token validation API call
  const validateToken = async (token: string) => {
    try {
      const response = await fetch(`${BASE_URL}/api/validate-token`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Send the token in the Authorization header
        },
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Token is valid, redirect to dashboard
        navigate("/dashboard");
      } else {
        // Token is invalid, redirect to login page
       Cookies.remove("token"); // Remove invalid token from cookies
       navigate("/login");
      }
    } catch (error) {
      console.error("Error validating token:", error);
      // If error occurs, treat token as invalid and navigate to login
      Cookies.remove("token");
      navigate("/login");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password); // Call login function from context

    // After login, check if the token was received
    const newToken = Cookies.get("token");
    if (newToken && !error) {
      navigate("/dashboard"); // Redirect to the dashboard if login succeeds and token is set
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
