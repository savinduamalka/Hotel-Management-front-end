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
      ? `${import.meta.env.VITE_BACKEND_URL}api/inquiry/create`
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
    <div className="flex flex-col min-h-screen bg-gray-50">
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
      {/* Add top padding to avoid overlap with fixed navbar */}
      <div className="flex flex-col flex-1 pt-24">
        {/* Header */}
        <header className="mb-10 text-center">
          <h1 className="mb-2 text-4xl font-bold tracking-wide text-blue-700 drop-shadow sm:text-5xl md:text-6xl">
            Contact Us
          </h1>
          <p className="text-lg italic text-blue-600">
            We’d love to hear from you! Get in touch with us.
          </p>
        </header>

        {/* Contact Info */}
        <section className="container px-4 mx-auto mb-10">
          <div className="flex flex-col items-center justify-center gap-6 md:flex-row md:gap-16">
            <div className="flex items-center gap-3 px-6 py-4 shadow bg-white/95 rounded-xl">
              <svg
                className="w-6 h-6 text-blue-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 12H8m8 0a8 8 0 11-16 0 8 8 0 0116 0zm0 0h4"
                />
              </svg>
              <a
                href="mailto:info@bluehorizon.com"
                className="text-lg text-blue-800 hover:underline"
              >
                info@bluehorizon.com
              </a>
            </div>
            <div className="flex items-center gap-3 px-6 py-4 shadow bg-white/95 rounded-xl">
              <svg
                className="w-6 h-6 text-blue-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10a10 10 0 009-9 10 10 0 009 9c0 5-4.03 7.83-8 9.15A11.97 11.97 0 013 10z"
                />
              </svg>
              <a
                href="tel:+94725451111"
                className="text-lg text-blue-800 hover:underline"
              >
                +94 72 545 1111
              </a>
            </div>
          </div>
        </section>

        {/* Location */}
        <section className="container px-4 mx-auto mb-10">
          <h2 className="mb-4 text-2xl font-semibold text-center text-blue-700">
            Our Location
          </h2>
          <div className="w-full h-64 overflow-hidden bg-gray-200 shadow-lg md:h-96 rounded-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.590038371026!2d80.2830967745691!3d6.050842593934938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae16d6ef589344d%3A0x26fb49a562532b14!2sAgni%20BookShop%20%26%20Communication!5e0!3m2!1sen!2slk!4v1732466590549!5m2!1sen!2slk"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map"
            />
          </div>
        </section>

        {/* Contact Form with Sea Animation */}
        <section className="container relative px-4 mx-auto mb-12">
          {/* Sea animation background */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-70">
            <SeaAnimations.Waves />
          </div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="overflow-hidden border shadow-2xl bg-white/80 backdrop-blur-md rounded-2xl border-white/30">
              <div className="p-8 md:p-12">
                <h2 className="mb-2 text-3xl font-bold text-center text-blue-800">
                  Send Us a Message
                </h2>
                <p className="mb-8 text-center text-gray-600">
                  Have a question or a special request? Drop us a line.
                </p>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {!isLoggedIn && (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        <label
                          className="block mb-2 font-semibold text-blue-800"
                          htmlFor="email"
                        >
                          Email Address
                        </label>
                        <input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-5 py-4 transition-all duration-300 border-2 border-blue-100 shadow-inner bg-white/90 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300/50 focus:border-blue-500"
                          disabled={isSubmitting}
                          required
                        />
                      </div>
                      <div>
                        <label
                          className="block mb-2 font-semibold text-blue-800"
                          htmlFor="phone"
                        >
                          Phone Number
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          placeholder="+94 12 345 6789"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-5 py-4 transition-all duration-300 border-2 border-blue-100 shadow-inner bg-white/90 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300/50 focus:border-blue-500"
                          disabled={isSubmitting}
                          required
                        />
                      </div>
                    </div>
                  )}
                  <div>
                    <label
                      className="block mb-2 font-semibold text-blue-800"
                      htmlFor="message"
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      rows="5"
                      placeholder="Tell us how we can help you..."
                      value={inquiryDescription}
                      onChange={(e) => setInquiryDescription(e.target.value)}
                      className="w-full px-5 py-4 transition-all duration-300 border-2 border-blue-100 shadow-inner bg-white/90 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300/50 focus:border-blue-500"
                      disabled={isSubmitting}
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 text-lg font-semibold text-white transition-all duration-300 transform shadow-lg bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl hover:from-blue-700 hover:to-indigo-800 hover:shadow-blue-500/30 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-blue-500/70 disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100"
                  >
                    {isSubmitting ? "Sending..." : "Send Inquiry"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full px-4 py-8 mt-auto text-white shadow-inner bg-gradient-to-r from-blue-600 to-indigo-700 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div>
                <h3 className="mb-4 text-xl font-bold">BLUE HORIZON</h3>
                <p className="text-blue-100">
                  Experience luxury and comfort on the beautiful shores of Galle,
                  Sri Lanka.
                </p>
              </div>
              <div>
                <h3 className="mb-4 text-lg font-bold">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="/"
                      className="text-blue-100 transition-colors hover:text-white"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="/gallery"
                      className="text-blue-100 transition-colors hover:text-white"
                    >
                      Gallery
                    </a>
                  </li>
                  <li>
                    <a
                      href="/contacts"
                      className="text-blue-100 transition-colors hover:text-white"
                    >
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="mb-4 text-lg font-bold">Contact Us</h3>
                <address className="not-italic text-blue-100">
                  <p>Pilana Road, Galle</p>
                  <p>Sri Lanka</p>
                  <p className="mt-2">Email: info@bluehorizon.com</p>
                  <p>Phone: +94 725451111</p>
                </address>
              </div>
            </div>
            <div className="pt-6 mt-8 text-center text-blue-100 border-t border-blue-400">
              <p>© {new Date().getFullYear()} Blue Horizon. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ContactPage;
