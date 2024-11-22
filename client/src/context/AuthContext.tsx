import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, ApiResponse } from "../types";
// Define the AuthProviderProps to accept children as a ReactNode
interface AuthProviderProps {
    children: ReactNode;
  }
interface AuthContextProps {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, fullName: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider  = ({ children }:AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      fetchUser(token);
    }
  }, [token]);

  const fetchUser = async (token: string) => {
    const response = await fetch("http://localhost:5000/api/getuser", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data: ApiResponse = await response.json();
    if (data.success) {
      setUser(data.user || null);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data: ApiResponse = await response.json();

      if (data.success) {
        setUser(data.user || null);
        setToken(data.user?.token || null);
        localStorage.setItem("token", data.user?.token || "");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (error) {
      setError("Network error");
    }
  };

  const register = async (email: string, fullName: string, password: string) => {
    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, fullName, password }),
      });

      const data: ApiResponse = await response.json();

      if (data.success) {
        setUser(data.user || null);
        setToken(data.user?.token || null);
        localStorage.setItem("token", data.user?.token || "");
      } else {
        setError(data.error || "Registration failed");
      }
    } catch (error) {
      setError("Network error");
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};
