import React, { useState } from "react";
import Input from "../components/Input"; // Ensure this path is correct
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { postRequest } from "../../utils/api";

const Register = () => {
  const { storeTokenIns } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
    address: "",
    phone: "",
    adminSecret: "",
  });

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const logoVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut", delay: 0.1 },
    },
  };

  const imageSideVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.3 },
    },
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/admin/register-admin",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      setFormData({
        name: "",
        email: "",
        password: "",
        avatar: "",
        address: "",
        phone: "",
        adminSecret: "",
      });
      console.log(response);
      storeTokenIns(response.data.token);
      toast.success("Registration Successful!");
      navigate("/admin-dashboard");
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 font-sans text-gray-800">
      <motion.div
        className="mb-8 md:mb-12"
        variants={logoVariants}
        initial="hidden"
        animate="visible"
      >
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-4xl font-bold text-red-600">Admin</span>
          <span className="text-4xl font-bold text-gray-900">
            Panel Sign Up
          </span>
        </Link>
      </motion.div>

      <motion.div
        className="flex flex-col md:flex-row-reverse w-full max-w-5xl bg-white shadow-xl rounded-2xl overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
          <motion.h2
            className="text-4xl font-extrabold mb-2 text-center text-gray-900 leading-tight"
            variants={itemVariants}
          >
            Admin Registration
          </motion.h2>
          <motion.p
            className="text-center text-gray-600 mb-8 text-md"
            variants={itemVariants}
          >
            Only authorized users can register as admin.
          </motion.p>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-5"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <Input
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Admin Name"
                required
                error={errors.name}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Input
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@example.com"
                required
                error={errors.email}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Input
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                error={errors.password}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Input
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="123 Admin St"
                required
                error={errors.address}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Input
                label="Phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g., +1 (123) 456-7890"
                required
                error={errors.phone}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Input
                label="Avatar URL (Optional)"
                name="avatar"
                type="url"
                value={formData.avatar}
                onChange={handleChange}
                placeholder="https://example.com/avatar.jpg"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Input
                label="Admin Secret Key"
                name="adminSecret"
                type="password"
                value={formData.adminSecret}
                onChange={handleChange}
                placeholder="Enter admin secret"
                required
                error={errors.adminSecret}
              />
            </motion.div>

            <motion.button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition duration-300 ease-in-out font-semibold text-lg disabled:opacity-50"
              disabled={loading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              variants={itemVariants}
            >
              {loading ? "Registering..." : "Register as Admin"}
            </motion.button>
          </motion.form>

          <motion.p
            className="text-center text-sm text-gray-500 mt-6"
            variants={itemVariants}
          >
            Already an admin?{" "}
            <Link
              to="/admin-login"
              className="font-semibold text-red-600 hover:text-red-700 transition-colors"
            >
              Login here
            </Link>
          </motion.p>
        </motion.div>

        <motion.div
          className="hidden md:flex md:w-1/2 items-center justify-center bg-[#20202F] p-10"
          variants={imageSideVariants}
        >
          <div className="text-white text-center">
            <h3 className="text-3xl font-bold mb-4">Welcome Admin!</h3>
            <p className="text-gray-300 text-lg">
              Manage your platform efficiently with your new admin account.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Register;
