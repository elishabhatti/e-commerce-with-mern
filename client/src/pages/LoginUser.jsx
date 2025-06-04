import React, { useState } from "react";
import Input from "../components/Input";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginUser = () => {
  const { storeTokenIns} = useAuth();
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

      toast.success("User Registered!");
    } catch (error) {
      toast.error(error.message);
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="flex mt-20 items-center justify-center px-4">
      <div className="flex w-full max-w-6xl">
        {/* Left form side */}
        <div className="w-full flex justify-center items-center md:w-1/2 px-8">
          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <h2 className="text-2xl font-bold">LOGIN USER</h2>
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
              className="w-full cursor-pointer bg-[#110C30] text-white py-2 rounded-md hover:bg-[#110C30] transition"
            >
              LOGIN NOW
            </button>
          </form>
        </div>

        {/* Right image side */}
        <div className="">
          <img
            src="https://img.freepik.com/premium-vector/character-using-cyber-security-services-protect-private-personal-data-user-account-password_773844-395.jpg?uid=R196206353&ga=GA1.1.2122685195.1748845237&semt=ais_items_boosted&w=740"
            alt="Sign up illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginUser;
