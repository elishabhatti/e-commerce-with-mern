import React from "react";
import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <motion.div
        className="relative flex justify-center items-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Outer Glow Ring */}
        <motion.div
          className="w-24 h-24 rounded-full absolute"
          style={{
            background: "radial-gradient(circle, rgba(96,165,250,0.15) 0%, transparent 70%)",
            boxShadow: "0 0 30px rgba(96,165,250,0.4)",
          }}
        ></motion.div>

        {/* Outer Spinner */}
        <motion.div
          className="w-20 h-20 border-4 border-t-transparent border-b-transparent border-blue-400 rounded-full absolute"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
        ></motion.div>

        {/* Mid Spinner */}
        <motion.div
          className="w-16 h-16 border-4 border-l-transparent border-r-transparent border-indigo-500 rounded-full absolute"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
        ></motion.div>

        {/* Inner Spinner */}
        <motion.div
          className="w-10 h-10 border-4 border-t-transparent border-l-transparent border-purple-500 rounded-full absolute"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        ></motion.div>

        {/* Center Pulse Dot */}
        <motion.div
          className="w-4 h-4 bg-blue-600 rounded-full shadow-lg z-10"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        ></motion.div>
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;
