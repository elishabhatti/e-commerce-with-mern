import React, { useState } from "react";
import Input from "../components/Input";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login first to continue.");
      return; // Stop execution if no token
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/contact/add-contact",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response); // Consider removing or adjusting for production
      toast.success("Thank you for your message! We'll get back to you soon."); // More descriptive success message

      // Reset form data
      setFormData({
        name: "",
        email: "",
        message: "",
      });

      navigate("/contact");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "An unexpected error occurred."
      );
      console.error("Contact form submission error:", error);
    }
  };

  // Framer Motion variants for section entrance
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.1, // Stagger children for elements inside
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-120px)] py-12 px-4 sm:px-6 font-sans">
      <motion.div
        className="rounded-2xl border border-gray-100 overflow-hidden flex flex-col md:flex-row w-full max-w-6xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left form side */}
        <motion.div
          className="w-full flex justify-center items-center md:w-1/2 p-8 sm:p-10 lg:p-12"
          variants={itemVariants}
        >
          <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 text-center">
              Get in Touch
            </h2>
            <Input
              label="Name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              // Assuming your Input component applies clean styling (border, rounded, focus states)
            />
            <Input
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="5" // Provide adequate rows for message
                value={formData.message} // Corrected value binding
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition duration-150 ease-in-out"
                placeholder="Type your message here..."
                required
              ></textarea>
            </div>
            <motion.button
              type="submit"
              className="w-full cursor-pointer bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200 text-lg font-semibold shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              whileHover={{
                scale: 1.02,
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>

        {/* Right image side */}
        <motion.div
          className="hidden md:block w-1/2 relative bg-purple-50 rounded-r-2xl overflow-hidden"
          variants={itemVariants}
        >
          <img
            src="https://img.freepik.com/free-vector/flat-design-illustration-customer-support_23-2148887720.jpg?semt=ais_hybrid&w=740"
            alt="Contact Us illustration"
            className="w-full h-full object-cover object-center transform scale-105" // Slightly scaled for a modern feel
          />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-100/50 to-transparent"></div>{" "}
          {/* Subtle gradient overlay */}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContactUs;
