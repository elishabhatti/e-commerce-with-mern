import React, { useState } from "react";
import Input from "../components/Input";
import { motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [resending, setResending] = useState(false); // New state for resend loader
  const navigate = useNavigate()

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(""); // Clear previous messages

    try {
      const res = await axios.post(
        "http://localhost:3000/api/users/verify-email-code",
        { code },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      setMessage(res.data.message || "Email verified successfully!"); // Set success message
      setCode(""); 
      navigate("/profile")
    } catch (error) {
      console.error("Verification error:", error);
      setMessage(
        error.response?.data?.message ||
          "An error occurred during verification. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResendLink = async () => {
    setResending(true); // Start resend loader
    setMessage(""); // Clear previous messages

    try {
      const res = await axios.post(
        "http://localhost:3000/api/users/verify-email",
        {},
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(res); // For debugging
      setMessage(res.data.message || "Verification link sent successfully!"); // Set success message for resend
    } catch (error) {
      console.error("Resend link error:", error);
      setMessage(
        error.response?.data?.message ||
          "Failed to resend verification link. Please try again later."
      );
    } finally {
      setResending(false); // Stop resend loader
    }
  };

  return (
    <div className="flex mt-10 items-center justify-center p-4 font-sans text-gray-900">
      <motion.div
        className="p-8 rounded-lg w-full max-w-sm border border-gray-300"
        variants={formVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="text-center mb-6" variants={itemVariants}>
          <Mail className="w-16 h-16 text-blue-500 mx-auto mb-4" />
          <b className="block text-2xl font-bold mb-2">Verify Your Email</b>
          <p className="text-gray-600 text-sm mb-4">
            Your email has not been verified yet. Please enter the 8-digit code
            or request a new link.
          </p>
          <motion.button
            onClick={handleResendLink}
            className="w-full cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={resending}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {resending ? ( // Use resending state for this loader
              <motion.svg
                className="animate-spin h-5 w-5 text-gray-800 mx-auto"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
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
              </motion.svg>
            ) : (
              "Resend Verification Link"
            )}
          </motion.button>
        </motion.div>

        <hr className="my-6 border-gray-300" />

        <motion.form
          onSubmit={handleVerifyCode}
          className="space-y-6"
          variants={formVariants}
        >
          <motion.div variants={itemVariants}>
            <Input
              label="Verification Code"
              name="code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter 8-Digit Code"
              required
              className="bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
              icon={<Lock className="h-5 w-5 text-gray-400" />}
            />
          </motion.div>
          <motion.button
            type="submit"
            className="w-full cursor-pointer bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out font-semibold text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.005] active:scale-[0.995] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            disabled={loading}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            variants={itemVariants}
          >
            {loading ? (
              <>
                <motion.svg
                  className="h-5 cursor-pointer w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
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
                </motion.svg>
                Verifying Code...
              </>
            ) : (
              "Verify Code"
            )}
          </motion.button>
        </motion.form>

        {message && (
          <motion.p
            className={`mt-4 text-center text-sm ${
              message.includes("success") || message.includes("sent")
                ? "text-green-600"
                : "text-red-500"
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {message}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default VerifyEmail;
