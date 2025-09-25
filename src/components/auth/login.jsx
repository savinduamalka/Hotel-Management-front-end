import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { SeaAnimations } from "../animation/seaAnimations"; 
import toast from "react-hot-toast";

export default function LoginPage({
  isOpen,
  onClose,
  onSignupClick,
  onVerifyEmail,
  onForgotPasswordClick,
}) {
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
        if (e.key === 'Escape') {
          onClose();
        }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "api/users/login",
        { email, password }
      );
      toast.success(response.data.message || "Login successful!");
      localStorage.setItem("token", response.data.token);
      onClose();
      window.location.reload();
    } catch (err) {
      if (err.response?.data?.requiresVerification) {
        toast.error(err.response.data.message);
        onVerifyEmail(email);
      } else {
        toast.error(
          err.response?.data?.message || "Login failed. Please try again."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black bg-opacity-75 p-4 backdrop-blur-sm"
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
    >
      {/* Sea Waves Animation Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <SeaAnimations.Waves />
      </div>
      
      {/* Card Container */}
      <div
        ref={modalRef}
        className="relative w-full max-w-xs mx-2 my-4 overflow-hidden bg-white border border-blue-200 shadow-2xl sm:mx-4 sm:max-w-md md:max-w-lg lg:max-w-md rounded-xl"
        style={{
          boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)",
          animation: "floatIn 0.5s ease-out forwards"
        }}
      >
        {/* Decorative Corner Elements */}
        <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none opacity-30">
          <SeaAnimations.Coral color="rgba(59, 130, 246, 0.3)" />
        </div>
        <div className="absolute bottom-0 right-0 w-24 h-24 rotate-90 pointer-events-none opacity-20">
          <SeaAnimations.Coral color="rgba(59, 130, 246, 0.2)" />
        </div>

        {/* Close button with wave animation on hover */}
        <button
          onClick={onClose}
          className="absolute z-20 p-1 text-gray-600 transition-all duration-300 rounded-full top-3 right-3 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 group"
          aria-label="Close login modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
          <span className="absolute inset-0 bg-blue-200 rounded-full opacity-0 group-hover:opacity-25" style={{animation: "ripple 1s infinite"}}></span>
        </button>

        {/* Hotel Brand Header */}
        <div className="relative px-4 py-5 overflow-hidden text-center sm:px-6 sm:py-6 bg-gradient-to-r from-blue-500 to-blue-600">
          {/* Animated bubbles */}
          <div className="absolute inset-0 overflow-hidden opacity-30">
            <SeaAnimations.Bubbles />
          </div>
          
          <div className="relative">
            <h1 className="font-serif text-2xl font-bold tracking-wide text-white sm:text-2xl" style={{textShadow: "0 2px 4px rgba(0,0,0,0.1)"}}>
              BLUE HORIZON
            </h1>
            <div className="flex items-center justify-center mt-0.5">
              <span className="w-5 h-px bg-blue-200 opacity-70"></span>
              <p className="mx-2 text-xs italic text-blue-100 sm:text-sm">Galle • Sri Lanka</p>
              <span className="w-5 h-px bg-blue-200 opacity-70"></span>
            </div>
            
            {/* Decorative wave line */}
            <div className="absolute bottom-0 left-0 right-0">
              <svg className="w-full h-3" preserveAspectRatio="none" viewBox="0 0 100 10" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 10 Q 25 0, 50 10 T 100 10 V 20 H 0" fill="#fff" />
              </svg>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <div className="p-4 sm:p-5">
          <h2 className="mb-1 text-lg font-semibold text-gray-800 sm:text-xl">Welcome Back</h2>
          <p className="mb-3 text-xs text-gray-500 sm:text-sm">Sign in to your account</p>

          {error && (
            <div 
              className="p-2 mb-3 text-xs text-red-600 border-l-4 border-red-500 rounded-lg bg-red-50"
              style={{animation: "shake 0.5s cubic-bezier(.36,.07,.19,.97) both"}}
            >
              {error}
            </div>
          )}

          <form className="space-y-3" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label htmlFor="email" className="block text-xs font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-5 h-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="block w-full py-2 pl-10 pr-3 text-xs text-gray-900 transition-all duration-200 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-xs font-medium text-gray-700">
                  Password
                </label>
                <button type="button" onClick={onForgotPasswordClick} className="text-xs font-medium text-blue-600 transition-colors hover:text-blue-500">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-5 h-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="block w-full py-2 pl-10 pr-3 text-xs text-gray-900 transition-all duration-200 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
              </div>
            </div>

            <button
              type="submit"
              className="relative flex justify-center w-full px-4 py-2 overflow-hidden text-white transition duration-300 border border-transparent rounded-lg shadow-sm bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 group"
              disabled={isLoading}
            >
              <span className="relative z-10">
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
              </span>
              <div className="absolute inset-0 w-full h-full transition-all duration-300 scale-0 group-hover:scale-100 group-hover:bg-white/10"></div>
            </button>
          </form>

          <div className="mt-2 text-center">
            <p className="text-xs text-gray-600">Don't have an account?</p>
            <a
              href="/signup"
              onClick={(e) => {
                e.preventDefault();
                onClose && onClose();
                onSignupClick && onSignupClick();
              }}
              className="relative block w-full px-4 py-2 mt-2 overflow-hidden text-xs text-center text-blue-600 transition-colors duration-300 border border-blue-500 rounded-lg hover:bg-blue-50 hover:text-blue-700 group"
            >
              <span className="relative z-10">Create an Account</span>
              <div className="absolute bottom-0 left-0 right-0 h-0 transition-all duration-300 bg-blue-100 group-hover:h-full"></div>
            </a>
          </div>

          {/* Hotel Amenities Icons with hover animations */}
          <div className="flex justify-center mt-4 space-x-4 text-gray-500">
            <div className="flex flex-col items-center group">
              <div className="p-1 transition-all duration-300 rounded-full group-hover:bg-blue-50 group-hover:text-blue-600">
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
              </div>
              <span className="mt-0.5 text-[10px] transition-all duration-300 group-hover:text-blue-600">Family</span>
            </div>
            <div className="flex flex-col items-center group">
              <div className="p-1 transition-all duration-300 rounded-full group-hover:bg-blue-50 group-hover:text-blue-600">
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="mt-0.5 text-[10px] transition-all duration-300 group-hover:text-blue-600">Beach</span>
            </div>
            <div className="flex flex-col items-center group">
              <div className="p-1 transition-all duration-300 rounded-full group-hover:bg-blue-50 group-hover:text-blue-600">
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
              </div>
              <span className="mt-0.5 text-[10px] transition-all duration-300 group-hover:text-blue-600">Shop</span>
            </div>
            <div className="flex flex-col items-center group">
              <div className="p-1 transition-all duration-300 rounded-full group-hover:bg-blue-50 group-hover:text-blue-600">
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="mt-0.5 text-[10px] transition-all duration-300 group-hover:text-blue-600">Spa</span>
            </div>
          </div>

          {/* Blue Horizon Resort Footer */}
          <div className="pt-2 mt-3 text-center border-t border-gray-100">
            <p className="text-[10px] text-gray-400">© Blue Horizon Resort - Galle</p>
          </div>
        </div>
      </div>
      
      {/* Add the animations styling */}
      <style jsx>{`
        @keyframes floatIn {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }
        
        @keyframes ripple {
          0% { transform: scale(0.8); opacity: 0; }
          50% { transform: scale(1.2); opacity: 0.3; }
          100% { transform: scale(1.5); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
