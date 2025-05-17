import React from "react";
import NavbarDefault from "../client-pages/navBar";
import SeaAnimations from "../../components/animation/seaAnimations";

const ContactPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavbarDefault />
      {/* Add top padding to avoid overlap with fixed navbar */}
      <div className="flex-1 pt-24 flex flex-col">
        {/* Header */}
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-blue-700 drop-shadow mb-2 tracking-wide sm:text-5xl md:text-6xl">
            Contact Us
          </h1>
          <p className="text-lg text-blue-600 italic">
            We’d love to hear from you! Get in touch with us.
          </p>
        </header>

        {/* Contact Info */}
        <section className="container mx-auto mb-10 px-4">
          <div className="flex flex-col items-center justify-center gap-6 md:flex-row md:gap-16">
            <div className="flex items-center gap-3 bg-white/95 rounded-xl shadow px-6 py-4">
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
            <div className="flex items-center gap-3 bg-white/95 rounded-xl shadow px-6 py-4">
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
        <section className="container mx-auto mb-10 px-4">
          <h2 className="mb-4 text-2xl font-semibold text-center text-blue-700">
            Our Location
          </h2>
          <div className="w-full h-64 md:h-96 rounded-xl overflow-hidden shadow-lg bg-gray-200">
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
        <section className="container mx-auto px-4 relative">
          {/* Sea animation background */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-70">
            <SeaAnimations.Waves />
          </div>
          <h2 className="mb-6 text-2xl font-semibold text-center text-blue-700 relative z-10">
            Send Us a Message
          </h2>
          <form className="max-w-2xl mx-auto bg-white/95 rounded-xl shadow-lg p-8 space-y-6 backdrop-blur-sm relative z-10">
            <div>
              <label
                className="block mb-2 font-medium text-blue-700"
                htmlFor="name"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                className="block mb-2 font-medium text-blue-700"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                className="block mb-2 font-medium text-blue-700"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                id="message"
                rows="4"
                placeholder="Write your message here"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-3 text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-md hover:from-blue-700 hover:to-indigo-700 font-semibold shadow transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Send Message
            </button>
          </form>
        </section>

        {/* Footer */}
        <footer className="px-4 py-8 mt-0 text-white bg-gradient-to-r from-blue-600 to-indigo-700 sm:px-6 lg:px-8 w-full shadow-inner flex-shrink-0">
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
