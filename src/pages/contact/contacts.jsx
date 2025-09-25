import React, { useState, useEffect } from "react";
import NavbarDefault from "../client-pages/navBar";
import SeaAnimations from "../../components/animation/seaAnimations";
import LoginPage from "../../components/auth/login";
import SignupPage from "../../components/auth/signup";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const ContactPage = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [inquiryDescription, setInquiryDescription] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleLoginClose = () => {
    setIsLoginModalOpen(false);
  };

  const handleSignupClick = () => {
    setIsSignupModalOpen(true);
  };

  const handleSignupClose = () => {
    setIsSignupModalOpen(false);
  };

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
        onSignupClick={() => {
          setIsLoginModalOpen(false);
          setIsSignupModalOpen(true);
        }}
      />
      <SignupPage
        isOpen={isSignupModalOpen}
        onClose={handleSignupClose}
        onLoginClick={handleLoginClick}
      />
      <NavbarDefault onLoginClick={handleLoginClick} />
      
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
                    +94 72 545 1111
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
            <div className="relative w-full h-80 overflow-hidden bg-white shadow-2xl md:h-[500px] rounded-3xl border-4 border-white/50">
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/20 to-transparent"></div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.590038371026!2d80.2830967745691!3d6.050842593934938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae16d6ef589344d%3A0x26fb49a562532b14!2sAgni%20BookShop%20%26%20Communication!5e0!3m2!1sen!2slk!4v1732466590549!5m2!1sen!2slk"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map"
                className="transition-all duration-500 hover:grayscale-0 grayscale"
              />
              
              {/* Location overlay card */}
              <div className="absolute z-20 p-6 border shadow-2xl bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl border-white/50">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">Blue Horizon Resort</h3>
                    <p className="text-gray-600">Pilana Road, Galle, Sri Lanka</p>
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
                              placeholder="+94 12 345 6789"
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

        {/* Enhanced Footer */}
        <footer className="relative w-full mt-auto overflow-hidden text-white">
          {/* Background gradients and effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          <div className="absolute top-0 left-0 -translate-x-48 -translate-y-48 bg-blue-500 rounded-full w-96 h-96 opacity-10 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 translate-x-40 translate-y-40 bg-indigo-500 rounded-full w-80 h-80 opacity-10 blur-3xl"></div>
          
          <div className="relative px-4 py-12 sm:px-6 lg:px-8">
            <div className="container mx-auto">
              <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
                      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.78 0-2.674-2.154-1.414-3.414l5-5A2 2 0 008 9.586V5L8 4z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold tracking-wide">BLUE HORIZON</h3>
                  </div>
                  <p className="text-lg leading-relaxed text-blue-100">
                    Experience luxury and comfort on the beautiful shores of Galle, Sri Lanka. Where memories are made and dreams come true.
                  </p>
                  <div className="flex gap-4 pt-4">
                    <div className="p-3 transition-colors duration-300 rounded-full cursor-pointer bg-white/10 backdrop-blur-sm hover:bg-white/20">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                    </div>
                    <div className="p-3 transition-colors duration-300 rounded-full cursor-pointer bg-white/10 backdrop-blur-sm hover:bg-white/20">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                      </svg>
                    </div>
                    <div className="p-3 transition-colors duration-300 rounded-full cursor-pointer bg-white/10 backdrop-blur-sm hover:bg-white/20">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.404-5.219 1.404-5.219s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.551.097.118.112.221.083.402-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.םדר-.82l-.637 2.43c-.230.889-.85 2.002-1.269 2.681.957.291 1.969.448 3.017.448C18.624 23.973 23.991 18.592 23.991 11.987 24.001 5.367 18.634.001 12.017.001z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="mb-6 text-xl font-bold">Quick Links</h3>
                  <ul className="space-y-3">
                    <li>
                      <a
                        href="/"
                        className="flex items-center gap-2 text-blue-100 transition-all duration-300 hover:text-white hover:translate-x-2"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        Home
                      </a>
                    </li>
                    <li>
                      <a
                        href="/gallery"
                        className="flex items-center gap-2 text-blue-100 transition-all duration-300 hover:text-white hover:translate-x-2"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        Gallery
                      </a>
                    </li>
                    <li>
                      <a
                        href="/contacts"
                        className="flex items-center gap-2 text-blue-100 transition-all duration-300 hover:text-white hover:translate-x-2"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        Contact Us
                      </a>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="mb-6 text-xl font-bold">Get In Touch</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 mt-1 rounded-lg bg-blue-500/20">
                        <svg className="w-4 h-4 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="leading-relaxed text-blue-100">Pilana Road, Galle<br/>Sri Lanka</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-500/20">
                        <svg className="w-4 h-4 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                      </div>
                      <p className="text-blue-100">info@bluehorizon.com</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-500/20">
                        <svg className="w-4 h-4 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <p className="text-blue-100">+94 725451111</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-center justify-between pt-8 mt-12 border-t border-white/20 md:flex-row">
                <p className="text-center text-blue-100 md:text-left">
                  © {new Date().getFullYear()} Blue Horizon. All rights reserved. Crafted with ❤️ in Sri Lanka.
                </p>
                <div className="flex gap-6 mt-4 md:mt-0">
                  <a href="#" className="text-blue-200 transition-colors hover:text-white">Privacy Policy</a>
                  <a href="#" className="text-blue-200 transition-colors hover:text-white">Terms of Service</a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ContactPage;
