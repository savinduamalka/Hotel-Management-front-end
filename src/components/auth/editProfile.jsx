import React, { useState, useRef, useEffect } from "react";
import { SeaAnimations } from "../animation/seaAnimations";
import axios from "axios";
import toast from "react-hot-toast";
import uploadMedia from "../../utils/mediaUpload";

// Helper to decode JWT
function decodeJWT(token) {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch {
    return {};
  }
}

export default function EditProfileModal({ isOpen, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    email: "",
    firstname: "",
    lastname: "",
    whatsapp: "",
    image: ""
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [isPasswordSectionOpen, setIsPasswordSectionOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Load user data when modal opens
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = decodeJWT(token);
        setFormData({
          email: decoded.email || "",
          firstname: decoded.firstName || "",
          lastname: decoded.lastName || "",
          whatsapp: decoded.whatsapp || "",
          image: decoded.image || ""
        });
      }

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

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    let imageUrl = formData.image;

    if (selectedFile) {
      try {
        imageUrl = await uploadMedia(selectedFile);
      } catch (uploadError) {
        setError("Failed to upload image. Please try again.");
        toast.error("Failed to upload image.");
        setIsLoading(false);
        return;
      }
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const updatePayload = { ...formData, image: imageUrl };

      // Include password change if fields are filled
      if (isPasswordSectionOpen && passwordData.newPassword) {
        if (!passwordData.currentPassword) {
          throw new Error("Current password is required to set a new password.");
        }
        if (passwordData.newPassword !== passwordData.confirmPassword) {
          throw new Error("New passwords do not match.");
        }
        
        // The backend now requires both current and new password for verification
        updatePayload.password = passwordData.newPassword;
        updatePayload.currentPassword = passwordData.currentPassword;
      }

      const response = await axios.put(
        import.meta.env.VITE_BACKEND_URL + "api/users",
        updatePayload,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );

      // After a successful update, the backend should issue a new token
      // with the updated user details. We save this new token.
      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      toast.success("Profile updated successfully!");
      onUpdate && onUpdate(); // Trigger parent component refresh
      onClose();
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to update profile";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-[2px]"
      onMouseDown={handleBackdropClick}
    >
      {/* Sea animation background */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <SeaAnimations.Waves />
        <SeaAnimations.Bubbles />
      </div>
      <div
        ref={modalRef}
        className="relative z-10 w-full max-w-lg p-0 mx-2 overflow-hidden bg-white border border-blue-200 shadow-2xl sm:max-w-md rounded-xl"
        style={{
          boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)",
          animation: "floatIn 0.5s ease-out forwards"
        }}
        onMouseDown={e => e.stopPropagation()}
      >
        {/* Header from Login Modal */}
        <div className="relative px-4 py-5 overflow-hidden text-center sm:px-6 sm:py-6 bg-gradient-to-r from-blue-500 to-blue-600">
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
            <div className="absolute bottom-0 left-0 right-0">
              <svg className="w-full h-3" preserveAspectRatio="none" viewBox="0 0 100 10" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 10 Q 25 0, 50 10 T 100 10 V 20 H 0" fill="#fff" />
              </svg>
            </div>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[70vh]">
          <button
            className="absolute z-10 p-1 text-gray-600 transition-all duration-300 rounded-full top-3 right-3 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 group"
            onClick={onClose}
            aria-label="Close"
            type="button"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="mb-6 text-center">
            <h2 className="text-xl font-bold text-gray-800">Edit Profile</h2>
            <p className="text-sm text-gray-600">Update your account information</p>
          </div>

          {error && (
            <div 
              className="p-3 mb-4 text-sm text-red-600 border border-red-300 rounded-lg bg-red-50"
              style={{animation: "shake 0.5s cubic-bezier(.36,.07,.19,.97) both"}}
            >
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Profile Info Section */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* First Name */}
              <div className="space-y-2">
                <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  id="firstname"
                  name="firstname"
                  type="text"
                  placeholder="John"
                  className="w-full px-3 py-2 text-gray-900 transition-all duration-200 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400"
                  value={formData.firstname}
                  onChange={handleInputChange}
                />
              </div>

              {/* Last Name */}
              <div className="space-y-2">
                <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  id="lastname"
                  name="lastname"
                  type="text"
                  placeholder="Doe"
                  className="w-full px-3 py-2 text-gray-900 transition-all duration-200 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400"
                  value={formData.lastname}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Email Field (Read-only) */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                readOnly
                className="w-full px-3 py-2 text-gray-500 bg-gray-100 border border-gray-300 rounded-lg cursor-not-allowed"
                value={formData.email}
              />
            </div>

            {/* WhatsApp Number */}
            <div className="space-y-2">
              <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700">
                WhatsApp Number
              </label>
              <input
                id="whatsapp"
                name="whatsapp"
                type="tel"
                placeholder="+94 12 345 6789"
                className="w-full px-3 py-2 text-gray-900 transition-all duration-200 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400"
                value={formData.whatsapp}
                onChange={handleInputChange}
              />
            </div>

            {/* Profile Picture */}
            <div className="space-y-2">
              <label htmlFor="profile-picture" className="block text-sm font-medium text-gray-700">
                Profile Picture
              </label>
              <div className="flex items-center gap-4">
                {formData.image && !selectedFile && (
                  <img src={formData.image} alt="Current profile" className="object-cover w-12 h-12 rounded-full" />
                )}
                {selectedFile && (
                  <img src={URL.createObjectURL(selectedFile)} alt="New profile preview" className="object-cover w-12 h-12 rounded-full" />
                )}
                <input
                  id="profile-picture"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
            </div>

            {/* Change Password Section */}
            <div className="pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setIsPasswordSectionOpen(!isPasswordSectionOpen)}
                className="flex items-center justify-between w-full text-sm font-medium text-gray-700"
              >
                <span>Change Password</span>
                <svg
                  className={`w-5 h-5 transition-transform duration-200 ${isPasswordSectionOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isPasswordSectionOpen && (
                <div className="mt-4 space-y-4 animate-fadeIn">
                  <div className="space-y-2">
                    <label
                      htmlFor="currentPassword"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Current Password
                    </label>
                    <input
                      id="currentPassword"
                      name="currentPassword"
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-3 py-2 text-gray-900 transition-all duration-200 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="newPassword"
                      className="block text-sm font-medium text-gray-700"
                    >
                      New Password
                    </label>
                    <input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-3 py-2 text-gray-900 transition-all duration-200 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Confirm New Password
                    </label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-3 py-2 text-gray-900 transition-all duration-200 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-3 text-sm font-bold text-white transition-all duration-300 bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
