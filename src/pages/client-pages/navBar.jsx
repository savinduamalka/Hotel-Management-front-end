import React, { useState, useEffect } from "react";
import UserProfile from "../../components/userData/userData";
import BookNow from "../../components/bookNow/bookNow";
import axios from "axios";
import toast from "react-hot-toast";

export default function NavbarDefault({ onLoginClick, onEditProfileClick, refreshKey }) {
  const [openNav, setOpenNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isBookNowOpen, setIsBookNowOpen] = useState(false);

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
    { name: "Contact us", path: "/contacts" },
  ];

  const handleBookNowClick = () => {
    setIsBookNowOpen(true);
    setOpenNav(false); // close mobile nav if open
  };

  const handleBookNowClose = () => {
    setIsBookNowOpen(false);
  };

  const handleBookNowSubmit = (bookingData) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to make a booking.");
      onLoginClick();
      return;
    }

    axios
      .post(import.meta.env.VITE_BACKEND_URL + "api/booking", bookingData, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        toast.success("Booking request sent successfully!");
        handleBookNowClose();
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Failed to send booking request.");
      });
  };

  return (
    <>
      <BookNow
        isOpen={isBookNowOpen}
        onClose={handleBookNowClose}
        onSubmit={handleBookNowSubmit}
      />
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-lg shadow-2xl border-b border-cyan-500/20"
            : "bg-gradient-to-r from-slate-900/60 via-slate-800/60 to-slate-900/60 backdrop-blur-md"
        }`}
      >
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo/Brand */}
            <div className="flex-shrink-0">
              <a
                href="/"
                className="text-xl font-bold tracking-wide md:text-2xl bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent hover:from-cyan-300 hover:via-blue-300 hover:to-purple-300 transition-all duration-300"
              >
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
                    className="group relative px-4 py-2 text-sm font-medium text-slate-200 transition-all duration-300 rounded-lg hover:text-cyan-300"
                  >
                    <span className="relative z-10">{link.name}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 rounded-lg transition-all duration-300"></div>
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-300"></div>
                  </a>
                ))}
                <button
                  className="relative px-6 py-2.5 ml-6 text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg overflow-hidden group hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-300 transform hover:scale-105"
                  onClick={handleBookNowClick}
                >
                  <span className="relative z-10">Book Now</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/20 transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
                </button>
              </div>

              {/* UserProfile in desktop nav */}
              <div className="pl-6 ml-6 border-l border-cyan-500/30">
                <UserProfile onLoginClick={onLoginClick} onEditProfileClick={onEditProfileClick} refreshKey={refreshKey} />
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              {/* Mobile UserProfile */}
              <div className="mr-2">
                <UserProfile onLoginClick={onLoginClick} onEditProfileClick={onEditProfileClick} refreshKey={refreshKey} />
              </div>

              <button
                onClick={() => setOpenNav(!openNav)}
                className="inline-flex items-center justify-center p-2 text-slate-200 rounded-lg hover:bg-cyan-500/20 hover:text-cyan-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-400 transition-all duration-300"
                aria-expanded={openNav}
              >
                <span className="sr-only">Open main menu</span>
                {openNav ? (
                  <svg
                    className="block w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state */}
        {openNav && (
          <div className="md:hidden bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-lg border-t border-cyan-500/20">
            <div className="px-4 pt-4 pb-6 space-y-3 sm:px-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.path}
                  className="group flex items-center px-4 py-3 text-base font-medium text-slate-200 rounded-lg hover:text-cyan-300 hover:bg-cyan-500/10 transition-all duration-300"
                >
                  <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  {link.name}
                </a>
              ))}
              <button
                className="w-full px-6 py-3 mt-4 text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-300 transform hover:scale-105"
                onClick={handleBookNowClick}
              >
                Book Now
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
