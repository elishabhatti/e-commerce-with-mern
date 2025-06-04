import React, { useEffect } from "react";
import { useAuth } from "../store/auth";

const LogoutUser = () => {
  const { LogoutUser } = useAuth();
  useEffect(() => {
    LogoutUser();
  }, [LogoutUser]);};

export default LogoutUser;
