import React, { useState } from "react";
import { motion } from "framer-motion";
import { useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext";
// import AnimatedGradientButton from './AnimatedGradientButton.jsx';
import CustomButton from "./CustomButton";
import { getStorage } from "firebase/storage";
import { app } from "../firebase";
import { getDownloadURL, uploadBytesResumable, ref } from "firebase/storage";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CreateListing() {
  const { isDarkMode } = useContext(DarkModeContext);
  const { currentUser } = useSelector((state) => state.user);
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountedPrice: 50,
    furnished: false,
    parking: false,
    offer: false,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  //const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();
  console.log(formData);

  const handleImageSubmit = () => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setIsUploading(true);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);

          //console.log(formData);
        })
        .catch((error) => {
          setImageUploadError("image upload error file must be less than 2mb");
          //console.error('image upload error', error);
          // process.exit(1); // Exit with an error code if connection fails
        })
        .finally(() => {
          setIsUploading(false);
        });
    } else {
      if (files.length === 0) {
        setImageUploadError("plese select an image");
      } else {
        setImageUploadError("Maximum number of images reached(max 6)");
      }
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done.`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    const { id, type, checked, value } = e.target; // Destructure properties for easier access

    if (id === "sell" || id === "rent") {
      setFormData({ ...formData, type: id });
    }

    // For checkboxes (parking, furnished, offer)
    if (id === "parking" || id === "furnished" || id === "offer") {
      setFormData({ ...formData, [id]: checked });

      // If the offer checkbox is being changed, you can clear the discounted price if it's unchecked
      if (id === "offer" && !checked) {
        setFormData({ ...formData, discountedPrice: "" }); // Clear the discounted price when unchecked
      }
    }

    // For text and number inputs
    if (type === "number" || type === "text" || type === "textarea") {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(true);
      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, userRef: currentUser._id }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      navigate(`listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }

    console.log(formData);
  };

  return (
    <div
      className={
        isDarkMode
          ? "bg-gray-900 min-h-screen text-white"
          : "bg-white min-h-screen text-black"
      }
    >
      <header className="flex justify-between items-center p-4">
        <div className="flex-1 text-center">
          <h1 className="text-2xl font-bold">Create Listing</h1>
        </div>
      </header>

      <main className="mx-auto p-2 max-w-4xl">
        {" "}
        {/* Dark background and white text */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Left Section: Inputs for text fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              id="name"
              className={`w-full p-3 border rounded-lg ${
                isDarkMode
                  ? "border-gray-700 bg-gray-800 text-white"
                  : "border-gray-300 bg-white text-black"
              } focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-300`}
              placeholder="Name"
              required
              onChange={handleChange}
              value={formData.name}
            />
            <textarea
              id="description"
              className={`w-full p-3 border rounded-lg ${
                isDarkMode
                  ? "border-gray-700 bg-gray-800 text-white"
                  : "border-gray-300 bg-white text-black"
              } focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-300`}
              placeholder="Description"
              required
              onChange={handleChange}
              value={formData.description}
            />
            <input
              type="text"
              id="address"
              className={`w-full p-3 border rounded-lg ${
                isDarkMode
                  ? "border-gray-700 bg-gray-800 text-white"
                  : "border-gray-300 bg-white text-black"
              } focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-300 col-span-2`}
              placeholder="Address"
              required
              onChange={handleChange}
              value={formData.address}
            />
          </div>

          {/* Right Section: Checkboxes */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {/* Checkbox components here */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="sell"
                className="w-5 h-5 accent-blue-400"
                onChange={handleChange}
                checked={formData.type === "sell"}
              />
              <span className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                Sell
              </span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5 h-5 accent-blue-400"
                onChange={handleChange}
                checked={formData.type === "rent"}
              />
              <span className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                Rent
              </span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5 h-5 accent-blue-400"
                onChange={handleChange}
                checked={formData.parking}
              />
              <span className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                Parking Spot
              </span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5 h-5 accent-blue-400"
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                Furnished
              </span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5 h-5 accent-blue-400"
                onChange={handleChange}
                checked={formData.offer}
              />
              <span className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                Offer
              </span>
            </div>
          </div>

          {/* Bottom Section: Number inputs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="flex flex-col">
              <input
                type="number"
                id="bedrooms"
                className={`w-full p-3 border rounded-lg ${
                  isDarkMode
                    ? "border-gray-700 bg-gray-800 text-white"
                    : "border-gray-300 bg-white text-black"
                } focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-300`}
                min="1"
                max="10"
                required
                onChange={handleChange}
                value={formData.bedrooms}
              />
              <p className={`text-center mt-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Beds</p>
            </div>
            <div className="flex flex-col">
              <input
                type="number"
                id="bathrooms"
                className={`w-full p-3 border rounded-lg ${
                  isDarkMode
                    ? "border-gray-700 bg-gray-800 text-white"
                    : "border-gray-300 bg-white text-black"
                } focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-300`}
                min="1"
                max="10"
                required
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <p className={`text-center mt-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Baths</p>
            </div>
            <div className="flex flex-col">
              <input
                type="number"
                id="regularPrice"
                className={`w-full p-3 border rounded-lg ${
                  isDarkMode
                    ? "border-gray-700 bg-gray-800 text-white"
                    : "border-gray-300 bg-white text-black"
                } focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-300`}
                min="50"
                max="10000000"
                required
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <p className={`text-center mt-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Regular Price</p>
              <span className="text-xs text-center text-gray-500">
                ($ / month)
              </span>
            </div>
            <div className="flex flex-col">
              <input
                type="number"
                id="discountedPrice"
                className={`w-full p-3 border rounded-lg 
              ${
                formData.offer
                  ? isDarkMode
                    ? "border-blue-200"
                    : "border-blue-500"
                  : isDarkMode
                  ? "border-gray-700 opacity-50 cursor-not-allowed"
                  : "border-gray-300 opacity-50 cursor-not-allowed"
              }
              ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"}
              focus:outline-none focus:ring-2 
              transition duration-300`}
                min="50"
                max="100000"
                required
                onChange={handleChange}
                value={formData.discountedPrice}
                disabled={!formData.offer} // Disable input if offer is not checked
              />
              <p className={`text-center mt-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Discount Price</p>
              <span className="text-xs text-center text-gray-500">
                ($ / month)
              </span>
            </div>
          </div>

          {/* Image uploader */}
          <div className="flex flex-col mt-4">
            <p className={`font-semibold text-lg mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              Images:
              <span className="font-normal ml-2 text-gray-400 text-sm">
                The first image will be the cover (max 6)
              </span>
            </p>
            <div className="flex items-center space-x-4">
              <input
                onChange={(e) => setFiles(e.target.files)}
                type="file"
                accept="image/*"
                multiple
                className="block w-full text-sm text-gray-500
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-lg file:border-0
                       file:text-sm file:font-semibold
                       file:bg-gray-800 file:text-gray-300
                       hover:file:bg-gray-700"
                required
              />
              <button
                onClick={handleImageSubmit}
                type="button"
                className="bg-gray-600 hover:bg-gray-700 text-white 
                       font-bold py-2 px-4 rounded-lg focus:outline-none
                       focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-all"
              >
                Upload
              </button>
            </div>
            <p className="text-red-700 text-sm">
              {imageUploadError && imageUploadError}
            </p>

            {isUploading && (
              <div className="flex justify-center items-center mt-4">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-600"></div>
                <p className="ml-4 text-gray-400">Uploading images...</p>
              </div>
            )}

            {formData.imageUrls.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {formData.imageUrls.map((url, index) => (
                  <div key={url} className="relative group">
                    <img
                      src={url}
                      alt="Listing Image"
                      className="w-40 h-40 rounded-2xl object-cover"
                    />
                    {/* Delete icon button appears on hover */}
                    <button
                      onClick={() => handleRemoveImage(index)}
                      className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center 
                   text-white opacity-0 group-hover:opacity-100 transition-opacity 
                   duration-300 rounded-lg"
                    >
                      <span className="text-3xl font-bold">🗑️</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-center items-center">
            <CustomButton type="submit" loading={isUploading}>
              CREATE LISTING
            </CustomButton>
          </div>
          {loading && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70 z-50">
              <div className="animate-pulse h-24 w-24 rounded-full border-4 border-white border-t-transparent"></div>
              <p className="text-white ml-4">Submitting your form...</p>
            </div>
          )}

          {error && (
            <div className="flex justify-center items-center mt-4">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}
        </form>
      </main>
    </div>
  );
}
