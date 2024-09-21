import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import { app } from '../firebase';

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null)
  const [file, setFile ] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0)
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  console.log(filePerc)
  console.log(fileUploadError)
  console.log(formData);


  useEffect(() =>{
    if(file){
      handleFileUpload(file);
    }
  },[file]);

  const handleFileUpload = (file) =>{
    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      // console.log('Upload is ' + progress + '% done');
      setFilePerc(Math.round(progress))
  },
  (error)=>{
     setFileUploadError(true);
  },
  ()=>{
    getDownloadURL(uploadTask.snapshot.ref).then
    ((downloadURL)=> setFormData({...formData,avatar:downloadURL}))
  },
);
};



  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-4xl font-semibold text-center my-7">Profile</h1>
      <input 
      onChange={(e)=> setFile(e.target.files[0])}
       type="file" 
       ref={fileRef}  
       hidden accept="image/*" />
      <img  onClick={() => fileRef.current.click()}
        src={formData.avatar || currentUser.avatar}
        alt="profile"
        className="rounded-full h-32 w-32 object-cover border border-gray-300 
          drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)] transition-transform 
          duration-300 ease-in-out mb-4 mx-auto cursor-pointer
          hover:scale-105 hover:rotate-2 hover:bg-gray-100 
          hover:shadow-lg hover:shadow-black"
      />
      <p className="text-sm text-center font-semibold mb-5">
        {fileUploadError ?(
          <span className="text-red-800">Error Uploading image(image must be less than 2mb)</span>
        ) : filePerc > 0 && filePerc < 100 ? (
          <span className="text-slate-700">{`uploading ${filePerc}%`}</span>
        ) : filePerc === 100 ? (
          <span className="text-green-600">Image uploaded successfully!!</span>
        ) :(
          ''
        )
      }
      </p>
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
