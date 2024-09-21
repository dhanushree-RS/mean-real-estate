import React from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-4xl font-semibold text-center my-7">Profile</h1>
      <img
        src={currentUser.avatar}
        alt="profile"
        className="rounded-full h-32 w-32 object-cover border border-gray-300 
          drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)] transition-transform 
          duration-300 ease-in-out mb-4 mx-auto 
          hover:scale-105 hover:rotate-2 hover:bg-gray-100 
          hover:shadow-lg hover:shadow-black"
      />
      <form className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-slate-600 text-white p-3 rounded-lg transition-colors duration-300 
            hover:bg-slate-700"
        >
          Update
        </button>
      </form>
      <div className="flex justify-between mt-7">
        <span className="text-neutral-700 cursor-pointer font-semibold">Delete Account</span>
        <span className="text-neutral-700 cursor-pointer font-semibold">
          Sign Out
        </span>
      </div>
    </div>
  );
}
