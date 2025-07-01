import React from "react";
import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <motion.div
        className="relative flex justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Outer Ring */}
        <motion.div
          className="w-20 h-20 border-4 border-t-4 border-b-4 border-blue-400 rounded-full absolute"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        ></motion.div>

        {/* Inner Ring */}
        <motion.div
          className="w-12 h-12 border-4 border-t-4 border-b-4 border-indigo-600 rounded-full absolute"
          animate={{ rotate: -360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        ></motion.div>

        {/* Optional: A small dot in the center */}
        <motion.div
          className="w-4 h-4 bg-blue-600 rounded-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        ></motion.div>
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;