import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import Input from "../components/Input"; // Ensure this path is correct
import { useEffect } from "react";

const LoginUser = () => {
  const { storeTokenIns } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false); // State for "Remember me" checkbox

  // Animation variants for Framer Motion
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
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.3 },
    },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email address is invalid.";
    if (!formData.password) newErrors.password = "Password is required.";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters long.";
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
        "http://localhost:3000/api/users/login",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      storeTokenIns(response.data.token);
      toast.success("Login successful! Welcome back.");
      navigate("/");
      setFormData({
        email: "",
        password: "",
      });
    } catch (error) {
      
      const errorMessage =
        error.response?.data?.message || "Failed to log in. Please try again.";
      toast.error(errorMessage);
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetGooglePage = () => {
    window.location.href = `${import.meta.env.VITE_SERVER_URL}/api/users/google`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 font-sans text-gray-800">
      {/* Top Logo Section */}
      <motion.div
        className="mb-8 md:mb-12"
        variants={logoVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Replace with your actual logo component or image */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-4xl font-bold text-blue-600">Devias</span>
          <span className="text-4xl font-bold text-gray-900">Login Page</span>
        </Link>
      </motion.div>

      <motion.div
        className="flex flex-col md:flex-row w-full max-w-5xl lg:max-w-6xl xl:max-w-7xl bg-white shadow-xl rounded-2xl overflow-hidden" // Refined shadow and roundedness
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left Side: Illustration */}
        <motion.div
          className="relative w-full md:w-1/2 min-h-[300px] md:min-h-[500px] flex items-center justify-center overflow-hidden bg-[#20202F] text-white"
          variants={imageSideVariants}
        >
          {/* Overlay on top of the image */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-700/10 to-indigo-700/10 z-10" />

          {/* Full background image */}
          <img
            src="/images/login-user-image.jpg"
            alt="Secure Login Illustration"
            className="absolute inset-0 w-full h-full object-cover z-0"
            loading="lazy"
          />
          <div className="relative z-10 text-center mt-125 md:mb-0">
            <h3 className="text-3xl text-black font-bold">Welcome aboard!</h3>
            <p className="text-black text-lg">
              Sign in to manage your account.
            </p>
          </div>
        </motion.div>

        {/* Right Side: Login Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
          <motion.h2
            className="text-4xl font-extrabold mb-2 text-center text-gray-900 leading-tight"
            variants={itemVariants}
          >
            Sign In
          </motion.h2>
          <motion.p
            className="text-center text-gray-600 mb-8 text-md"
            variants={itemVariants}
          >
            Welcome back, please login to your account.
          </motion.p>

          {/* Google Sign-in Button */}
          <motion.button
            type="button"
            className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-700 font-semibold hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => handleGetGooglePage()}
          >
            <img
              className="w-5"
              src="/images/google-logo.png"
              alt="Google Logo"
            />
            Continue with Google
          </motion.button>

          {/* OR Separator */}
          <motion.div
            className="relative flex items-center py-4"
            variants={itemVariants}
          >
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink mx-4 text-gray-400 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </motion.div>

          {/* Login Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-5"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <Input
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                error={errors.email}
                className="pl-10" // Ensure extra padding for icon
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <Input
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                error={errors.password}
                className="pl-10" // Ensure extra padding for icon
              />
            </motion.div>

            {/* Remember Me & Forgot Password */}
            <motion.div
              className="flex items-center justify-between text-sm"
              variants={itemVariants}
            >
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-gray-900"
                >
                  Remember me
                </label>
              </div>
              <Link
                to="/forgot-password"
                className="font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200"
              >
                Forgot Password?
              </Link>
            </motion.div>

            {/* Sign In Button */}
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
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </motion.button>
          </motion.form>

          {/* Don't have an account? */}
          <motion.p
            className="text-center text-sm text-gray-500 mt-6"
            variants={itemVariants}
          >
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200"
            >
              Sign up
            </Link>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginUser;
