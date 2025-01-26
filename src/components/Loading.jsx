import React from "react";
import { motion } from "framer-motion"; // Import motion

const Loading = () => {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center bg-opacity-75"
      initial={{ opacity: 0 }} // Start with 0 opacity (invisible)
      animate={{ opacity: 1 }} // Animate to full opacity (visible)
      exit={{ opacity: 0 }} // Fade out when removed
      transition={{ duration: 0.3 }} // Smooth transition
    >
      <div className="w-10 h-10 border-solid border-blue-500 border-t-4 rounded-full animate-spin"></div>
    </motion.div>
  );
};

export default Loading;
