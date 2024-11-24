import React from "react";
import NavbarDefault from "../client-pages/navBar";

const ContactPage = () => {
  return (
    <div>
      <NavbarDefault />

      <div className="min-h-screen bg-gray-50">
        
        <header className="py-6 text-center text-white bg-blue-900">
          <h1 className="text-3xl font-bold">Contact Us</h1>
          <p className="mt-2 text-lg">
            We’d love to hear from you! Get in touch with us.
          </p>
        </header>

        
        <section className="px-4 py-8 bg-white md:px-16">
          <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">
            Contact Information
          </h2>
          <div className="flex flex-col items-center space-y-6 md:space-y-0 md:flex-row md:justify-center md:space-x-12">
           
            <div className="flex items-center space-x-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-blue-900"
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
                className="text-lg text-gray-700 hover:underline"
              >
                info@bluehorizon.com
              </a>
            </div>

            
            <div className="flex items-center space-x-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-blue-900"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10a10 10 0 019-9 10 10 0 019 9c0 5-4.03 7.83-8 9.15A11.97 11.97 0 013 10z"
                />
              </svg>
              <a
                href="tel:+94725451111"
                className="text-lg text-gray-700 hover:underline"
              >
                +94 72 545 1111
              </a>
            </div>
          </div>
        </section>

        
        <section className="px-4 my-8 md:px-16">
          <h2 className="mb-4 text-2xl font-semibold text-center text-gray-800">
            Our Location
          </h2>
          <div className="w-full h-64 overflow-hidden bg-gray-200 rounded-md shadow-md md:h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.590038371026!2d80.2830967745691!3d6.050842593934938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae16d6ef589344d%3A0x26fb49a562532b14!2sAgni%20BookShop%20%26%20Communication!5e0!3m2!1sen!2slk!4v1732466590549!5m2!1sen!2slk"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>

        
        <section className="px-4 py-8 bg-white md:px-16">
          <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">
            Send Us a Message
          </h2>
          <form className="max-w-3xl mx-auto space-y-6">
            <div>
              <label
                className="block mb-2 font-medium text-gray-700"
                htmlFor="name"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-3 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                className="block mb-2 font-medium text-gray-700"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                className="block mb-2 font-medium text-gray-700"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                id="message"
                rows="4"
                placeholder="Write your message here"
                className="w-full px-4 py-3 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-3 text-white bg-blue-900 rounded-md hover:bg-blue-800 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Send Message
            </button>
          </form>
        </section>

        
        <footer className="py-6 mt-8 text-center text-white bg-blue-900">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Blue Horizon - Galle. All rights
            reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default ContactPage;
