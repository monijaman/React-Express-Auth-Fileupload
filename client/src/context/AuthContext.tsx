import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ApiResponse, User } from "../types";
import { BASE_URL } from "../utils/constants";
import Cookies from "js-cookie";

// Define the AuthProviderProps to accept children as a ReactNode
interface AuthProviderProps {
  children: ReactNode;
}
interface AuthContextProps {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    fullName: string,
    password: string
  ) => Promise<void>;
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

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(() => Cookies.get('token') || null);

  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const initializeUser = async () => {
      if (token) {
        await fetchUser(token);
      }
      setLoading(false); // Set loading to false after initialization
    };

    initializeUser();
  }, [token]);

  const fetchUser = async (token: string) => {
    try {
      const response = await fetch(`${BASE_URL}/api/getuser`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`API responded with status ${response.status}`);
      }

      const data: ApiResponse = await response.json();
      if (data.success) {
        console.log("=+++==", data.user);
        setUser(data.user || null);
      } else {
        setError(data.error || "Failed to fetch user");
        setUser(null); // Explicitly set user to null on failure
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setError("Network error");
      setUser(null); // Handle errors gracefully
    }
  };
  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${BASE_URL}/api/login`, {
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
        // localStorage.setItem("token", data.user?.token || "");

        Cookies.set("token", data.user?.token || "", {
          expires: 7,       // Expiration in days
          secure: true,     // Use secure cookies
          sameSite: "strict" // Protect against CSRF
      });
      
      } else {
        setError(data.error || "Login failed");
      }
    } catch (error) {
      setError("Network error");
    }
  };

  const register = async (
    email: string,
    fullName: string,
    password: string
  ) => {
    try {
      const response = await fetch(`${BASE_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, fullName, password }),
      });

      const data: ApiResponse = await response.json();

      if (data.success) {
        setUser(data.user || null);
        // setToken(data.user?.token || null);
        // localStorage.setItem("token", data.user?.token || "");
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
    // localStorage.removeItem("token");
    Cookies.remove('token');

  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, error }}>
      {!loading ? children : <div>Loading...</div>}{" "}
      {/* Show loading indicator */}
    </AuthContext.Provider>
  );
};
