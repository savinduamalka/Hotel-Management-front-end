import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function LoginPage({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const modalRef = useRef(null);

  useEffect(() => {
    // Reset form when modal opens/closes or isOpen changes
    if (isOpen) {
      setEmail("");
      setPassword("");
      setError("");
      setIsLoading(false);

      // Prevent body scrolling when modal is open
      document.body.style.overflow = 'hidden';

      // Focus trap and escape key handler
      const handleEscape = (e) => {
        if (e.key === 'Escape') onClose();
      };

      document.addEventListener('keydown', handleEscape);
      return () => {
        document.body.style.overflow = 'auto';
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, onClose]);

  // Handle clicks outside the modal
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  function handleLogin(e) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    axios
      .post(import.meta.env.VITE_BACKEND_URL + "api/users/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        if (res.data.detailsofuser.type === "admin") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/";
        }
      })
      .catch((err) => {
        console.log(err);
        setError("Invalid email or password. Please try again.");
        setIsLoading(false);
      });
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black bg-opacity-75 p-4"
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
    >
      {/* Card Container */}
      <div
        ref={modalRef}
        className="relative w-full max-w-xs mx-2 my-8 overflow-hidden bg-white shadow-2xl sm:mx-4 sm:max-w-md md:max-w-lg lg:max-w-md rounded-xl"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute z-20 p-1 text-gray-600 rounded-full top-3 right-3 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          aria-label="Close login modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        {/* Hotel Brand Header */}
        <div className="px-4 py-6 text-center sm:px-6 sm:py-8 bg-gradient-to-r from-blue-500 to-indigo-600">
          <h1 className="text-2xl font-bold tracking-wide text-white sm:text-3xl">BLUE HORIZON</h1>
          <p className="mt-1 text-sm italic text-blue-100 sm:text-base">Galle • Sri Lanka</p>
        </div>

        {/* Login Form */}
        <div className="p-4 sm:p-8">
          <h2 className="mb-2 text-xl font-semibold text-gray-800 sm:text-2xl">Welcome Back</h2>
          <p className="mb-6 text-sm text-gray-500 sm:text-base">Sign in to your account</p>

          {error && (
            <div className="p-3 mb-4 text-sm text-red-600 rounded-lg bg-red-50">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleLogin}>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="block w-full py-3 pl-10 pr-3 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="block w-full py-3 pl-10 pr-3 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''} text-base`}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-2 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign in'
              )}
            </button>

            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink mx-4 text-sm text-gray-400">or</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">Don't have an account?</p>
            <a
              href="/signup"
              onClick={(e) => {
                e.preventDefault();
                onClose();
                window.location.href = "/signup";
              }}
              className="block w-full px-4 py-2 mt-3 text-sm text-center text-blue-600 transition-colors duration-200 border border-blue-500 rounded-lg hover:bg-blue-50 hover:text-blue-700"
            >
              Create an Account
            </a>
          </div>

          {/* Hotel Amenities Icons */}
          <div className="flex justify-center mt-8 space-x-4 text-gray-500">
            <div className="flex flex-col items-center">
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
              <span className="mt-1 text-xs">Family</span>
            </div>
            <div className="flex flex-col items-center">
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="mt-1 text-xs">Beach</span>
            </div>
            <div className="flex flex-col items-center">
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              <span className="mt-1 text-xs">Shop</span>
            </div>
            <div className="flex flex-col items-center">
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              <span className="mt-1 text-xs">Spa</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
