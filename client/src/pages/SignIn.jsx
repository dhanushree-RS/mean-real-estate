import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {

  const [formData, setFormData] = useState({});
  const [error,setError] = useState(null);
  const [loading,setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setFormData(
      {...formData, 
      [e.target.name]: e.target.value ,

      }
    );
  };
  
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signin',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.success === false){
          setLoading(false);
          setError(data.message);
          setAlert({ type: 'error', message: `Invalid credentials: ${data.message}` });
          return;
        }
        setLoading(false);
        setError(null);
        setAlert({ type: 'success', message: 'Signup successful!' });
        navigate('/')
        
        
      
    } catch (error) {
      setLoading(false);
      setError(error.message);
      setAlert({ type: 'error', message: `An error occurred: ${error.message}` });
    }  
  };


  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-500 to-white shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Sign In</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="email"
                    name="email"
                    type="text"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Email address"
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Email Address
                  </label>
                </div>
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="password"
                    name="password"
                    type="password"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Password
                  </label>
                </div>
                <div className="relative flex items-center justify-center">
                  <button disabled={loading} className="bg-gray-700 hover:bg-gray-800 text-white rounded-md px-4 py-2" onClick={handleSubmit}>
                   {loading ? 'Loading...' : 'SIGN IN'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex justify-center">
            <button className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
              <svg
                className="h-6 w-6 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="800px"
                height="800px"
                viewBox="-0.5 0 48 48"
                version="1.1"
              >
                <g
                  id="Icons"
                  stroke="none"
                  strokeWidth="1"
                  fill="none"
                  fillRule="evenodd"
                >
                  <g
                    id="Color-"
                    transform="translate(-401.000000, -860.000000)"
                  >
                    <g
                      id="Google"
                      transform="translate(401.000000, 860.000000)"
                    >
                      <path
                        d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                        fill="#FBBC05"
                      />
                      <path
                        d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                        fill="#EB4335"
                      />
                      <path
                        d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                        fill="#34A853"
                      />
                      <path
                        d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                        fill="#4285F4"
                      />
                    </g>
                  </g>
                </g>
              </svg>

              <span>Continue with Google</span>
            </button>
          </div>
          <div className="w-full flex items-center justify-center mt-5">
            <span className="text-gray-600">
              Dont have an account?{" "}
              <Link to="/sign-up" className="text-red-700 hover:underline">
                Sign Up
              </Link>
            </span>
          </div>
        </div>
      </div>
      {alert && (
  <div
    className={`fixed top-4 right-4 p-4 rounded shadow-md transition-transform transform ${
      alert.type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } ${alert ? 'translate-y-0' : 'translate-y-full'}`}
    style={{ animation: 'fadeIn 0.5s, fadeOut 0.5s 2s forwards' }}
    onAnimationEnd={() => setAlert(null)}
  >
    <p className="text-white">{alert.message}</p>
  </div>
)}

    </div>
  );
}
