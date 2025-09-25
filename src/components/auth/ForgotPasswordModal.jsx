import { useState, useRef, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { SeaAnimations } from "../animation/seaAnimations";

export default function ForgotPasswordModal({ isOpen, onClose, onLoginClick }) {
  const [step, setStep] = useState("request"); // 'request', 'reset'
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          handleClose();
        }
      };
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.body.style.overflow = 'auto';
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen]);

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      handleClose();
    }
  };

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post(import.meta.env.VITE_BACKEND_URL + "api/users/forgot-password", { email });
      toast.success("Password reset OTP sent to your email.");
      setStep("reset");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    setIsLoading(true);
    try {
      await axios.post(import.meta.env.VITE_BACKEND_URL + "api/users/reset-password", {
        email,
        otp,
        newPassword,
      });
      toast.success("Password has been reset successfully!");
      onClose();
      onLoginClick();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reset password.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setStep("request");
    setEmail("");
    setOtp("");
    setNewPassword("");
    setConfirmPassword("");
    onClose();
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
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <SeaAnimations.Waves />
      </div>
      
      <div
        ref={modalRef}
        className="relative w-full max-w-xs mx-2 my-4 overflow-hidden bg-white border border-blue-200 shadow-2xl sm:mx-4 sm:max-w-md md:max-w-lg lg:max-w-md rounded-xl"
        style={{
          boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)",
          animation: "floatIn 0.5s ease-out forwards"
        }}
      >
        <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none opacity-30">
          <SeaAnimations.Coral color="rgba(59, 130, 246, 0.3)" />
        </div>
        <div className="absolute bottom-0 right-0 w-24 h-24 rotate-90 pointer-events-none opacity-20">
          <SeaAnimations.Coral color="rgba(59, 130, 246, 0.2)" />
        </div>

        <button
          onClick={handleClose}
          className="absolute z-20 p-1 text-gray-600 transition-all duration-300 rounded-full top-3 right-3 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 group"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
          <span className="absolute inset-0 bg-blue-200 rounded-full opacity-0 group-hover:opacity-25" style={{animation: "ripple 1s infinite"}}></span>
        </button>

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

        <div className="p-4 sm:p-5">
          {step === "request" && (
            <>
              <h2 className="mb-1 text-lg font-semibold text-gray-800 sm:text-xl">Forgot Password?</h2>
              <p className="mb-3 text-xs text-gray-500 sm:text-sm">
                Enter your email to receive a recovery code.
              </p>
              <form onSubmit={handleRequestOtp} className="space-y-4">
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
                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Sending..." : "Send Recovery Code"}
                  </button>
                </div>
              </form>
            </>
          )}

          {step === "reset" && (
            <>
              <h2 className="mb-1 text-lg font-semibold text-gray-800 sm:text-xl">Reset Your Password</h2>
              <p className="mb-3 text-xs text-gray-500 sm:text-sm">
                An OTP has been sent to <strong>{email}</strong>.
              </p>
              <form onSubmit={handleResetPassword} className="space-y-3">
                <div className="space-y-1">
                  <label htmlFor="otp" className="block text-xs font-medium text-gray-700">
                    Recovery Code (OTP)
                  </label>
                  <div className="relative">
                     <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-5 h-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                        </svg>
                    </div>
                    <input
                      id="otp"
                      type="text"
                      placeholder="Enter the 6-digit code"
                      className="block w-full py-2 pl-10 pr-3 text-xs text-gray-900 transition-all duration-200 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label htmlFor="newPassword"  className="block text-xs font-medium text-gray-700">
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg className="w-5 h-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input
                      id="newPassword"
                      type="password"
                      placeholder="••••••••"
                      className="block w-full py-2 pl-10 pr-3 text-xs text-gray-900 transition-all duration-200 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label htmlFor="confirmPassword"  className="block text-xs font-medium text-gray-700">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg className="w-5 h-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      className="block w-full py-2 pl-10 pr-3 text-xs text-gray-900 transition-all duration-200 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full px-4 py-2.5 mt-2 text-sm font-semibold text-white transition-all duration-300 bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Resetting..." : "Reset Password"}
                  </button>
                </div>
              </form>
            </>
          )}
          <div className="pt-2 text-xs text-center text-gray-600">
            Remembered your password?{" "}
            <button onClick={onLoginClick} className="font-medium text-blue-600 transition-colors hover:text-blue-500">
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
