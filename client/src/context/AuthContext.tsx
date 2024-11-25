import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ApiResponse, User } from "../types"; // Import types for better type safety
import { BASE_URL } from "../utils/constants"; // Base URL for the API
import Cookies from "js-cookie"; // Cookie management library
import Loader from "../Components/Loader/Loader";
// Define the props for the AuthProvider component
interface AuthProviderProps {
  children: ReactNode; // Allows the provider to wrap child components
}

// Define the shape of the AuthContext
interface AuthContextProps {
  user: User | null; // The authenticated user object or null if not logged in
  login: (email: string, password: string) => Promise<void>; // Function to log in
  register: (
    email: string,
    fullName: string,
    password: string
  ) => Promise<void>; // Function to register a new user
  logout: () => void; // Function to log out
  error: string | null; // Stores any error messages
}

// Create the AuthContext with default value `undefined`
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Custom hook to consume the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context; // Return the context to be used in components
};

// Define the AuthProvider component to manage authentication state
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null); // Stores the authenticated user
  const [error, setError] = useState<string | null>(null); // Stores error messages
  const [token, setToken] = useState<string | null>(() => Cookies.get("token") || null); // Retrieve token from cookies on initialization
  const [loading, setLoading] = useState(true); // Tracks whether the app is initializing

  // useEffect to initialize the user on app load
  useEffect(() => {
    const initializeUser = async () => {
      if (token) {
        await fetchUser(token); // Fetch user data if token exists
      }
      setLoading(false); // Mark initialization as complete
    };

    initializeUser();
  }, [token]);

  // Fetches the authenticated user's data from the API
  const fetchUser = async (token: string) => {
    try {
      const response = await fetch(`${BASE_URL}/api/getuser`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`API responded with status ${response.status}`);
      }

      const data: ApiResponse = await response.json();
      if (data.success) {
        setUser(data.user || null); // Set the user state if API call is successful
      } else {
        setError(data.error || "Failed to fetch user"); // Set an error message
        setUser(null); // Clear user state on failure
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setError("Network error");
      setUser(null); // Clear user state on network error
    }
  };

  // Handles user login
  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${BASE_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // Send email and password as JSON
      });

      const data: ApiResponse = await response.json();

      if (data.success) {
        setUser(data.user || null); // Set the authenticated user
        setToken(data.user?.token || null); // Set the token state

        // Save the token in cookies for persistent login
        Cookies.set("token", data.user?.token || "", {
          expires: 7, // Token expires in 7 days
          secure: true, // Use secure cookies (HTTPS only)
          sameSite: "strict", // Protect against CSRF
        });
      } else {
        setError(data.error || "Login failed"); // Set an error message
      }
    } catch (error) {
      setError("Network error"); // Handle network errors
    }
  };

  // Handles user registration
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
        body: JSON.stringify({ email, fullName, password }), // Send registration details
      });

      const data: ApiResponse = await response.json();

      if (data.success) {
        setUser(data.user || null); // Automatically log in the new user
      } else {
        setError(data.error || "Registration failed"); // Set an error message
      }
    } catch (error) {
      setError("Network error"); // Handle network errors
    }
  };

  // Handles user logout
  const logout = () => {
    setUser(null); // Clear user state
    setToken(null); // Clear token state
    Cookies.remove("token"); // Remove token from cookies
  };

  return (
    // Provide authentication state and actions to the rest of the app
    <AuthContext.Provider value={{ user, login, register, logout, error }}>
      {!loading ? (
        children // Render children when loading is complete
      ) : (
        <Loader /> // Show a loading indicator during initialization
      )}
    </AuthContext.Provider>
  );
};
