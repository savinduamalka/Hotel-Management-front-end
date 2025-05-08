import React, { useState } from "react";
import NavBar from "./navBar";
import LoginPage from "../../components/auth/login";

export default function HomePage() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleLoginClose = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Login Modal - positioned at the top level of the DOM */}
      <LoginPage isOpen={isLoginModalOpen} onClose={handleLoginClose} />
      
      {/* Navbar */}
      <NavBar onLoginClick={handleLoginClick} />
      
      {/* Hero Section */}
      <div 
        className="relative min-h-screen pt-16 bg-center bg-cover md:pt-20" 
        style={{ backgroundImage: `url('/bag-home.jpg')` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        
        <div className="container relative z-10 flex flex-col items-center justify-center h-full px-4 py-20 mx-auto sm:px-6">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold leading-tight tracking-wide text-white sm:text-5xl md:text-6xl drop-shadow-lg">
              BLUE HORIZON
            </h1>
            <p className="text-xl italic text-blue-100 sm:text-2xl drop-shadow">
              Galle • Sri Lanka
            </p>
          </div>
          
          {/* Search Card */}
          <div className="w-full max-w-4xl mx-auto overflow-hidden transition-all duration-300 shadow-lg bg-white/95 backdrop-blur-sm rounded-xl hover:shadow-xl">
            <div className="p-4 sm:p-6 md:p-8">
              <h2 className="mb-4 text-xl font-semibold text-center text-blue-600 sm:text-2xl">Find Your Perfect Stay</h2>
              
              <form className="space-y-4 md:space-y-0 md:grid md:grid-cols-8 md:gap-4 lg:gap-6">
                <div className="md:col-span-2">
                  <label className="block mb-1 text-sm font-medium text-gray-700">Check In</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block mb-1 text-sm font-medium text-gray-700">Check Out</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="md:col-span-1">
                  <label className="block mb-1 text-sm font-medium text-gray-700">Guests</label>
                  <input
                    type="number"
                    min="1"
                    placeholder="2"
                    className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="md:col-span-1">
                  <label className="block mb-1 text-sm font-medium text-gray-700">Type</label>
                  <select className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Luxury</option>
                    <option>Normal</option>
                    <option>Budget</option>
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block mb-1 text-sm font-medium text-transparent">Search</label>
                  <button 
                    type="submit"
                    className="w-full px-4 py-2 font-medium text-white transition duration-150 bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    View Rates
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto">
          <h2 className="mb-10 text-2xl font-bold text-center text-blue-600 md:text-3xl">
            Explore Our Attractions
          </h2>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Card 1 */}
            <div className="overflow-hidden transition-transform duration-300 bg-white rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1">
              <img
                src="https://tripjive.com/wp-content/uploads/2024/10/Galle-beach-tourism-1024x585.jpg"
                alt="Beautiful Beaches"
                className="object-cover w-full h-48"
              />
              <div className="p-4 sm:p-5">
                <h3 className="mb-2 text-lg font-semibold text-blue-600">
                  Beautiful Beaches
                </h3>
                <p className="text-gray-600">
                  Relax on the stunning shores of Galle with crystal clear waters and golden sands.
                </p>
              </div>
            </div>
            
            {/* Card 2 */}
            <div className="overflow-hidden transition-transform duration-300 bg-white rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1">
              <img
                src="https://www.travelmapsrilanka.com/destinations/destinationimages/visit-to-galle-fort.jpg"
                alt="Historic Forts"
                className="object-cover w-full h-48"
              />
              <div className="p-4 sm:p-5">
                <h3 className="mb-2 text-lg font-semibold text-blue-600">
                  Historic Forts
                </h3>
                <p className="text-gray-600">
                  Discover the rich history of Galle Fort, a UNESCO World Heritage site with centuries of stories.
                </p>
              </div>
            </div>
            
            {/* Card 3 */}
            <div className="overflow-hidden transition-transform duration-300 bg-white rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1">
              <img
                src="https://media.licdn.com/dms/image/v2/D4D22AQFK8AoyzFGJqA/feedshare-shrink_2048_1536/feedshare-shrink_2048_1536/0/1715534610402?e=2147483647&v=beta&t=B2z2in-u7Z9yRqfzi1AnjNg2KHyBrzNcT7g49_g0Gpk"
                alt="Local Cuisine"
                className="object-cover w-full h-48"
              />
              <div className="p-4 sm:p-5">
                <h3 className="mb-2 text-lg font-semibold text-blue-600">
                  Local Cuisine
                </h3>
                <p className="text-gray-600">
                  Savor delicious dishes from our local chefs featuring fresh seafood and authentic Sri Lankan flavors.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="px-4 py-16 bg-white sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <h2 className="mb-8 text-2xl font-bold text-center text-blue-600 md:text-3xl">
            What Our Guests Say
          </h2>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-6 rounded-lg shadow bg-blue-50">
                <div className="flex items-center mb-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-blue-200 rounded-full">
                    <span className="font-bold text-blue-600">G</span>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-800">Guest {i}</h4>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, j) => (
                        <svg key={j} xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="italic text-gray-600">
                  "An amazing experience at Blue Horizon. The staff was friendly, the rooms were clean and comfortable, and the view was breathtaking."
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="px-4 py-8 text-white bg-gradient-to-r from-blue-600 to-indigo-700 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <h3 className="mb-4 text-xl font-bold">BLUE HORIZON</h3>
              <p className="text-blue-100">
                Experience luxury and comfort on the beautiful shores of Galle, Sri Lanka.
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/" className="text-blue-100 transition-colors hover:text-white">Home</a></li>
                <li><a href="/gallery" className="text-blue-100 transition-colors hover:text-white">Gallery</a></li>
                <li><a href="/aboutus" className="text-blue-100 transition-colors hover:text-white">About Us</a></li>
                <li><a href="/contacts" className="text-blue-100 transition-colors hover:text-white">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold">Contact Us</h3>
              <address className="not-italic text-blue-100">
                <p>123 Beach Road, Galle</p>
                <p>Sri Lanka</p>
                <p className="mt-2">Email: info@bluehorizon.com</p>
                <p>Phone: +94 123 456 789</p>
              </address>
            </div>
          </div>
          <div className="pt-6 mt-8 text-center text-blue-100 border-t border-blue-400">
            <p>© {new Date().getFullYear()} Blue Horizon. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
