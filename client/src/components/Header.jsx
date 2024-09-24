import { useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function Header() {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
  const { currentUser } = useSelector((state) => state.user);

  return (
    <header className={`shadow-2xl ${isDarkMode ? "bg-gray-900 shadow-[0px_4px_10px_0px_rgba(255,255,255,0.5)]" : "bg-white"}`}>
      <div className="flex flex-col sm:flex-row justify-between items-center max-w-6xl mx-auto p-4">
        <Link to="/" className="mb-4 sm:mb-0">
          <h1 className="font-bold text-lg sm:text-2xl flex flex-wrap">
            <span className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Dhanu</span>
            <span className={`${isDarkMode ? "text-white" : "text-gray-900"}`}>Estate</span>
          </h1>
        </Link>

        <form className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-md flex items-center w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search..."
            className={`bg-transparent focus:outline-none w-full sm:w-64 px-3 py-2 rounded-full border ${
              isDarkMode ? "border-gray-600 text-gray-300" : "border-gray-300 text-black"
            } shadow-inner transition duration-300`}
          />
          <FaSearch className={`ml-2 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`} />
        </form>
        <ul className="flex flex-col sm:flex-row mt-4 sm:mt-0 space-y-2 sm:space-y-0 sm:space-x-6 items-center">
          <Link to="/">
            <li className={`text-gray-800 hover:text-blue-600 transition-colors duration-300 ${isDarkMode ? "dark:text-gray-300" : ""}`}>
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className={`text-gray-800 hover:text-blue-600 transition-colors duration-300 ${isDarkMode ? "dark:text-gray-300" : ""}`}>
              About
            </li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                src={currentUser.avatar}
                alt="profile"
                className="rounded-full w-10 h-10 object-cover border border-gray-300 dark:border-gray-700"
              />
            ) : (
              <li className="text-gray-800 dark:text-gray-300 hover:text-blue-600 transition-colors duration-300">
                Sign In
              </li>
            )}
          </Link>

          {/* Dark mode toggle with sun and moon icons */}
          <div className="flex items-center space-x-2">
            <span className="text-sm">{isDarkMode ? "🌙" : "☀️"}</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only"
                checked={isDarkMode}
                onChange={toggleDarkMode}
              />
              <div className="w-10 h-5 bg-gray-300 dark:bg-gray-700 rounded-full transition duration-300">
                <div
                  className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                    isDarkMode ? "translate-x-5" : ""
                  }`}
                ></div>
              </div>
            </label>
          </div>
        </ul>
      </div>
    </header>
  );
}
