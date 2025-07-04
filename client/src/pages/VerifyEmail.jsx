import React, { useState } from "react";
// Assuming your Input component is flexible enough to accept custom styling or props
// If your Input component is not designed to accept an 'icon' prop, you might need to modify it.
import Input from "../components/Input";
import { motion } from "framer-motion"; // Import Framer Motion
import { Mail, Lock } from 'lucide-react'; // Import Lucide Icons for potential use

const VerifyEmail = () => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(""); // For displaying success/error messages

  // Framer Motion Variants for subtle entrance animation
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

    // Simulate API call
    try {
      // In a real application, you would make an API call here
      // const response = await axios.post("/api/verify-email", { code });
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay

      if (code === "12345678") { // Example verification logic
        setMessage("Email verified successfully!");
        // Navigate to dashboard or next page
        // navigate("/dashboard");
      } else {
        setMessage("Invalid verification code. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred during verification. Please try again.");
      console.error("Verification error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResendLink = async () => {
    setLoading(true);
    setMessage(""); // Clear previous messages
    try {
      // Simulate API call to resend link
      // await axios.post("/api/resend-verification-link", { email: "user@example.com" });
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
      setMessage("New verification link sent to your email!");
    } catch (error) {
      setMessage("Failed to resend link. Please try again later.");
      console.error("Resend link error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4 font-sans text-white">
      <motion.div
        className="p-8 rounded-lg shadow-2xl w-full max-w-sm border border-gray-700"
        variants={formVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="text-center mb-6" variants={itemVariants}>
          <Mail className="w-16 h-16 text-blue-400 mx-auto mb-4" /> {/* Larger Lucide Icon */}
          <b className="block text-2xl font-bold mb-2">Verify Your Email</b>
          <p className="text-gray-400 text-sm mb-4">
            Your email has not been verified yet. Please verify your email by
            entering the 8-digit code or request a new verification link.
          </p>
          <motion.button
            onClick={handleResendLink}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <motion.svg
                className="animate-spin h-5 w-5 text-white mx-auto"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </motion.svg>
            ) : (
              "Resend Verification Link"
            )}
          </motion.button>
        </motion.div>

        <hr className="my-6 border-gray-700" />

        <motion.form onSubmit={handleVerifyCode} className="space-y-6" variants={formVariants}>
          <motion.div variants={itemVariants}>
            {/* Assuming Input component can take an 'icon' prop and style its internal input */}
            <Input
              label="Verification Code"
              name="code"
              type="text" // Changed to text for code input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter 8-Digit Code"
              required
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500" // Tailwind classes for Input
              icon={<Lock className="h-5 w-5 text-gray-400" />} // Lucide Icon for Input
            />
          </motion.div>
          <motion.button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out font-semibold text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.005] active:scale-[0.995] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            disabled={loading}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            variants={itemVariants}
          >
            {loading ? (
              <>
                <motion.svg
                  className="h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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
            className={`mt-4 text-center text-sm ${message.includes("success") ? "text-green-400" : "text-red-400"}`}
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