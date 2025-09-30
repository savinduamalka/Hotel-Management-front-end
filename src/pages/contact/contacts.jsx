import React, { useState, useEffect } from "react";
import NavbarDefault from "../client-pages/navBar";
import SeaAnimations from "../../components/animation/seaAnimations";
import LoginPage from "../../components/auth/login";
import SignupPage from "../../components/auth/signup";
import Footer from "../../components/footer/Footer";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import EditProfileModal from "../../components/auth/editProfile";
import ForgotPasswordModal from "../../components/auth/ForgotPasswordModal";

const ContactPage = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [inquiryDescription, setInquiryDescription] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [userUpdateKey, setUserUpdateKey] = useState(0);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Modal open/close handlers
  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
    setIsSignupModalOpen(false);
    setIsForgotPasswordOpen(false);
  };

  const handleLoginClose = () => setIsLoginModalOpen(false);

  const handleSignupClick = () => {
    setIsSignupModalOpen(true);
    setIsLoginModalOpen(false);
    setIsForgotPasswordOpen(false);
  };

  const handleSignupClose = () => setIsSignupModalOpen(false);

  const handleEditProfileClick = () => setIsEditProfileOpen(true);

  const handleProfileUpdate = () => {
    setIsEditProfileOpen(false);
    setUserUpdateKey((k) => k + 1);
  };

  const handleCloseModals = () => {
    setIsLoginModalOpen(false);
    setIsSignupModalOpen(false);
    setIsEditProfileOpen(false);
  };

  const handleForgotPasswordClick = () => {
    setIsForgotPasswordOpen(true);
    setIsLoginModalOpen(false);
    setIsSignupModalOpen(false);
  };

  const handleCloseForgotPassword = () => setIsForgotPasswordOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    let inquiryData = { inquiryDescription };

    if (!token) {
      if (!email.trim() || !phone.trim()) {
        toast.error("Please enter your email and phone number.");
        return;
      }
      inquiryData = { ...inquiryData, email, phone };
    }

    if (!inquiryDescription.trim()) {
      toast.error("Please enter your message.");
      return;
    }

    setIsSubmitting(true);

    const url = token
      ? `${import.meta.env.VITE_BACKEND_URL}api/inquiry`
      : `${import.meta.env.VITE_BACKEND_URL}api/inquiry/public-inquiry`;

    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    axios
      .post(url, inquiryData, { headers })
      .then((response) => {
        toast.success("Your inquiry has been sent successfully!");
        setInquiryDescription("");
        if (!token) {
          setEmail("");
          setPhone("");
        }
      })
      .catch((error) => {
        toast.error(
          error.response?.data?.message ||
            "There was an error sending your inquiry."
        );
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Toaster position="top-center" reverseOrder={false} />
      <LoginPage
        isOpen={isLoginModalOpen}
        onClose={handleLoginClose}
        onSignupClick={handleSignupClick}
        onForgotPasswordClick={handleForgotPasswordClick}
      />
      <SignupPage
        isOpen={isSignupModalOpen}
        onClose={handleSignupClose}
        onLoginClick={handleLoginClick}
        onForgotPasswordClick={handleForgotPasswordClick}
      />
      <NavbarDefault
        onLoginClick={handleLoginClick}
        onEditProfileClick={handleEditProfileClick}
        refreshKey={userUpdateKey}
      />
      
      {/* Floating particles background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bg-blue-200 rounded-full w-96 h-96 opacity-20 blur-3xl -top-48 -left-48 animate-pulse"></div>
        <div className="absolute delay-1000 bg-indigo-200 rounded-full w-80 h-80 opacity-20 blur-3xl top-1/4 -right-40 animate-pulse"></div>
        <div className="absolute bg-purple-200 rounded-full w-72 h-72 opacity-20 blur-3xl bottom-1/4 left-1/4 animate-pulse delay-2000"></div>
      </div>

      {/* Add top padding to avoid overlap with fixed navbar */}
      <div className="relative z-10 flex flex-col flex-1 pt-24">
        {/* Header */}
        <header className="px-4 mb-16 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 sm:text-6xl md:text-7xl animate-fade-in">
              Contact Us
            </h1>
            <div className="w-24 h-1 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"></div>
            <p className="max-w-2xl mx-auto text-xl font-medium leading-relaxed text-slate-600">
              We'd love to hear from you! Experience our exceptional service and let us make your stay unforgettable.
            </p>
          </div>
        </header>

        {/* Contact Info */}
        <section className="container px-4 mx-auto mb-16">
          <div className="flex flex-col items-center justify-center gap-8 lg:flex-row lg:gap-12">
            <div className="relative overflow-hidden group">
              <div className="absolute inset-0 transition-opacity duration-300 opacity-25 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl blur group-hover:opacity-40"></div>
              <div className="relative flex items-center gap-4 px-8 py-6 transition-all duration-300 border shadow-xl bg-white/90 backdrop-blur-sm rounded-2xl border-white/50 hover:shadow-2xl hover:scale-105">
                <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold tracking-wide text-gray-500 uppercase">Email Us</p>
                  <a
                    href="mailto:info@bluehorizon.com"
                    className="text-xl font-bold text-gray-800 transition-colors duration-200 hover:text-blue-600"
                  >
                    info@bluehorizon.com
                  </a>
                </div>
              </div>
            </div>
            
            <div className="relative overflow-hidden group">
              <div className="absolute inset-0 transition-opacity duration-300 opacity-25 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur group-hover:opacity-40"></div>
              <div className="relative flex items-center gap-4 px-8 py-6 transition-all duration-300 border shadow-xl bg-white/90 backdrop-blur-sm rounded-2xl border-white/50 hover:shadow-2xl hover:scale-105">
                <div className="p-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold tracking-wide text-gray-500 uppercase">Call Us</p>
                  <a
                    href="tel:+94725451111"
                    className="text-xl font-bold text-gray-800 transition-colors duration-200 hover:text-indigo-600"
                  >
                    +94 78 944 8508
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Location */}
        <section className="container px-4 mx-auto mb-16">
          <div className="mb-8 text-center">
            <h2 className="mb-4 text-4xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text">
              Find Us Here
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              Located in the heart of Galle, experience the perfect blend of luxury and Sri Lankan hospitality
            </p>
          </div>
          
          <div className="relative group">
            <div className="absolute transition-opacity duration-500 -inset-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-50"></div>
            <div
              className="relative w-full h-80 overflow-hidden bg-white shadow-2xl md:h-[500px] rounded-3xl border-4 border-white/50"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2786.122590120544!2d80.2842032529791!3d6.0524288501652945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae16d0632996fc7%3A0xcdd1a609ee0594ce!2sOrenda%20Eco%20Lodge%20%26%20Spa!5e1!3m2!1sen!2slk!4v1758810760958!5m2!1sen!2slk"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map"
                className="transition-all duration-500"
              />
              
              {/* Location overlay card */}
              <div className="absolute z-20 p-6 border shadow-2xl pointer-events-none bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl border-white/50">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">
                      Orenda Eco Lodge & Spa
                    </h3>
                    <p className="text-gray-600">Pilana, Galle, Sri Lanka</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form with Sea Animation */}
        <section className="container relative px-4 mx-auto mb-16">
          {/* Sea animation background */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
            <SeaAnimations.Waves />
          </div>
          
          {/* Enhanced background effects */}
          <div className="absolute inset-0 z-0">
            <div className="absolute w-64 h-64 delay-500 bg-blue-300 rounded-full top-1/4 left-1/4 opacity-20 blur-3xl animate-pulse"></div>
            <div className="absolute w-48 h-48 delay-1000 bg-indigo-300 rounded-full bottom-1/4 right-1/4 opacity-20 blur-3xl animate-pulse"></div>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto">
          <div className="mb-12 text-center animate-fade-in">
            <h2 className="mb-4 text-4xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text animate-float">
              Send Us a Message
            </h2>
            <div className="w-24 h-1 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 animate-pulse"></div>
            <p className="max-w-2xl mx-auto text-lg leading-relaxed text-gray-600">
              Have a question or a special request? We're here to help make your experience extraordinary.
            </p>
          </div>            <div className="relative group">
              <div className="absolute transition-opacity duration-500 -inset-6 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-40"></div>
              <div className="relative overflow-hidden border-2 shadow-2xl bg-white/90 backdrop-blur-xl rounded-3xl border-white/50">
                <div className="p-8 md:p-12 lg:p-16">
                  {/* Decorative elements */}
                  <div className="absolute top-0 left-0 w-32 h-32 -translate-x-16 -translate-y-16 rounded-full bg-gradient-to-br from-blue-200 to-indigo-200 opacity-20"></div>
                  <div className="absolute bottom-0 right-0 w-40 h-40 translate-x-20 translate-y-20 rounded-full bg-gradient-to-tl from-purple-200 to-indigo-200 opacity-20"></div>
                  <form onSubmit={handleSubmit} className="relative space-y-8">
                    {!isLoggedIn && (
                      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                        <div className="space-y-2">
                          <label
                            className="flex items-center gap-2 text-sm font-bold tracking-wide text-gray-700 uppercase"
                            htmlFor="email"
                          >
                            <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                            </svg>
                            Email Address
                          </label>
                          <div className="relative">
                            <input
                              id="email"
                              type="email"
                              placeholder="you@example.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full px-6 py-4 text-gray-800 transition-all duration-300 border-2 border-gray-200 shadow-lg bg-white/95 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-300/40 focus:border-blue-500 hover:shadow-xl hover:border-blue-300 disabled:opacity-50"
                              disabled={isSubmitting}
                              required
                            />
                            <div className="absolute inset-0 transition-opacity duration-300 opacity-0 pointer-events-none rounded-2xl bg-gradient-to-r from-blue-500/10 to-indigo-500/10 hover:opacity-100"></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label
                            className="flex items-center gap-2 text-sm font-bold tracking-wide text-gray-700 uppercase"
                            htmlFor="phone"
                          >
                            <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            Phone Number
                          </label>
                          <div className="relative">
                            <input
                              id="phone"
                              type="tel"
                              placeholder="+94 71 345 6789"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className="w-full px-6 py-4 text-gray-800 transition-all duration-300 border-2 border-gray-200 shadow-lg bg-white/95 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-300/40 focus:border-blue-500 hover:shadow-xl hover:border-blue-300 disabled:opacity-50"
                              disabled={isSubmitting}
                              required
                            />
                            <div className="absolute inset-0 transition-opacity duration-300 opacity-0 pointer-events-none rounded-2xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 hover:opacity-100"></div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="space-y-2">
                      <label
                        className="flex items-center gap-2 text-sm font-bold tracking-wide text-gray-700 uppercase"
                        htmlFor="message"
                      >
                        <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        Your Message
                      </label>
                      <div className="relative">
                        <textarea
                          id="message"
                          rows="6"
                          placeholder="Tell us how we can help you create an unforgettable experience..."
                          value={inquiryDescription}
                          onChange={(e) => setInquiryDescription(e.target.value)}
                          className="w-full px-6 py-4 text-gray-800 transition-all duration-300 border-2 border-gray-200 shadow-lg resize-none bg-white/95 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-300/40 focus:border-blue-500 hover:shadow-xl hover:border-blue-300 disabled:opacity-50"
                          disabled={isSubmitting}
                        ></textarea>
                        <div className="absolute inset-0 transition-opacity duration-300 opacity-0 pointer-events-none rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:opacity-100"></div>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="relative w-full overflow-hidden group"
                      >
                        <div className="absolute inset-0 transition-opacity duration-300 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl blur opacity-70 group-hover:opacity-100"></div>
                        <div className="relative px-8 py-5 text-lg font-bold text-white transition-all duration-300 transform bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl hover:from-blue-700 hover:to-indigo-800 hover:shadow-2xl hover:shadow-blue-500/25 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-blue-500/50 disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100 disabled:hover:shadow-none">
                          {isSubmitting ? (
                            <div className="flex items-center justify-center gap-3">
                              <div className="w-5 h-5 border-2 rounded-full border-white/30 border-t-white animate-spin"></div>
                              Sending Your Message...
                            </div>
                          ) : (
                            <div className="flex items-center justify-center gap-3">
                              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                              </svg>
                              Send Inquiry
                            </div>
                          )}
                        </div>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {isEditProfileOpen && (
          <EditProfileModal
            isOpen={isEditProfileOpen}
            onClose={handleCloseModals}
            onUpdate={handleProfileUpdate}
          />
        )}

        {isForgotPasswordOpen && (
          <ForgotPasswordModal
            isOpen={isForgotPasswordOpen}
            onClose={handleCloseForgotPassword}
          />
        )}

        <Footer />
      </div>
    </div>
  );
};

export default ContactPage;
