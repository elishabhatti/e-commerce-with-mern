import React, { useState } from "react";
import Input from "../components/Input";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginUser = () => {
  const { storeTokenIns } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        JSON.stringify(formData),
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      storeTokenIns(response.data.token);
      navigate("/");
      setFormData({
        email: "",
        password: "",
      });

      toast.success("User Logged In!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex items-center my-20  justify-center px-4">
      <div className="flex flex-col-reverse md:flex-row w-full max-w-5xl  rounded-lg overflow-hidden">
        {/* Form Side */}
        <div className="w-full md:w-1/2  flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login User</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="w-full bg-[#110C30] text-white py-2 rounded-md hover:bg-[#1a1342] transition"
            >
              Login Now
            </button>
          </form>
        </div>

        {/* Image Side */}
        <div className="w-full md:w-1/2 h-64 md:h-auto">
          <img
            src="https://img.freepik.com/premium-vector/character-using-cyber-security-services-protect-private-personal-data-user-account-password_773844-395.jpg"
            alt="Login Illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginUser;
