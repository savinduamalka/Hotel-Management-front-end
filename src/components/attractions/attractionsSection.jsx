import React, { useState, useEffect } from "react";
import { 
  MapPin, 
  Clock, 
  Star, 
  ArrowRight, 
  Compass, 
  Camera, 
  Heart,
  Play,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  X
} from "lucide-react";

const AttractionsSection = ({ onBookNowClick }) => {
  const [selectedAttraction, setSelectedAttraction] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Sri Lankan attractions data with local images
  const attractions = [
    {
      id: 1,
      name: "Galle Beach Paradise",
      description: "Crystal clear waters meet golden sands in this breathtaking coastal paradise of Galle",
      longDescription: "Immerse yourself in the serenity of Galle's pristine beaches, where turquoise waters gently lap against golden sands. Perfect for swimming, snorkeling, or simply basking in the tropical Sri Lankan sun.",
      image: "https://tripjive.com/wp-content/uploads/2024/10/Galle-beach-tourism-1024x585.jpg",
      category: "Beach",
      duration: "Full Day",
      distance: "0.5 km",
      rating: 4.9,
      highlights: ["Private Beach Access", "Water Sports", "Sunset Views", "Beach Restaurant"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      name: "Historic Galle Fort",
      description: "Explore the UNESCO World Heritage site with centuries of colonial history",
      longDescription: "Discover the rich history of Galle Fort, a magnificent UNESCO World Heritage site that showcases centuries of Portuguese, Dutch, and British colonial architecture and culture.",
      image: "https://www.travelmapsrilanka.com/destinations/destinationimages/visit-to-galle-fort.jpg",
      category: "Heritage",
      duration: "3-4 Hours",
      distance: "2.0 km",
      rating: 4.8,
      highlights: ["Colonial Architecture", "Museums", "Art Galleries", "Historic Walks"],
      color: "from-amber-500 to-orange-500"
    },
    {
      id: 3,
      name: "Sri Lankan Culinary Journey",
      description: "Savor authentic Sri Lankan flavors and fresh seafood delicacies",
      longDescription: "Embark on a culinary adventure featuring the finest Sri Lankan cuisine, fresh seafood, and traditional cooking methods passed down through generations.",
      image: "https://media.licdn.com/dms/image/v2/D4D22AQFK8AoyzFGJqA/feedshare-shrink_2048_1536/feedshare-shrink_2048_1536/0/1715534610402?e=2147483647&v=beta&t=B2z2in-u7Z9yRqfzi1AnjNg2KHyBrzNcT7g49_g0Gpk",
      category: "Cuisine",
      duration: "2-3 Hours",
      distance: "On-site",
      rating: 4.9,
      highlights: ["Local Spices", "Seafood Specialties", "Cooking Classes", "Cultural Dining"],
      color: "from-red-500 to-pink-500"
    },
    {
      id: 4,
      name: "Tropical Rainforest Adventures",
      description: "Explore lush greenery and discover hidden waterfalls in Sri Lanka's nature",
      longDescription: "Journey through Sri Lanka's magnificent rainforests, where exotic wildlife, cascading waterfalls, and ancient trees create an unforgettable natural experience.",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
      category: "Nature",
      duration: "5-6 Hours",
      distance: "15 km",
      rating: 4.7,
      highlights: ["Wildlife Spotting", "Waterfall Swimming", "Jungle Trekking", "Bird Watching"],
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 5,
      name: "Ayurvedic Wellness Sanctuary",
      description: "Experience ancient Sri Lankan healing traditions and wellness therapies",
      longDescription: "Rejuvenate your mind and body with authentic Ayurvedic treatments, featuring traditional Sri Lankan herbs and ancient healing techniques in our serene spa.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      category: "Wellness",
      duration: "2-4 Hours",
      distance: "On-site",
      rating: 4.8,
      highlights: ["Ayurvedic Massage", "Herbal Treatments", "Meditation Sessions", "Yoga Classes"],
      color: "from-purple-500 to-indigo-500"
    },
    {
      id: 6,
      name: "Scenic Coastal Drives",
      description: "Breathtaking coastal views along Sri Lanka's stunning southern coastline",
      longDescription: "Experience magnificent panoramic views of the Indian Ocean as you journey along Sri Lanka's most beautiful coastal roads and scenic viewpoints.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      category: "Adventure",
      duration: "Half Day",
      distance: "Variable",
      rating: 4.9,
      highlights: ["Ocean Views", "Photography Spots", "Sunset Points", "Coastal Towns"],
      color: "from-blue-600 to-teal-500"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % attractions.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, attractions.length]);

  const openModal = (attraction) => {
    setSelectedAttraction(attraction);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedAttraction(null);
    document.body.style.overflow = 'auto';
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % attractions.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + attractions.length) % attractions.length);
    setIsAutoPlaying(false);
  };

  const handleBooking = () => {
    if (onBookNowClick) {
      onBookNowClick();
    } else {
      alert("Booking feature coming soon! Please contact us directly for reservations.");
    }
  };

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 rounded-full left-1/4 w-72 h-72 bg-blue-500/10 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 delay-1000 rounded-full right-1/4 w-96 h-96 bg-purple-500/10 blur-3xl animate-pulse"></div>
        <div className="absolute left-0 w-64 h-64 rounded-full top-1/2 bg-green-500/10 blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="container relative z-10 px-4 mx-auto sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-20 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 mb-8 rounded-full shadow-2xl bg-gradient-to-r from-blue-600 to-purple-600">
            <Compass className="w-10 h-10 text-white animate-spin-slow" />
          </div>
          <h2 className="mb-6 text-6xl font-extrabold text-transparent lg:text-7xl bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text">
            Explore Our Attractions
          </h2>
          <p className="max-w-3xl mx-auto mb-8 text-xl leading-relaxed text-gray-300">
            Discover a world of extraordinary experiences waiting just beyond your doorstep. 
            From pristine beaches to cultural adventures, every moment is crafted for wonder.
          </p>
          
          {/* Category Pills */}
          <div className="flex flex-wrap justify-center gap-4 mt-12">
            {['Beach', 'Heritage', 'Cuisine', 'Nature', 'Wellness', 'Adventure'].map((category, index) => (
              <span
                key={category}
                className="px-6 py-3 font-medium text-white transition-all duration-300 border rounded-full cursor-pointer bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {category}
              </span>
            ))}
          </div>
        </div>

        {/* Hero Carousel */}
        <div className="relative mb-20">
          <div className="relative h-[70vh] rounded-3xl overflow-hidden shadow-2xl">
            {attractions.map((attraction, index) => (
              <div
                key={attraction.id}
                className={`absolute inset-0 transition-all duration-1000 ${
                  index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                }`}
              >
                <img
                  src={attraction.image}
                  alt={attraction.name}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-12">
                  <div className="max-w-2xl">
                    <span className={`inline-block px-4 py-2 rounded-full text-white text-sm font-semibold mb-4 bg-gradient-to-r ${attraction.color} shadow-lg`}>
                      {attraction.category}
                    </span>
                    <h3 className="mb-4 text-5xl font-bold text-white drop-shadow-lg">
                      {attraction.name}
                    </h3>
                    <p className="mb-6 text-xl leading-relaxed text-white/90">
                      {attraction.description}
                    </p>
                    <div className="flex items-center mb-8 space-x-6 text-white/80">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-5 h-5" />
                        <span>{attraction.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-5 h-5" />
                        <span>{attraction.distance}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span>{attraction.rating}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => openModal(attraction)}
                      className="inline-flex items-center px-8 py-4 font-semibold text-gray-900 transition-all duration-300 transform bg-white rounded-full shadow-xl hover:bg-gray-100 hover:scale-105"
                    >
                      Explore Details
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute z-10 flex items-center justify-center text-white transition-all duration-300 transform -translate-y-1/2 rounded-full left-6 top-1/2 w-14 h-14 bg-white/20 backdrop-blur-sm hover:bg-white/30"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute z-10 flex items-center justify-center text-white transition-all duration-300 transform -translate-y-1/2 rounded-full right-6 top-1/2 w-14 h-14 bg-white/20 backdrop-blur-sm hover:bg-white/30"
            >
              <ChevronRight className="w-7 h-7" />
            </button>

            {/* Slide Indicators */}
            <div className="absolute flex space-x-3 transform -translate-x-1/2 bottom-6 left-1/2">
              {attractions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentSlide(index);
                    setIsAutoPlaying(false);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>

            {/* Play/Pause Button */}
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="absolute flex items-center justify-center w-12 h-12 text-white transition-all duration-300 rounded-full top-6 right-6 bg-white/20 backdrop-blur-sm hover:bg-white/30"
            >
              <Play className={`w-5 h-5 ${isAutoPlaying ? 'opacity-50' : 'opacity-100'}`} />
            </button>
          </div>
        </div>

        {/* Attraction Grid */}
        <div className="grid grid-cols-1 gap-8 mb-16 md:grid-cols-2 lg:grid-cols-3">
          {attractions.map((attraction, index) => (
            <div
              key={attraction.id}
              className="transition-all duration-500 transform cursor-pointer group hover:scale-105"
              onClick={() => openModal(attraction)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden shadow-xl h-80 rounded-2xl">
                <img
                  src={attraction.image}
                  alt={attraction.name}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 transition-opacity duration-300 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90"></div>
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className={`inline-block px-3 py-1 rounded-full text-white text-xs font-semibold mb-3 bg-gradient-to-r ${attraction.color}`}>
                    {attraction.category}
                  </span>
                  <h4 className="mb-2 text-xl font-bold text-white">{attraction.name}</h4>
                  <p className="mb-3 text-sm text-white/90">{attraction.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-white/70">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{attraction.duration}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span>{attraction.rating}</span>
                      </span>
                    </div>
                    <div className="flex items-center justify-center w-8 h-8 transition-all duration-300 transform rounded-full opacity-0 bg-white/20 backdrop-blur-sm group-hover:opacity-100 group-hover:scale-110">
                      <ExternalLink className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h3 className="mb-6 text-3xl font-bold text-white">Ready to Book Your Adventure?</h3>
          <p className="max-w-2xl mx-auto mb-8 text-gray-300">
            Reserve your spot for these incredible experiences and create unforgettable memories in Sri Lanka.
          </p>
          <button onClick={handleBooking} className="inline-flex items-center px-10 py-5 font-semibold text-white transition-all duration-300 transform rounded-full shadow-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-blue-500/25 hover:scale-105">
            <Heart className="w-6 h-6 mr-3" />
            Book Now
          </button>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedAttraction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm">
          <div className="relative max-w-4xl max-h-[90vh] w-full mx-4 bg-white rounded-3xl overflow-hidden shadow-2xl">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute z-10 flex items-center justify-center w-12 h-12 text-white transition-all duration-300 rounded-full top-6 right-6 bg-black/20 backdrop-blur-sm hover:bg-black/30"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Image Header */}
            <div className="relative h-80">
              <img
                src={selectedAttraction.image}
                alt={selectedAttraction.name}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <span className={`inline-block px-4 py-2 rounded-full text-white text-sm font-semibold mb-3 bg-gradient-to-r ${selectedAttraction.color}`}>
                  {selectedAttraction.category}
                </span>
                <h3 className="text-4xl font-bold text-white">{selectedAttraction.name}</h3>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="flex items-center mb-6 space-x-6 text-gray-600">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>{selectedAttraction.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span>{selectedAttraction.distance}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span>{selectedAttraction.rating} (Excellent)</span>
                </div>
              </div>

              <p className="mb-8 text-lg leading-relaxed text-gray-700">
                {selectedAttraction.longDescription}
              </p>

              <div className="mb-8">
                <h4 className="mb-4 text-xl font-bold text-gray-900">Experience Highlights</h4>
                <div className="grid grid-cols-2 gap-4">
                  {selectedAttraction.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${selectedAttraction.color}`}></div>
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4">
                <button className={`flex-1 py-4 bg-gradient-to-r ${selectedAttraction.color} text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300`}>
                  Book Experience
                </button>
                <button className="px-8 py-4 font-semibold text-gray-700 transition-all duration-300 border-2 border-gray-300 rounded-xl hover:border-gray-400">
                  Learn More
                </button>
              </div>
            </div>
          </div>

          {/* Click outside to close */}
          <div className="absolute inset-0 -z-10" onClick={closeModal}></div>
        </div>
      )}
    </section>
  );
};

export default AttractionsSection;
