import React, { useState, useEffect } from "react";
import UserProfile from "../../components/userData/userData";

export default function NavbarDefault({ onLoginClick }) {
  const [openNav, setOpenNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpenNav(false);
      }
    };
    
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact us", path: "/contacts" }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      scrolled 
        ? "bg-gradient-to-r from-blue-500/90 to-indigo-600/90 backdrop-blur-md shadow-md" 
        : "bg-gradient-to-r from-blue-500/40 to-indigo-600/40 backdrop-blur-sm"
    }`}>
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <a href="/" className="text-xl font-bold tracking-wide text-white md:text-2xl">
              BLUE HORIZON
            </a>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex md:items-center md:justify-between">
            <div className="flex items-center ml-10 space-x-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.path}
                  className="px-3 py-2 text-sm font-medium text-white transition-colors duration-150 rounded-md hover:bg-white/20"
                >
                  {link.name}
                </a>
              ))}
              <button className="px-4 py-2 ml-4 text-sm font-medium text-blue-600 transition-colors duration-150 bg-white rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-500">
                Book Now
              </button>
            </div>
            
            {/* UserProfile in desktop nav */}
            <div className="pl-6 ml-6 border-l border-white/30">
              <UserProfile onLoginClick={onLoginClick} />
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            {/* Mobile UserProfile */}
            <div className="mr-2">
              <UserProfile onLoginClick={onLoginClick} />
            </div>
            
            <button
              onClick={() => setOpenNav(!openNav)}
              className="inline-flex items-center justify-center p-2 text-white rounded-md hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded={openNav}
            >
              <span className="sr-only">Open main menu</span>
              {!openNav ? (
                <svg className="block w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {openNav && (
        <div className="md:hidden bg-gradient-to-r from-blue-500/90 to-indigo-600/90 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className="block px-3 py-2 text-base font-medium text-white rounded-md hover:bg-white/20"
              >
                {link.name}
              </a>
            ))}
            <button className="w-full px-4 py-2 mt-2 text-sm font-medium text-blue-600 transition-colors duration-150 bg-white rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-500">
              Book Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
