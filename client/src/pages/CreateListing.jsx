import React from "react";
import { motion } from 'framer-motion';
import AnimatedGradientButton from './AnimatedGradientButton.jsx';


export default function CreateListing() {
  return (
    <main className="mx-auto p-2 max-w-4xl">
      <h1 className="text-3xl font-bold text-center my-4 mb-5">
        Create Listing
      </h1>
      <form className="flex flex-col gap-6">
        {/* Left Section: Inputs for text fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            id="name"
            className="w-full p-3 border border-blue-200 rounded-lg bg-gray-50 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-300"
            placeholder="Name"
            minLength="10"
            maxLength="65"
            required
          />
          <textarea
            id="description"
            className="w-full p-3 border border-blue-200 rounded-lg bg-gray-50 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-300"
            placeholder="Description"
            required
          />
          <input
            type="text"
            id="address"
            className="w-full p-3 border border-blue-200 rounded-lg bg-gray-50 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-300 col-span-2"
            placeholder="Address"
            required
          />
        </div>

        {/* Right Section: Checkboxes */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="sell"
              className="w-5 h-5 accent-blue-400"
            />
            <span className="text-gray-700">Sell</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="rent"
              className="w-5 h-5 accent-blue-400"
            />
            <span className="text-gray-700">Rent</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="Parking"
              className="w-5 h-5 accent-blue-400"
            />
            <span className="text-gray-700">Parking Spot</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="furnished"
              className="w-5 h-5 accent-blue-400"
            />
            <span className="text-gray-700">Furnished</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="offer"
              className="w-5 h-5 accent-blue-400"
            />
            <span className="text-gray-700">Offer</span>
          </div>
        </div>

        {/* Bottom Section: Number inputs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="flex flex-col">
            <input
              type="number"
              id="bedrooms"
              className="w-full p-3 border border-blue-200 rounded-lg bg-gray-50 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-300"
              min="1"
              max="10"
              required
            />
            <p className="text-center mt-1 text-gray-600">Beds</p>
          </div>
          <div className="flex flex-col">
            <input
              type="number"
              id="bathrooms"
              className="w-full p-3 border border-blue-200 rounded-lg bg-gray-50 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-300"
              min="1"
              max="10"
              required
            />
            <p className="text-center mt-1 text-gray-600">Baths</p>
          </div>
          <div className="flex flex-col">
            <input
              type="number"
              id="regularPrice"
              className="w-full p-3 border border-blue-200 rounded-lg bg-gray-50 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-300"
              min="1"
              required
            />
            <p className="text-center mt-1 text-gray-600">Regular Price</p>
            <span className="text-xs text-center text-gray-400">
              ($ / month)
            </span>
          </div>
          <div className="flex flex-col">
            <input
              type="number"
              id="discountPrice"
              className="w-full p-3 border border-blue-200 rounded-lg bg-gray-50 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-300"
              min="1"
              required
            />
            <p className="text-center mt-1 text-gray-600">Discount Price</p>
            <span className="text-xs text-center text-gray-400">
              ($ / month)
            </span>
          </div>
        </div>

        {/* Image uploader */}
        <div className="flex flex-col mt-4">
          <p className="font-semibold text-lg mb-2 text-gray-700">
            Images:
            <span className="font-normal ml-2 text-gray-400 text-sm">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex items-center space-x-4">
            <input
              type="file"
              accept="image/*"
              multiple
              className="block w-full text-sm text-gray-500
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-lg file:border-0
                         file:text-sm file:font-semibold
                         file:bg-gray-200 file:text-gray-700
                         hover:file:bg-gray-300"
            />
            <button
              type="button"
              className="bg-gray-600 hover:bg-gray-700 text-white 
                         font-bold py-2 px-4 rounded-lg focus:outline-none
                         focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-all"
            >
              Upload
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center">
        {/* <motion.button
      className="bg-gray-700 text-white font-semibold py-2 px-2 rounded-lg w-48
                 shadow-2xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
      whileHover={{ scale: 1.05, backgroundColor: "#4a5568" }} // Change color on hover
      whileTap={{ scale: 0.95 }} // Slightly shrink on tap
      transition={{ type: 'spring', stiffness: 300 }}
    >
      CREATE LISTING
    </motion.button> */}
    <AnimatedGradientButton />
        </div>
      </form>
    </main>
  );
}
