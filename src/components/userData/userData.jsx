import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Skeleton } from "../ui/skeleton";
import toast from "react-hot-toast";

// Helper to decode JWT
function decodeJWT(token) {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch {
    return {};
  }
}

export default function UserProfile({ onLoginClick, onEditProfileClick, refreshKey }) {
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const fetchUserData = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = decodeJWT(token);
      setUser(decoded);
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [refreshKey]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isDropdownOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsDropdownOpen(false);
    window.location.href = "/";
    toast.success("You have been logged out.");
  };

  const handleProfileClick = () => {
    if (!user) {
      onLoginClick();
    } else {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  const handleEditProfile = () => {
    onEditProfileClick();
    setIsDropdownOpen(false);
  };

  return (
    <>
      <div className="flex items-center gap-2">
        {!user ? (
          <button
            onClick={onLoginClick}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-all duration-200 rounded-lg bg-white/10 hover:bg-white/20"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
            Sign In
          </button>
        ) : (
          <>
            <div className="relative flex-shrink-0" ref={dropdownRef}>
              <button
                onClick={handleProfileClick}
                className="flex items-center gap-2 transition-all duration-200 hover:opacity-80"
              >
                {user.image ? (
                  <img 
                    className="object-cover w-8 h-8 border-2 rounded-full shadow-sm border-white/70 hover:border-white/90 transition-all duration-200"
                    src={user.image} 
                    alt={`${user.firstName} ${user.lastName}` || "User"}
                  />
                ) : (
                  <div className="flex items-center justify-center w-8 h-8 border-2 rounded-full shadow-sm bg-white/20 border-white/70 backdrop-blur-sm hover:border-white/90 transition-all duration-200">
                    <span className="text-sm font-semibold text-white">
                      {user.firstName ? user.firstName.charAt(0).toUpperCase() : "G"}
                    </span>
                  </div>
                )}
                <span className="text-sm font-medium text-white">{`${user.firstName} ${user.lastName}`.trim() || "Guest"}</span>
                {user && (
                  <svg 
                    className={`w-4 h-4 text-white transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && user && (
                <div className="absolute right-0 z-[9998] mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-1 animate-fadeIn">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-800 truncate">{`${user.firstName} ${user.lastName}`}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={handleEditProfile}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                  >
                    <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit Profile
                  </button>
                  <hr className="my-1 border-gray-100" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
                  >
                    <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Add the animation styles */}
      <style jsx>{`
        @keyframes fadeIn {
          0% { 
            opacity: 0; 
            transform: translateY(-10px); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
      `}</style>
    </>
  );
}
