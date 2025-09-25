import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function OtpVerification({
  isOpen,
  onClose,
  onSuccess,
  email,
  onLoginClick,
}) {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);

  if (!isOpen) {
    return null;
  }

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "api/users/verify-otp",
        { email, otp }
      );
      toast.success(response.data.message || "Email verified successfully!");
      onSuccess();
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to verify OTP. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsResending(true);
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "api/users/resend-otp",
        { email }
      );
      toast.success(response.data.message || "A new OTP has been sent.");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to resend OTP. Please try again."
      );
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="relative w-full max-w-md p-8 m-4 space-y-6 bg-white rounded-2xl shadow-2xl">
        <button
          onClick={onClose}
          className="absolute text-gray-400 top-4 right-4 hover:text-gray-600"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            Verify Your Email
          </h2>
          <p className="mt-2 text-gray-600">
            An OTP has been sent to <span className="font-semibold">{email}</span>.
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-6">
          <div>
            <label
              htmlFor="otp"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Enter OTP
            </label>
            <input
              id="otp"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength="6"
              className="w-full px-4 py-3 text-center text-2xl tracking-[0.5em] font-semibold text-gray-800 border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="------"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
            >
              {isLoading ? "Verifying..." : "Verify Account"}
            </button>
          </div>
        </form>

        <div className="text-sm text-center text-gray-600">
          <p>
            Didn't receive the code?{" "}
            <button
              onClick={handleResendOtp}
              disabled={isResending}
              className="font-medium text-blue-600 hover:underline disabled:text-gray-400"
            >
              {isResending ? "Resending..." : "Resend OTP"}
            </button>
          </p>
        </div>
        <div className="text-sm text-center text-gray-600">
          <p>
            Verified your email?{" "}
            <button
              onClick={onLoginClick}
              className="font-medium text-blue-600 hover:underline"
            >
              Login Now
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
