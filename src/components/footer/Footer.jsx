import React from 'react';
import { Link } from "react-router-dom";
import { SeaAnimations } from "../animation/seaAnimations";

export default function Footer() {
  return (
    <footer className="relative pt-20 pb-8 overflow-hidden text-white bg-gray-900">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 rounded-full w-72 h-72 bg-gradient-to-r from-cyan-400 to-blue-500 mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 right-0 rounded-full w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-400 mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute rounded-full -bottom-8 left-20 w-72 h-72 bg-gradient-to-r from-yellow-400 to-pink-400 mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Top Wave */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg className="relative block w-full h-16" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
                className="fill-current text-slate-100"></path>
        </svg>
      </div>

      <div className="relative z-10 px-4 pt-24 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 gap-12 mb-12 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text">
                  BLUE HORIZON
                </h2>
                <div className="w-20 h-1 mt-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"></div>
              </div>
              <p className="mb-6 text-lg leading-relaxed text-slate-300">
                Where luxury meets the infinite blue. Experience unparalleled hospitality on the stunning shores of Galle, Sri Lanka.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="relative p-2 transition-all duration-300 border rounded-full group bg-gradient-to-r from-blue-600/20 to-blue-800/20 border-blue-600/30 hover:from-blue-600/30 hover:to-blue-800/30">
                  <svg className="w-5 h-5 text-blue-500 transition-colors group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="relative p-2 transition-all duration-300 border rounded-full group bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500/30 hover:from-blue-500/30 hover:to-purple-500/30">
                  <svg className="w-5 h-5 text-blue-400 transition-colors group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="relative p-2 transition-all duration-300 border rounded-full group bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30 hover:from-purple-500/30 hover:to-pink-500/30">
                  <svg className="w-5 h-5 text-purple-400 transition-colors group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.909.097.118.112.222.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.164-1.510-.7-2.448-2.914-2.448-4.69 0-3.86 2.806-7.403 8.085-7.403 4.255 0 7.559 3.032 7.559 7.075 0 4.219-2.661 7.613-6.351 7.613-1.239 0-2.407-.644-2.407-.644s-.544 2.081-.659 2.595c-.264.984-1.11 2.42-1.652 3.24C9.697 23.789 10.794 24.001 12.017 24.001c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </a>
                <a href="#" className="relative p-2 transition-all duration-300 border rounded-full group bg-gradient-to-r from-pink-500/20 to-red-500/20 border-pink-500/30 hover:from-pink-500/30 hover:to-red-500/30">
                  <svg className="w-5 h-5 text-pink-400 transition-colors group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="flex items-center mb-6 text-xl font-bold text-white">
                <span className="w-2 h-2 mr-3 rounded-full bg-cyan-400"></span>
                Quick Links
              </h3>
              <ul className="space-y-3">
                {[
                  { name: 'Home', path: '/' },
                  { name: 'Gallery', path: '/gallery' },
                  { name: 'Contact Us', path: '/contacts' }
                ].map((link, index) => (
                  <li key={index}>
                    <a href={link.path} className="flex items-center transition-colors duration-300 text-slate-300 hover:text-cyan-400 group">
                      <span className="w-0 h-0.5 bg-cyan-400 mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300"></span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="flex items-center mb-6 text-xl font-bold text-white">
                <span className="w-2 h-2 mr-3 bg-blue-400 rounded-full"></span>
                Contact Info
              </h3>
              <div className="space-y-4">
                <div className="flex items-start group">
                  <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 transition-all duration-300 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 group-hover:from-cyan-500/30 group-hover:to-blue-500/30">
                    <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="font-medium text-white">Address</p>
                    <p className="text-slate-300">123 Ocean Drive, Galle<br />Sri Lanka 80000</p>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 transition-all duration-300 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 group-hover:from-blue-500/30 group-hover:to-purple-500/30">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="font-medium text-white">Phone</p>
                    <p className="text-slate-300">+94 123 456 789</p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 transition-all duration-300 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 group-hover:from-purple-500/30 group-hover:to-pink-500/30">
                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="font-medium text-white">Email</p>
                    <p className="text-slate-300">info@bluehorizon.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="flex items-center mb-6 text-xl font-bold text-white">
                <span className="w-2 h-2 mr-3 bg-purple-400 rounded-full"></span>
                Stay Updated
              </h3>
              <p className="mb-4 text-slate-300">Subscribe to our newsletter for exclusive offers and updates.</p>
              <form className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 text-white transition-colors duration-300 border rounded-lg bg-slate-800/50 border-slate-600 placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-3 font-medium text-white transition-all duration-300 transform rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                >
                  Subscribe Now
                </button>
              </form>
              <div className="p-4 mt-6 border rounded-lg bg-gradient-to-r from-slate-800/50 to-slate-700/50 border-slate-600">
                <div className="flex items-center mb-2">
                  <div className="w-3 h-3 mr-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-green-400">24/7 Support Available</span>
                </div>
                <p className="text-sm text-slate-400">Get instant assistance anytime, anywhere.</p>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="pt-8 border-t border-slate-700">
            <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
              <div className="flex items-center space-x-6">
                <p className="text-slate-300">
                  © {new Date().getFullYear()} Blue Horizon Resort. All rights reserved.
                </p>
                <div className="items-center hidden space-x-4 text-sm md:flex text-slate-400">
                  <a href="#" className="transition-colors hover:text-cyan-400">Privacy Policy</a>
                  <span>•</span>
                  <a href="#" className="transition-colors hover:text-cyan-400">Terms of Service</a>
                  <span>•</span>
                  <a href="#" className="transition-colors hover:text-cyan-400">Cookie Policy</a>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-slate-400">
                <span className="text-sm">Developed by</span>
                <div className="flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse animation-delay-1000"></span>
                  <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse animation-delay-2000"></span>
                </div>
                <span className="text-sm font-medium text-cyan-400">Savindu Amalka</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"></div>
    </footer>
  );
};
