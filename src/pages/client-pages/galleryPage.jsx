import React, { useState } from "react";
import NavbarDefault from "./navBar";
import LoginPage from "../../components/auth/login";
import SignupPage from "../../components/auth/signup";
import SeaAnimations from "../../components/animation/seaAnimations";

const GalleryPage = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const handleLoginClick = () => setIsLoginModalOpen(true);
  const handleLoginClose = () => setIsLoginModalOpen(false);
  const handleSignupClick = () => setIsSignupModalOpen(true);
  const handleSignupClose = () => setIsSignupModalOpen(false);

  const images = [
    {
      src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Luxury hotel pool at dusk",
      title: "Evening Paradise",
      description: "Our stunning pool area, perfect for a relaxing evening.",
    },
    {
      src: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Spacious and modern hotel room with a view",
      title: "Ocean View Suite",
      description: "Wake up to the sound of waves in our luxurious suites.",
    },
    {
      src: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Hotel exterior with palm trees",
      title: "Tropical Getaway",
      description: "Experience the perfect blend of nature and luxury.",
    },
    {
      src: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=1949&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Breakfast served by the pool",
      title: "Dine in Style",
      description: "Enjoy exquisite meals with a breathtaking view.",
    },
    {
      src: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Relaxing beachside cabana",
      title: "Beachside Bliss",
      description: "Unwind and relax in our private beachside cabanas.",
    },
    {
      src: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Hotel lobby with elegant decor",
      title: "Elegant Interiors",
      description: "A grand welcome awaits you in our elegant lobby.",
    },
    {
      src: "https://colorcafe.co.in/frontend/images/blogs/1728562931_6707c6f331796.png",
      alt: "Serene spa and wellness center",
      title: "Ultimate Relaxation",
      description: "Rejuvenate your body and soul at our world-class spa.",
    },
    {
      src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Gourmet dish at the hotel restaurant",
      title: "Gourmet Experiences",
      description: "Indulge in culinary masterpieces crafted by our expert chefs.",
    },
    {
      src: "https://images.stockcake.com/public/9/b/6/9b6f5488-479c-4bd9-a5a6-173f50d3e68c_large/sunset-tropical-beach-stockcake.jpg",
      alt: "Spectacular sunset view from the beach",
      title: "Golden Hour",
      description: "Witness breathtaking sunsets from our pristine beach.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
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

      <main className="flex-1 pt-20">
        <header
          className="relative py-24 bg-center bg-cover"
          style={{ backgroundImage: "url('/bg.jpg')" }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="container relative z-10 mx-auto text-center">
            <h1 className="mb-2 text-4xl font-bold tracking-wide text-white drop-shadow-lg sm:text-5xl md:text-6xl">
              Our Gallery
            </h1>
            <p className="text-lg italic text-blue-100 sm:text-xl drop-shadow">
              A Glimpse into Paradise
            </p>
          </div>
        </header>

        <section className="py-16 sm:py-20">
          <div className="container px-4 mx-auto sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden transition-transform duration-300 ease-in-out bg-white rounded-lg shadow-lg group hover:shadow-2xl hover:-translate-y-2"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="object-cover w-full h-64 transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white transition-opacity duration-500 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100">
                    <h3 className="mb-2 text-xl font-semibold">
                      {image.title}
                    </h3>
                    <p className="text-sm">{image.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="px-4 py-8 text-white bg-gradient-to-r from-blue-600 to-indigo-700 sm:px-6 lg:px-8">
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
                  <a href="/" className="text-blue-100 transition-colors hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/gallery" className="text-blue-100 transition-colors hover:text-white">
                    Gallery
                  </a>
                </li>
                <li>
                  <a href="/contacts" className="text-blue-100 transition-colors hover:text-white">
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
  );
};

export default GalleryPage;
