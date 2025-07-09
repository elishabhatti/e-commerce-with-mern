import React, { useState } from "react";
import Input from "../components/Input";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const RegisterUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
    address: "",
    phone: "",
  });

  const { storeTokenIns } = useAuth();
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

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Full name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email address is invalid.";
    if (!formData.password) newErrors.password = "Password is required.";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters long.";
    if (!formData.address) newErrors.address = "Address is required.";
    if (!formData.phone) newErrors.phone = "Phone number is required.";
    else if (!/^\d{10,}$/.test(formData.phone))
      newErrors.phone = "Please enter a valid phone number.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const formValidationErrors = validateForm();
    if (Object.keys(formValidationErrors).length > 0) {
      setErrors(formValidationErrors);
      toast.error("Please correct the form errors.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/register",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      storeTokenIns(response.data.token);
      toast.success("Registration successful! Welcome.");
      navigate("/");
      setFormData({
        name: "",
        email: "",
        password: "",
        avatar: "",
        address: "",
        phone: "",
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      toast.error(errorMessage);
      console.error("Registration error:", error);
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
          <span className="text-4xl font-bold text-blue-600">Devias</span>
          <span className="text-4xl font-bold text-gray-900">
            Register Page
          </span>
        </Link>
      </motion.div>

      <motion.div
        className="flex flex-col md:flex-row-reverse items-stretch w-full max-w-5xl lg:max-w-6xl xl:max-w-7xl bg-white shadow-xl rounded-2xl overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Right Side: Illustration */}
        <motion.div
          className="relative w-full md:w-1/2 min-h-[500px] flex flex-col items-center justify-center p-8 text-white text-center overflow-hidden"
          variants={imageSideVariants}
        >
          <img
            src="https://www.bizzabo.com/wp-content/uploads/2018/10/12-Registration-Pages-for-Events-That-Convert_16x9.png"
            alt="Register Illustration"
            className="absolute w-full h-full object-cover z-0"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-700/30 to-indigo-700/30 z-10"></div>
          <div className="relative z-20 mt-6 md:mt-10">
            <h3 className="text-3xl font-bold mb-2">Join Us Today!</h3>
            <p className="text-gray-200 text-lg">
              Unlock a world of possibilities by creating your free account.
            </p>
          </div>
        </motion.div>

        {/* Left Side: Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
          <motion.h2
            className="text-4xl font-extrabold mb-2 text-center text-gray-900 leading-tight"
            variants={itemVariants}
          >
            Create Your Account
          </motion.h2>
          <motion.p
            className="text-center text-gray-600 mb-8 text-md"
            variants={itemVariants}
          >
            Fill in your details to get started.
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
                placeholder="John Doe"
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
                placeholder="your@example.com"
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
                hint="Password must be at least 6 characters long."
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <Input
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="123 Main St, Anytown"
                required
                error={errors.address}
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <Input
                label="Phone"
                name="phone"
                type="number"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g., +1 (555) 123-4567"
                required
                error={errors.phone}
              />
            </motion.div>
            <motion.div
              className="flex items-start text-sm"
              variants={itemVariants}
            >
              <input
                id="terms-checkbox"
                type="checkbox"
                required
                className="mt-1 mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="terms-checkbox" className="text-gray-600">
                I have read and agree to the{" "}
                <a
                  href="#"
                  className="text-blue-600 hover:underline font-medium hover:text-blue-700 transition-colors duration-200"
                >
                  Terms and Conditions
                </a>
              </label>
            </motion.div>

            <motion.button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out font-semibold text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.005] active:scale-[0.995] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              disabled={loading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              variants={itemVariants}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Registering...
                </>
              ) : (
                "SIGN UP NOW"
              )}
            </motion.button>
          </motion.form>

          <motion.p
            className="text-center text-sm text-gray-500 mt-6"
            variants={itemVariants}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200"
            >
              Login here
            </Link>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterUser;
