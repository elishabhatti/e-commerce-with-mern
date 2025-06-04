import React, { useEffect } from "react";
import { useAuth } from "../store/auth";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const LogoutPage = () => {
  const { logoutUser } = useAuth(); // note lowercase

  useEffect(() => {
    const handleLogout = async () => {
      await logoutUser();
      toast.success("User logged out successfully!");
    };

    handleLogout();
  }, [logoutUser]);

  return <Navigate to="/login" />;
};

export default LogoutPage;
