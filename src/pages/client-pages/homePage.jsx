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
          <div className="w-full max-w-5xl mx-auto">
            <div className="relative overflow-hidden shadow-2xl bg-white/10 backdrop-blur-md rounded-3xl border border-white/20">
              {/* Decorative background elements */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-white/20 to-transparent rounded-full -translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-blue-300/30 to-transparent rounded-full translate-x-12 translate-y-12"></div>
              
              <div className="relative z-10 p-8 md:p-10 lg:p-12">
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-light text-white mb-3">
                    Discover Your
                    <span className="block font-bold bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
                      Perfect Escape
                    </span>
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-blue-300 to-white mx-auto rounded-full opacity-80"></div>
                </div>

                <form onSubmit={handleViewRates} className="space-y-6">
                  {/* Input Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                    {/* Check In */}
                    <div className="group">
                      <label className="block text-sm font-medium text-white/90 mb-3 tracking-wide">
                        CHECK IN
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          value={checkIn}
                          onChange={(e) => setCheckIn(e.target.value)}
                          required
                          className="w-full px-4 py-4 bg-white/90 backdrop-blur-sm border-0 rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white transition-all duration-300 text-center font-medium shadow-lg"
                        />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                    </div>

                    {/* Check Out */}
                    <div className="group">
                      <label className="block text-sm font-medium text-white/90 mb-3 tracking-wide">
                        CHECK OUT
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          value={checkOut}
                          onChange={(e) => setCheckOut(e.target.value)}
                          required
                          className="w-full px-4 py-4 bg-white/90 backdrop-blur-sm border-0 rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white transition-all duration-300 text-center font-medium shadow-lg"
                        />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                    </div>

                    {/* Guests */}
                    <div className="group">
                      <label className="block text-sm font-medium text-white/90 mb-3 tracking-wide">
                        GUESTS
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          min="1"
                          placeholder="2"
                          value={guests}
                          onChange={(e) => setGuests(e.target.value)}
                          required
                          className="w-full px-4 py-4 bg-white/90 backdrop-blur-sm border-0 rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white transition-all duration-300 text-center font-medium shadow-lg"
                        />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                    </div>

                    {/* Room Type */}
                    <div className="group">
                      <label className="block text-sm font-medium text-white/90 mb-3 tracking-wide">
                        ROOM TYPE
                      </label>
                      <div className="relative">
                        <select 
                          value={roomType}
                          onChange={(e) => setRoomType(e.target.value)}
                          required
                          className="w-full px-4 py-4 bg-white/90 backdrop-blur-sm border-0 rounded-2xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white transition-all duration-300 text-center font-medium shadow-lg appearance-none cursor-pointer">
                          <option value="" disabled>Choose Type</option>
                          {categories.map((cat, index) => (
                            <option key={cat.categoryId || index} value={cat.name}>{cat.name}</option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                    </div>
                  </div>

                  {/* Search Button */}
                  <div className="flex justify-center pt-4">
                    <button
                      type="submit"
                      className="group relative px-12 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-blue-500/25 focus:outline-none focus:ring-4 focus:ring-white/30 transform hover:scale-105 transition-all duration-300 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                      <span className="relative flex items-center space-x-3">
                        <span className="text-lg tracking-wide">VIEW RATES</span>
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5-5 5M6 12h12" />
                        </svg>
                      </span>
                    </button>
                  </div>
                </form>
                
                {calculatedPrice !== null && (
                  <div className="mt-8 animate-fade-in-up">
                    <div className="relative p-8 overflow-hidden bg-gradient-to-br from-white/95 to-blue-50/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/30">
                      {/* Decorative elements */}
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-400/30 to-transparent rounded-full translate-x-10 -translate-y-10"></div>
                      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-purple-400/30 to-transparent rounded-full -translate-x-8 translate-y-8"></div>
                      
                      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="text-center lg:text-left">
                          <p className="text-sm font-semibold tracking-wider uppercase text-blue-600/80 mb-2">
                            Your Estimated Rate
                          </p>
                          <p className="text-5xl lg:text-6xl font-light text-gray-800 mb-2">
                            <span className="text-2xl font-normal">LKR</span>
                            <span className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ml-2">
                              {calculatedPrice.toLocaleString()}
                            </span>
                          </p>
                          <p className="text-gray-600 font-medium">
                            {nights} night{nights !== 1 ? 's' : ''} • {guests} guest{guests !== 1 ? 's' : ''} • {roomType}
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          <button 
                            onClick={handleBookNowClick}
                            className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl shadow-2xl hover:shadow-blue-500/30 focus:outline-none focus:ring-4 focus:ring-blue-300/50 transform hover:scale-105 transition-all duration-300 overflow-hidden"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                            <span className="relative flex items-center space-x-3 text-lg">
                              <span>BOOK NOW</span>
                              <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                            </span>
                          </button>
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

          {isLoadingFeedbacks ? (
            <div className="flex justify-center space-x-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="p-6 rounded-lg shadow bg-blue-50 w-80">
                  <div className="flex items-center mb-4">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <div className="ml-4 space-y-2">
                      <Skeleton className="h-4 w-36" />
                      <Skeleton className="w-24 h-4" />
                    </div>
                  </div>
                  <Skeleton className="w-full h-4 mt-2" />
                  <Skeleton className="w-full h-4 mt-2" />
                  <Skeleton className="w-2/3 h-4 mt-2" />
                </div>
              ))}
            </div>
          ) : (
            <Marquee pauseOnHover={true} speed={50}>
              <div className="flex">
                {feedbacks.map((feedback) => (
                  <div
                    key={feedback.feedbackId}
                    className="p-6 mr-6 rounded-lg shadow bg-blue-50 w-80" // Fixed width for each card
                  >
                    <div className="flex items-center mb-4">
                      <div className="flex items-center justify-center w-10 h-10 bg-blue-200 rounded-full">
                        <span className="font-bold text-blue-600">
                          {feedback.email.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="ml-4">
                        <h4 className="font-semibold text-gray-800">
                          {feedback.email}
                        </h4>
                        <div className="flex text-yellow-400">
                          {[...Array(feedback.rating)].map((_, j) => (
                            <svg
                              key={j}
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-4 h-4"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="italic text-gray-600">
                      {feedback.feedback}
                    </p>
                  </div>
                ))}
              </div>
            </Marquee>
          )}
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
      `}</style>
    </div>
  );
}
