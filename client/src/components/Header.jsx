import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser.avatar);

  return (
    <header className="bg-gray-200 shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-center max-w-6xl mx-auto p-4">
        <Link to="/" className="mb-4 sm:mb-0">
          <h1 className="font-bold text-lg sm:text-2xl flex flex-wrap">
            <span className="text-gray-600">Dhanu</span>
            <span className="text-gray-900">Estate</span>
          </h1>
        </Link>
        <form className="bg-white p-2 rounded-full shadow-md flex items-center w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-full sm:w-64 px-3 py-2 rounded-full border border-gray-300 shadow-inner"
          />
          <FaSearch className="text-gray-600 ml-2" />
        </form>
        <ul className="flex flex-col sm:flex-row mt-4 sm:mt-0 space-y-2 sm:space-y-0 sm:space-x-6">
          <Link to="/">
            <li className="text-gray-800 hover:text-blue-600 transition-colors duration-300 font-medium px-3 py-1 rounded-lg hover:bg-gray-100 cursor-pointer">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="text-gray-800 hover:text-blue-600 transition-colors duration-300 font-medium px-3 py-1 rounded-lg hover:bg-gray-100 cursor-pointer">
              About
            </li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
              src={currentUser.avatar}
              alt="profile"
              className="rounded-full w-10 h-10 object-cover border border-gray-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-in-out mr-2 hover:scale-105"
            />
            
            ) : (
              <li className="text-gray-800 hover:text-blue-600 transition-colors duration-300 font-medium px-3 py-1 rounded-lg hover:bg-gray-100 cursor-pointer">
                Sign In
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
