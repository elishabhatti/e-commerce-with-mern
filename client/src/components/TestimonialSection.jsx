import { Twitter } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

const TestimonialSection = ({ img, name, email, review, variants }) => {
  return (
    <motion.div
      className="gap-5 border border-gray-300 rounded-sm p-5"
      variants={variants}
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center justify-center">
          <img
            className="w-20 rounded-full h-20 object-cover"
            src={img}
            alt="Client"
          />
          <div>
            <h2 className="font-semibold text-lg">{name}</h2>
            <p className="text-sm text-gray-500">{email}</p>
          </div>
        </div>
        <div>
          <Twitter className="text-blue-500" />
        </div>
      </div>
      <div className="pt-4">
        <p className="text-gray-700 leading-relaxed">{review}</p>
      </div>
    </motion.div>
  );
};

export default TestimonialSection;
