import axios from "axios";
import React, { useEffect } from "react";

const ForgotPassword = () => {
  useEffect(() => {
    callForgotPasswordApi();
  }, []);

  const callForgotPasswordApi = async () => {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:300/api/users/forgot-password",
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res);
  };
  return <div>ForgotPassword</div>;
};

export default ForgotPassword;
