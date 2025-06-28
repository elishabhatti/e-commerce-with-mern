import axios from "axios";
import React, { useEffect } from "react";

const ForgotPassword = () => {
  useEffect(() => {
    callForgotPasswordApi();
  }, []);

  const callForgotPasswordApi = async () => {

    const res = await axios.get(
      "http://localhost:3000/api/users/forgot-password",
      {
        withCredentials: true,
      }
    );
    console.log(res);
  };
  return <div>ForgotPassword</div>;
};

export default ForgotPassword;
