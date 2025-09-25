import React, { useState, useEffect } from "react";
import NavBar from "./navBar";
import LoginPage from "../../components/auth/login";
import SignupPage from "../../components/auth/signup";
import BookNow from "../../components/bookNow/bookNow";
import FeedbackModal from "../../components/feedback/FeedbackModal";
import toast from "react-hot-toast";
import axios from "axios";
import Marquee from "react-fast-marquee";
import { Skeleton } from "../../components/ui/skeleton";
import RoomCarousel from "../../components/rooms/roomCarousel";
import AttractionsSection from "../../components/attractions/attractionsSection";

export default function HomePage() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isBookNowOpen, setIsBookNowOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [roomType, setRoomType] = useState("");
  const [calculatedPrice, setCalculatedPrice] = useState(null);
  const [nights, setNights] = useState(0);
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoadingFeedbacks, setIsLoadingFeedbacks] = useState(true);
  const [categories, setCategories] = useState([]);
  const [galleryItems, setGalleryItems] = useState([]);
  const [isLoadingGallery, setIsLoadingGallery] = useState(true);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "api/feedback/public-visible-feedbacks")
      .then((res) => {
        const visibleFeedbacks = res.data.feedbacks.filter(f => f.visibility);
        setFeedbacks(visibleFeedbacks);
        setIsLoadingFeedbacks(false);
      })
      .catch((err) => {
        toast.error("Could not load testimonials.");
        setIsLoadingFeedbacks(false);
      });

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "api/categories")
      .then((res) => {
        setCategories(res.data.categories);
      })
      .catch((err) => {
        toast.error("Could not load room categories.");
      });

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "api/gallery")
      .then((res) => {
        setGalleryItems(res.data.galleryItems);
        setIsLoadingGallery(false);
      })
      .catch((err) => {
        toast.error("Could not load gallery items.");
        setIsLoadingGallery(false);
      });
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

  const handleBookNowClick = () => {
    setIsBookNowOpen(true);
  };

  const handleBookNowClose = () => {
    setIsBookNowOpen(false);
  };

  const handleFeedbackModalOpen = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to give feedback.");
      handleLoginClick();
      return;
    }
    setIsFeedbackModalOpen(true);
  };

  const handleFeedbackModalClose = () => {
    setIsFeedbackModalOpen(false);
  };

  const handleFeedbackSubmit = (feedbackData) => {
    const token = localStorage.getItem("token");
    axios
      .post(import.meta.env.VITE_BACKEND_URL + "api/feedback", feedbackData, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        toast.success("Thank you for your feedback!");
        handleFeedbackModalClose();
        axios
          .get(import.meta.env.VITE_BACKEND_URL + "api/feedback/public-visible-feedbacks")
          .then((res) => {
            const visibleFeedbacks = res.data.feedbacks.filter(f => f.visibility);
            setFeedbacks(visibleFeedbacks);
          });
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Failed to submit feedback.");
      });
  };

  const handleBookNowSubmit = (bookingData) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to make a booking.");
      handleLoginClick();
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

  const handleViewRates = (e) => {
    e.preventDefault();

    if (!checkIn || !checkOut) {
      alert("Please select check-in and check-out dates.");
      return;
    }

    const date1 = new Date(checkIn);
    const date2 = new Date(checkOut);
    const timeDiff = date2.getTime() - date1.getTime();
    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (dayDiff <= 0) {
      alert("Check-out date must be after check-in date.");
      return;
    }

    setNights(dayDiff);

    const selectedCategory = categories.find(cat => cat.name === roomType);
    const baseRate = selectedCategory ? selectedCategory.price : 0;

    const guestCharge = guests * 2000;
    const total = (baseRate + guestCharge) * dayDiff;

    setCalculatedPrice(total);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Login Modal */}
      <LoginPage
        isOpen={isLoginModalOpen}
        onClose={handleLoginClose}
        onSignupClick={() => {
          setIsLoginModalOpen(false);
          setIsSignupModalOpen(true);
        }}
      />
      {/* Signup Modal */}
      <SignupPage
        isOpen={isSignupModalOpen}
        onClose={handleSignupClose}
        onLoginClick={handleLoginClick}
      />

      {/* Book Now Modal */}
      <BookNow
        isOpen={isBookNowOpen}
        onClose={handleBookNowClose}
        onSubmit={handleBookNowSubmit}
        initialData={{ checkIn, checkOut, guests, roomType }}
        categories={categories}
      />

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={handleFeedbackModalClose}
        onSubmit={handleFeedbackSubmit}
      />

      {/* Navbar */}
      <NavBar onLoginClick={handleLoginClick} />

      {/* Hero Section */}
            {/* Hero Section with Search - Magically Redesigned */}
      <div 
        className="relative min-h-screen pt-16 overflow-hidden bg-center bg-cover md:pt-20"
        style={{ backgroundImage: `url('/bag-home.jpg')` }}
      >
        {/* Dynamic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-blue-900/40 to-purple-900/30"></div>
        
        {/* Floating Animation Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-2 h-2 rounded-full top-1/4 left-10 bg-white/40 animate-pulse"></div>
          <div className="absolute w-1 h-1 delay-1000 rounded-full top-1/3 right-20 bg-blue-300/60 animate-ping"></div>
          <div className="absolute w-3 h-3 rounded-full bottom-1/4 left-1/4 bg-purple-300/30 animate-bounce delay-2000"></div>
          <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-white/50 rounded-full animate-pulse delay-3000"></div>
        </div>

        <div className="container relative z-10 flex flex-col items-center justify-center h-full px-4 py-20 mx-auto sm:px-6">
          {/* Magical Hotel Title */}
          <div className="mb-16 text-center">
            <div className="relative mb-6">
              <h1 className="mb-4 text-5xl font-black leading-tight tracking-wider text-transparent sm:text-6xl md:text-8xl bg-gradient-to-br from-white via-blue-100 to-purple-100 bg-clip-text drop-shadow-2xl animate-fade-in">
                BLUE HORIZON
              </h1>
              {/* Magical Underline */}
              <div className="absolute w-32 h-1 transform -translate-x-1/2 rounded-full -bottom-2 left-1/2 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse"></div>
            </div>
            <p className="text-2xl italic font-light tracking-wide text-blue-100 sm:text-3xl drop-shadow-lg">
              <span className="inline-block animate-fade-in-up">Galle</span>
              <span className="mx-3 text-white/60">•</span>
              <span className="inline-block delay-300 animate-fade-in-up">Sri Lanka</span>
            </p>
          </div>

          {/* Magical Search Card */}
          <div className="w-full max-w-6xl mx-auto">
            <div className="relative group">
              {/* Magical Glow Effect */}
              <div className="absolute inset-0 transition-all duration-700 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 rounded-3xl blur-xl group-hover:blur-2xl"></div>
              
              <div className="relative overflow-hidden transition-all duration-500 border-2 shadow-2xl bg-white/5 backdrop-blur-xl rounded-3xl border-white/10 hover:border-white/20">
                {/* Magical Background Pattern */}
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute top-0 left-0 w-40 h-40 -translate-x-20 -translate-y-20 rounded-full bg-gradient-to-br from-blue-400/30 to-transparent animate-pulse"></div>
                  <div className="absolute right-0 w-32 h-32 delay-1000 translate-x-16 -translate-y-16 rounded-full top-1/2 bg-gradient-to-bl from-purple-400/30 to-transparent animate-pulse"></div>
                  <div className="absolute bottom-0 rounded-full left-1/3 w-28 h-28 translate-y-14 bg-gradient-to-t from-white/20 to-transparent animate-pulse delay-2000"></div>
                </div>
                
                <div className="relative z-10 p-6 md:p-8 lg:p-12">
                  {/* Enchanted Header */}
                  <div className="mb-10 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full shadow-lg bg-gradient-to-br from-blue-500 to-purple-600 animate-bounce">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <h2 className="mb-4 text-4xl tracking-wide text-white font-extralight md:text-5xl">
                      Discover Your
                    </h2>
                    <div className="relative">
                      <span className="text-4xl font-black text-transparent md:text-6xl bg-gradient-to-r from-blue-200 via-white to-purple-200 bg-clip-text animate-pulse">
                        Perfect Escape
                      </span>
                      <div className="absolute w-48 h-1 transform -translate-x-1/2 rounded-full -bottom-3 left-1/2 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse"></div>
                    </div>
                    <p className="mt-6 text-lg font-light tracking-wide text-white/80">
                      Where luxury meets serenity in paradise
                    </p>
                  </div>

                  {/* Magical Form */}
                  <form onSubmit={handleViewRates} className="space-y-8">
                    {/* Enchanted Input Grid */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                      {/* Magical Check In */}
                      <div className="group">
                        <label className="flex items-center mb-4 text-sm font-bold tracking-widest uppercase text-white/90">
                          <svg className="w-4 h-4 mr-2 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Check In
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                            required
                            className="w-full px-6 py-5 font-semibold text-center text-gray-800 transition-all duration-500 border-2 shadow-2xl bg-white/95 backdrop-blur-sm rounded-2xl border-white/30 focus:outline-none focus:ring-4 focus:ring-blue-400/50 focus:border-blue-400 focus:bg-white group-hover:shadow-blue-400/20 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 transition-all duration-500 opacity-0 pointer-events-none rounded-2xl bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-blue-400/10 group-hover:opacity-100 group-hover:animate-pulse"></div>
                        </div>
                      </div>

                      {/* Magical Check Out */}
                      <div className="group">
                        <label className="flex items-center mb-4 text-sm font-bold tracking-widest uppercase text-white/90">
                          <svg className="w-4 h-4 mr-2 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Check Out
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                            required
                            className="w-full px-6 py-5 font-semibold text-center text-gray-800 transition-all duration-500 border-2 shadow-2xl bg-white/95 backdrop-blur-sm rounded-2xl border-white/30 focus:outline-none focus:ring-4 focus:ring-purple-400/50 focus:border-purple-400 focus:bg-white group-hover:shadow-purple-400/20 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 transition-all duration-500 opacity-0 pointer-events-none rounded-2xl bg-gradient-to-r from-purple-400/10 via-blue-400/10 to-purple-400/10 group-hover:opacity-100 group-hover:animate-pulse"></div>
                        </div>
                      </div>

                      {/* Magical Guests */}
                      <div className="group">
                        <label className="flex items-center mb-4 text-sm font-bold tracking-widest uppercase text-white/90">
                          <svg className="w-4 h-4 mr-2 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          Guests
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            min="1"
                            placeholder="2"
                            value={guests}
                            onChange={(e) => setGuests(e.target.value)}
                            required
                            className="w-full px-6 py-5 font-semibold text-center text-gray-800 transition-all duration-500 border-2 shadow-2xl bg-white/95 backdrop-blur-sm rounded-2xl border-white/30 focus:outline-none focus:ring-4 focus:ring-green-400/50 focus:border-green-400 focus:bg-white group-hover:shadow-green-400/20 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 transition-all duration-500 opacity-0 pointer-events-none rounded-2xl bg-gradient-to-r from-green-400/10 via-blue-400/10 to-green-400/10 group-hover:opacity-100 group-hover:animate-pulse"></div>
                        </div>
                      </div>

                      {/* Magical Room Type */}
                      <div className="group">
                        <label className="flex items-center mb-4 text-sm font-bold tracking-widest uppercase text-white/90">
                          <svg className="w-4 h-4 mr-2 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          Room Type
                        </label>
                        <div className="relative">
                          <select 
                            value={roomType}
                            onChange={(e) => setRoomType(e.target.value)}
                            required
                            className="w-full px-6 py-5 font-semibold text-center text-gray-800 transition-all duration-500 border-2 shadow-2xl appearance-none cursor-pointer bg-white/95 backdrop-blur-sm rounded-2xl border-white/30 focus:outline-none focus:ring-4 focus:ring-yellow-400/50 focus:border-yellow-400 focus:bg-white group-hover:shadow-yellow-400/20 group-hover:scale-105">
                            <option value="" disabled>Choose Your Paradise</option>
                            {categories.map((cat, index) => (
                              <option key={cat.categoryId || index} value={cat.name}>{cat.name}</option>
                            ))}
                          </select>
                          <div className="absolute inset-y-0 flex items-center pointer-events-none right-6">
                            <svg className="w-6 h-6 text-gray-600 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                          <div className="absolute inset-0 transition-all duration-500 opacity-0 pointer-events-none rounded-2xl bg-gradient-to-r from-yellow-400/10 via-orange-400/10 to-yellow-400/10 group-hover:opacity-100 group-hover:animate-pulse"></div>
                        </div>
                      </div>
                    </div>

                    {/* Magical Search Button */}
                    <div className="flex justify-center pt-8">
                      <button
                        type="submit"
                        className="relative px-16 py-6 overflow-hidden font-black text-white transition-all duration-500 transform shadow-2xl group bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-3xl hover:shadow-blue-500/50 focus:outline-none focus:ring-4 focus:ring-white/40 hover:scale-110 hover:-translate-y-1"
                      >
                        {/* Magical Shimmer Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                        
                        {/* Magical Particles */}
                        <div className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100">
                          <div className="absolute w-1 h-1 bg-white rounded-full top-2 left-4 animate-ping"></div>
                          <div className="absolute w-1 h-1 delay-300 bg-blue-200 rounded-full bottom-2 right-6 animate-pulse"></div>
                          <div className="absolute top-1/2 left-1/2 w-0.5 h-0.5 bg-purple-200 rounded-full animate-bounce delay-500"></div>
                        </div>
                        
                        <span className="relative flex items-center space-x-4 text-xl tracking-widest">
                          <svg className="w-6 h-6 transition-transform duration-500 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                          <span>DISCOVER RATES</span>
                          <svg className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-2 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5-5 5M6 12h12" />
                          </svg>
                        </span>
                      </button>
                    </div>
                  </form>
                  
                  {/* Magical Pricing Display */}
                  {calculatedPrice !== null && (
                    <div className="mt-12 animate-fade-in-up">
                      <div className="relative group">
                        {/* Magical Glow */}
                        <div className="absolute inset-0 transition-all duration-700 bg-gradient-to-r from-blue-400/30 via-purple-400/30 to-blue-400/30 rounded-3xl blur-xl group-hover:blur-2xl animate-pulse"></div>
                        
                        <div className="relative overflow-hidden border-2 shadow-2xl bg-gradient-to-br from-white/98 via-blue-50/95 to-purple-50/95 backdrop-blur-xl rounded-3xl border-white/40">
                          {/* Magical Background Elements */}
                          <div className="absolute inset-0 overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 translate-x-16 -translate-y-16 rounded-full bg-gradient-to-bl from-blue-400/20 to-transparent animate-pulse"></div>
                            <div className="absolute bottom-0 left-0 w-24 h-24 delay-1000 -translate-x-12 translate-y-12 rounded-full bg-gradient-to-tr from-purple-400/20 to-transparent animate-pulse"></div>
                            <div className="absolute w-40 h-40 transform -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-spin-slow"></div>
                          </div>
                          
                          <div className="relative z-10 p-8 md:p-12">
                            <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
                              {/* Magical Price Display */}
                              <div className="text-center lg:text-left">
                                <div className="flex items-center justify-center mb-4 lg:justify-start">
                                  <div className="flex items-center justify-center w-12 h-12 mr-3 rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-purple-600">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                    </svg>
                                  </div>
                                  <p className="text-lg font-black tracking-widest text-transparent uppercase bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                                    Your Paradise Rate
                                  </p>
                                </div>
                                
                                <div className="mb-4">
                                  <span className="text-2xl font-light text-gray-600">LKR</span>
                                  <span className="ml-3 text-6xl font-black text-transparent lg:text-7xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text animate-pulse">
                                    {calculatedPrice.toLocaleString()}
                                  </span>
                                </div>
                                
                                <div className="flex items-center justify-center space-x-6 text-sm font-semibold text-gray-700 lg:justify-start">
                                  <span className="flex items-center px-3 py-1 bg-blue-100 rounded-full">
                                    <svg className="w-4 h-4 mr-1 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                    {nights} night{nights !== 1 ? 's' : ''}
                                  </span>
                                  <span className="flex items-center px-3 py-1 bg-purple-100 rounded-full">
                                    <svg className="w-4 h-4 mr-1 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    {guests} guest{guests !== 1 ? 's' : ''}
                                  </span>
                                  <span className="flex items-center px-3 py-1 bg-green-100 rounded-full">
                                    <svg className="w-4 h-4 mr-1 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                    {roomType}
                                  </span>
                                </div>
                              </div>
                              
                              {/* Magical Book Button */}
                              <div className="flex-shrink-0">
                                <button 
                                  onClick={handleBookNowClick}
                                  className="relative px-12 py-6 overflow-hidden font-black text-white transition-all duration-500 transform shadow-2xl group bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-3xl hover:shadow-purple-500/50 focus:outline-none focus:ring-4 focus:ring-purple-300/50 hover:scale-110 hover:-translate-y-2"
                                >
                                  {/* Magical Effects */}
                                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                                  
                                  <div className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100">
                                    <div className="absolute w-1 h-1 delay-100 bg-white rounded-full top-2 left-4 animate-ping"></div>
                                    <div className="absolute w-1 h-1 delay-300 bg-blue-200 rounded-full bottom-2 right-4 animate-pulse"></div>
                                    <div className="absolute top-1/2 right-6 w-0.5 h-0.5 bg-purple-200 rounded-full animate-bounce delay-500"></div>
                                  </div>
                                  
                                  <span className="relative flex items-center space-x-4 text-xl tracking-widest">
                                    <svg className="w-6 h-6 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>BOOK YOUR ESCAPE</span>
                                    <svg className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-2 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                  </span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Attractions Section - Completely Redesigned */}
      <AttractionsSection onBookNowClick={handleBookNowClick} />

      {/* Room Carousel Section */}
      <RoomCarousel galleryItems={galleryItems} />

      {/* Magical Testimonials Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        {/* Magical Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating Orbs */}
          <div className="absolute w-32 h-32 rounded-full top-10 left-10 bg-gradient-to-br from-blue-400/20 to-purple-400/10 blur-xl animate-pulse"></div>
          <div className="absolute w-24 h-24 delay-1000 rounded-full top-1/4 right-20 bg-gradient-to-br from-purple-400/15 to-pink-400/5 blur-lg animate-pulse"></div>
          <div className="absolute w-40 h-40 rounded-full bottom-20 left-1/4 bg-gradient-to-br from-indigo-400/10 to-blue-400/5 blur-2xl animate-pulse delay-2000"></div>
          <div className="absolute rounded-full bottom-10 right-10 w-28 h-28 bg-gradient-to-br from-cyan-400/20 to-blue-400/10 blur-xl animate-pulse delay-3000"></div>
          
          {/* Animated Particles */}
          <div className="absolute w-1 h-1 rounded-full top-1/3 left-1/5 bg-white/40 animate-ping"></div>
          <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-blue-300/60 rounded-full animate-pulse delay-500"></div>
          <div className="absolute bottom-1/3 left-1/3 w-0.5 h-0.5 bg-purple-300/50 rounded-full animate-bounce delay-1500"></div>
          <div className="absolute w-1 h-1 rounded-full top-3/4 right-1/6 bg-cyan-300/40 animate-ping delay-2500"></div>
        </div>

        {/* Magical Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="w-full h-full bg-grid-pattern"></div>
        </div>

        <div className="container relative z-10 px-4 mx-auto sm:px-6 lg:px-8">
          {/* Enchanted Header */}
          <div className="mb-16 text-center">
            {/* Magical Icon */}
            <div className="relative inline-flex items-center justify-center mb-8">
              <div className="absolute inset-0 w-20 h-20 rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-lg animate-pulse"></div>
              <div className="relative flex items-center justify-center w-16 h-16 rounded-full shadow-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 animate-bounce">
                <svg className="w-8 h-8 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.745A9.003 9.003 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
            </div>

            {/* Magical Title */}
            <div className="relative">
              <h2 className="mb-6 text-5xl font-black leading-tight tracking-wider text-transparent md:text-6xl lg:text-7xl bg-gradient-to-br from-white via-blue-100 to-purple-100 bg-clip-text animate-fade-in">
                Stories of
              </h2>
              <div className="relative mb-8">
                <span className="text-4xl font-black text-transparent md:text-6xl lg:text-7xl bg-gradient-to-r from-blue-300 via-purple-300 to-cyan-300 bg-clip-text animate-pulse">
                  Magical Escapes
                </span>
                <div className="absolute w-64 h-1 transform -translate-x-1/2 rounded-full -bottom-4 left-1/2 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse"></div>
              </div>
              <p className="text-xl font-light tracking-wide text-blue-200/90">
                Voices from paradise, hearts touched by luxury
              </p>
            </div>
          </div>

          {/* Magical Testimonials Display */}
          {isLoadingFeedbacks ? (
            <div className="flex justify-center space-x-8 overflow-hidden">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="relative group w-96">
                  {/* Loading Card Magical Glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-cyan-400/20 rounded-3xl blur-xl animate-pulse"></div>
                  
                  <div className="relative overflow-hidden border-2 shadow-2xl bg-white/5 backdrop-blur-xl rounded-3xl border-white/10">
                    <div className="p-8">
                      {/* Loading Avatar Section */}
                      <div className="flex items-center mb-6">
                        <div className="relative">
                          <Skeleton className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400/30 to-purple-400/30" />
                          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                        </div>
                        <div className="ml-6 space-y-3">
                          <Skeleton className="w-48 h-5 rounded-full bg-gradient-to-r from-white/20 via-blue-200/30 to-white/20" />
                          <div className="flex space-x-1">
                            {[...Array(5)].map((_, j) => (
                              <Skeleton key={j} className="w-5 h-5 rounded bg-gradient-to-br from-yellow-400/40 to-orange-400/30" />
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {/* Loading Content */}
                      <div className="space-y-3">
                        <Skeleton className="w-full h-4 rounded-full bg-gradient-to-r from-white/15 via-blue-200/25 to-white/15" />
                        <Skeleton className="w-full h-4 rounded-full bg-gradient-to-r from-white/15 via-purple-200/25 to-white/15" />
                        <Skeleton className="w-3/4 h-4 rounded-full bg-gradient-to-r from-white/15 via-cyan-200/25 to-white/15" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="relative">
              {/* Magical Marquee Enhancement */}
              <div className="absolute top-0 bottom-0 left-0 z-20 w-20 pointer-events-none bg-gradient-to-r from-slate-900 to-transparent"></div>
              <div className="absolute top-0 bottom-0 right-0 z-20 w-20 pointer-events-none bg-gradient-to-l from-slate-900 to-transparent"></div>
              
              <Marquee pauseOnHover={true} speed={50} className="overflow-hidden">
                <div className="flex space-x-8">
                  {feedbacks.map((feedback, index) => (
                    <div
                      key={feedback.feedbackId}
                      className="relative transition-all duration-500 transform group w-96 hover:scale-105"
                      style={{ animationDelay: `${index * 200}ms` }}
                    >
                      {/* Magical Card Glow */}
                      <div className="absolute inset-0 transition-all duration-700 opacity-0 bg-gradient-to-r from-blue-400/0 via-purple-400/20 to-cyan-400/0 rounded-3xl blur-xl group-hover:opacity-100 group-hover:blur-2xl"></div>
                      
                      {/* Magical Card */}
                      <div className="relative overflow-hidden transition-all duration-500 border-2 shadow-2xl bg-white/5 backdrop-blur-xl rounded-3xl border-white/10 group-hover:border-white/20">
                        {/* Magical Background Pattern */}
                        <div className="absolute inset-0 opacity-30">
                          <div className="absolute top-0 right-0 w-32 h-32 translate-x-16 -translate-y-16 rounded-full bg-gradient-to-bl from-blue-400/20 to-transparent animate-pulse"></div>
                          <div className="absolute bottom-0 left-0 w-24 h-24 delay-1000 -translate-x-12 translate-y-12 rounded-full bg-gradient-to-tr from-purple-400/15 to-transparent animate-pulse"></div>
                        </div>
                        
                        {/* Magical Shimmer Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1500"></div>
                        
                        <div className="relative z-10 p-8">
                          {/* Enhanced Avatar Section */}
                          <div className="flex items-center mb-6">
                            <div className="relative">
                              {/* Avatar Glow */}
                              <div className="absolute inset-0 w-16 h-16 rounded-full bg-gradient-to-br from-blue-400/40 to-purple-400/40 blur-md animate-pulse"></div>
                              
                              {/* Magical Avatar */}
                              <div className="relative flex items-center justify-center w-16 h-16 border-2 rounded-full shadow-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 border-white/20">
                                <span className="text-2xl font-black text-white drop-shadow-lg">
                                  {feedback.email.charAt(0).toUpperCase()}
                                </span>
                                
                                {/* Magical Ring Animation */}
                                <div className="absolute inset-0 border-2 rounded-full border-white/30 animate-spin-slow"></div>
                              </div>
                              
                              {/* Floating Particles around Avatar */}
                              <div className="absolute w-2 h-2 bg-blue-300 rounded-full -top-1 -right-1 animate-ping"></div>
                              <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-purple-300 rounded-full animate-pulse delay-500"></div>
                            </div>
                            
                            <div className="ml-6">
                              {/* Enhanced Name */}
                              <h4 className="mb-2 text-xl font-bold text-transparent bg-gradient-to-r from-white to-blue-200 bg-clip-text">
                                {feedback.email}
                              </h4>
                              
                              {/* Magical Star Rating */}
                              <div className="flex space-x-1">
                                {[...Array(feedback.rating)].map((_, j) => (
                                  <div key={j} className="relative group/star">
                                    <svg
                                      className="w-6 h-6 text-yellow-400 transition-all duration-300 transform drop-shadow-lg hover:scale-125 hover:rotate-12"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                    >
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    
                                    {/* Magical Star Glow */}
                                    <div className="absolute inset-0 transition-opacity duration-300 rounded-full opacity-0 bg-yellow-400/40 blur-sm group-hover/star:opacity-100"></div>
                                  </div>
                                ))}
                                {/* Empty Stars */}
                                {[...Array(5 - feedback.rating)].map((_, j) => (
                                  <svg
                                    key={j}
                                    className="w-6 h-6 text-gray-400/50"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          {/* Enhanced Feedback Text */}
                          <div className="relative">
                            {/* Quote Icon */}
                            <div className="absolute font-serif text-6xl -top-2 -left-2 text-blue-400/30">"</div>
                            
                            <p className="relative pl-8 pr-4 text-lg italic font-light leading-relaxed text-white/90">
                              {feedback.feedback}
                            </p>
                            
                            {/* Closing Quote */}
                            <div className="absolute font-serif text-6xl transform rotate-180 -bottom-6 -right-2 text-purple-400/30">"</div>
                          </div>
                          
                          {/* Magical Bottom Accent */}
                          <div className="h-1 mt-6 rounded-full bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
                        </div>
                        
                        {/* Magical Floating Elements on Hover */}
                        <div className="absolute inset-0 transition-opacity duration-700 opacity-0 pointer-events-none group-hover:opacity-100">
                          <div className="absolute w-1 h-1 rounded-full top-4 right-6 bg-white/60 animate-ping"></div>
                          <div className="absolute bottom-8 left-8 w-1.5 h-1.5 bg-blue-300/60 rounded-full animate-pulse delay-300"></div>
                          <div className="absolute top-1/2 right-4 w-0.5 h-0.5 bg-purple-300/60 rounded-full animate-bounce delay-600"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Marquee>
            </div>
          )}
        </div>

        {/* Magical Bottom Wave */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent"></div>
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

      {/* Floating Feedback Button */}
      <button
        onClick={handleFeedbackModalOpen}
        className="fixed z-40 flex items-center p-3 text-white transition-all duration-300 bg-blue-600 rounded-full shadow-lg group bottom-8 right-8 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        aria-label="Give Feedback"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.745A9.003 9.003 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <span className="ml-0 overflow-hidden font-semibold transition-all duration-300 max-w-0 whitespace-nowrap group-hover:ml-2 group-hover:max-w-xs">
          Give Feedback
        </span>
      </button>
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }

        /* Magical Scroll Animation */
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        /* Enhanced Glow Effects */
        .glow-blue {
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.5), 0 0 60px rgba(59, 130, 246, 0.3);
        }
        .glow-purple {
          box-shadow: 0 0 20px rgba(147, 51, 234, 0.5), 0 0 60px rgba(147, 51, 234, 0.3);
        }
      `}</style>
    </div>
  );
}
