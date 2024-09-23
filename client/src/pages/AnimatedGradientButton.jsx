import React from 'react';
import { motion } from 'framer-motion';

const AnimatedGradientButton = () => {
  return (
    <motion.button
      className="bg-gradient-to-r from-gray-400 to-gray-500 text-white font-semibold py-2 px-4 rounded-xl"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      CREATE LISTING
    </motion.button>
  );
};

export default AnimatedGradientButton;
