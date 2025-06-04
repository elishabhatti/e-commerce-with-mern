import axios from "axios";
import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  let isLoggedIn = !!token;

  const logoutUser = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/users/logout",
        {},
        {
          withCredentials: true,
        }
      );
      setToken("");
      localStorage.removeItem("token");
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
    }
  };
  const storeTokenIns = (token) => {
    localStorage.setItem("token", token);
  };

  return (
    <AuthContext.Provider
      value={{ token, storeTokenIns, isLoggedIn, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("use Auth must be used within the AuthProvider");
  }
  return authContextValue;
};
