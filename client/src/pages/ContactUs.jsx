import React, { useState } from "react";
import { toast } from "react-toastify"; // Not needed for just design
import { Github, Linkedin, Facebook } from "lucide-react";
import Input from "../components/Input";
import axios from "axios"; // Not needed for just design
import { useNavigate } from "react-router-dom"; // Not strictly needed for just design
import { motion } from "framer-motion";
import { postRequest } from "../../utils/api";

const ContactUs = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
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
      const data = await postRequest("/contact/add-contact", formData)
      console.log("Contact Form Data:", data);
      toast.success("Thank you for your message! We'll get back to you soon.");
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
    <div className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 font-sans overflow-hidden">
      <motion.div
        className="relative border border-gray-300 rounded-3xl overflow-hidden flex flex-col md:flex-row w-full max-w-6xl z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Decorative background shapes for left side */}
        <div className="absolute inset-y-0 left-0 w-1/2 hidden md:block z-0 pointer-events-none">
          <div className="absolute -top-16 -left-16 w-48 h-48 bg-purple-200 rounded-full opacity-30 blur-3xl"></div>
          <div className="absolute -bottom-10 -left-20 w-64 h-64 bg-indigo-200 rounded-full opacity-20 blur-3xl"></div>
        </div>

        {/* Left Form Side */}
        <motion.div
          className="w-full md:w-1/2 p-8 sm:p-10 lg:p-12 z-10 bg-white relative" // Added relative for z-index
          variants={itemVariants}
        >
          <div className="max-w-md mx-auto">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">
              Let's talk
            </h1>
            <p className="text-gray-600 mb-8 text-lg">
              To request a quote or want to meet up for coffee, contact us
              directly or fill out the form and we will get back to you
              promptly.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Your Name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Type your name"
              />
              <Input
                label="Your Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Type your email"
              />
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition duration-150 ease-in-out"
                  placeholder="Type something if you want..."
                  required
                ></textarea>
              </div>
              <motion.button
                type="submit"
                className="w-full cursor-pointer bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 text-lg font-semibold shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transform active:scale-98"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 8px 20px rgba(128, 90, 213, 0.3)", // More pronounced shadow
                }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Right Info and Illustration Side */}
        <motion.div
          className="w-full md:w-1/2 p-8 sm:p-10 lg:p-12 relative overflow-hidden bg-gradient-to-br from-purple-700 to-indigo-700 text-white flex flex-col justify-between items-center rounded-b-3xl md:rounded-l-none md:rounded-r-3xl z-10"
          variants={itemVariants}
        >
          {/* Background Illustration from provided image - This is a rough recreation with CSS,
              for a perfect match, you'd use the actual image or an SVG. */}
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white rounded-full flex items-center justify-center">
              <div className="relative w-64 h-64 bg-purple-400 rounded-full flex items-center justify-center">
                {/* Envelope */}
                <svg
                  className="w-24 h-24 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.928 6.77L13.195 1.505a.75.75 0 011.05.205l4.5 9.5a.75.75 0 01-.205 1.05L6.81 18.495a.75.75 0 01-1.05-.205l-4.5-9.5a.75.75 0 01.205-1.05zm.974.776L13.432 2.76l-4.22 8.895-4.22-8.895zM12.9 16.5l-3.32-6.99 3.32 6.99zm-6.22 0l-3.32-6.99 3.32 6.99zm5.22-.01l.001.001V16.5l-.001.001zM10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
                    clipRule="evenodd"
                  />
                  <path d="M19.902 4.098a.75.75 0 00-1.06-.007L10 12.493 1.158 3.991a.75.75 0 00-1.06.007c-.43.43-.43 1.125 0 1.556l9.404 9.404a.75.75 0 001.06 0l9.404-9.404c.43-.43.43-1.125 0-1.556z" />
                </svg>
                {/* Small shapes (simplified) */}
                <div className="absolute top-8 left-16 w-3 h-3 bg-blue-300 rounded-full"></div>
                <div className="absolute bottom-10 right-12 w-4 h-4 bg-yellow-300 rounded-full"></div>
                <div className="absolute top-4 right-20 w-2 h-2 bg-pink-300 rounded-full"></div>
                <div className="absolute bottom-16 left-20 w-5 h-5 bg-green-300 rounded-full opacity-70"></div>
                {/* Chat bubble icon */}
                <svg
                  className="absolute -top-10 left-10 w-12 h-12 text-purple-300 transform -rotate-12"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.708-1.542L2 17.5V14A9.953 9.953 0 0010 1C14.418 1 18 4.134 18 10zM12 7a1 1 0 100-2 1 1 0 000 2zm-4 0a1 1 0 100-2 1 1 0 000 2zm-4 0a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
                {/* Paper plane icon */}
                <svg
                  className="absolute -bottom-8 right-16 w-16 h-16 text-yellow-300 transform rotate-45"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 00.116 1.006l.169.117A1 1 0 003 18h14a1 1 0 00.938-.636 1 1 0 00.116-1.006l-7-14zM10 4.132L15.8 16H4.2L10 4.132z" />
                </svg>
                {/* More random dots/stars */}
                <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full"></div>
                <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-white rounded-full"></div>
                <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-white rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="relative  text-center flex flex-col items-center justify-center h-full">
            <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
            <div className="space-y-4 text-lg">
              <p className="flex items-center justify-center gap-2">
                <svg
                  className="w-6 h-6 text-purple-200"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414L7.5 9.086 5.707 7.293a1 1 0 00-1.414 1.414l2.5 2.5a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                KDA tp-2 Mehmoodabad karahi Street 7
              </p>
              <p className="ml-8">Pakistan Karachi</p>{" "}
              {/* Indent for "United States" */}
              <p className="flex items-center justify-center gap-2">
                <svg
                  className="w-6 h-6 text-purple-200"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.774a11.037 11.037 0 006.103 6.103l.774-1.548a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                +92-309-2772847
              </p>
              <p className="flex items-center justify-center gap-2">
                <svg
                  className="w-6 h-6 text-purple-200"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                elishajameel270@gmail.com
              </p>
            </div>

            <div className="flex space-x-6 mt-8">
              <a
                href="https://github.com/elishabhatti"
                className="w-12 h-12 bg-white text-blue-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
                target="_blank"
              >
                <Github />
              </a>
              <a
                href="https://www.linkedin.com/in/elisha-jameel/"
                className="w-12 h-12 bg-white text-blue-400 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
                target="_blank"
              >
                <Linkedin />
              </a>
              <a
                target="_blank"
                href="https://www.facebook.com/profile.php?id=61576620950743"
                className="w-12 h-12 bg-white text-pink-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
              >
                <Facebook />
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContactUs;
