import { motion } from "framer-motion";

const CustomButton = ({ onClick, loading, children }) => {
  return (
    <motion.button
      onClick={onClick}
      disabled={loading} // Disable button if loading
      initial={{ "--x": "100%", scale: 1 }}
      animate={loading ? { scale: 1.1 } : { "--x": "-100%" }} // Optional scaling effect when loading
      whileTap={{ scale: 0.97 }}
      transition={{
        repeat: loading ? 0 : Infinity, // Stop repeating if loading
        repeatType: "loop",
        repeatDelay: 1,
        type: "spring",
        stiffness: 20,
        damping: 15,
        mass: 2,
      }}
      className={`px-6 py-2 rounded-md relative radial-gradient 
                  ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} // Styling for loading state
    >
      {loading ? (
        <span className="text-neutral-100 tracking-wide font-bold h-full w-full block relative linear-mask">
          Loading...
        </span>
      ) : (
        <span className="text-neutral-100 tracking-wide font-bold h-full w-full block relative linear-mask">
          {children} {/* Button content passed as children */}
        </span>
      )}
      <span className="block absolute inset-0 rounded-md p-px linear-overlay" />
    </motion.button>
  );
};

export default CustomButton;
