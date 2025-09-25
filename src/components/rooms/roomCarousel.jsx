import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, MapPin, Star, Eye } from "lucide-react";

const RoomCarousel = ({ galleryItems }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState([]);
  const [showMore, setShowMore] = useState(false);

  // Group items by type for better organization
  const groupedItems = galleryItems?.reduce((acc, item) => {
    const type = item.description || 'Other';
    if (!acc[type]) acc[type] = [];
    acc[type].push(item);
    return acc;
  }, {}) || {};

  const initialItemsToShow = 12;

  useEffect(() => {
    if (galleryItems) {
      setVisibleItems(showMore ? galleryItems : galleryItems.slice(0, initialItemsToShow));
    }
  }, [galleryItems, showMore]);

  if (!galleryItems || galleryItems.length === 0) {
    return (
      <div className="py-20 text-center">
        <div className="animate-pulse">
          <div className="w-16 h-16 mx-auto mb-4 bg-blue-200 rounded-full"></div>
          <p className="text-gray-500 text-lg">No rooms to display.</p>
        </div>
      </div>
    );
  }

  const openModal = (item, index) => {
    setSelectedImage(item);
    setCurrentIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const navigateImage = (direction) => {
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % galleryItems.length 
      : (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    
    setCurrentIndex(newIndex);
    setSelectedImage(galleryItems[newIndex]);
  };

  const getRoomTypeColor = (type) => {
    const colors = {
      'Standard': 'bg-emerald-500',
      'Deluxe': 'bg-blue-500',
      'Family': 'bg-purple-500',
      'Luxury': 'bg-amber-500',
      'Other': 'bg-gray-500'
    };
    return colors[type] || colors['Other'];
  };

  const getRandomHeight = (index) => {
    const heights = ['h-64', 'h-72', 'h-80', 'h-60'];
    return heights[index % heights.length];
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-400/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-6 shadow-lg">
            <MapPin className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-4">
            Our Exquisite Rooms
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover luxury and comfort in our carefully curated collection of rooms, each designed to provide an unforgettable experience.
          </p>
          <div className="flex justify-center mt-8 space-x-4">
            {Object.keys(groupedItems).map((type) => (
              <span
                key={type}
                className={`px-4 py-2 rounded-full text-white text-sm font-medium ${getRoomTypeColor(type)} shadow-lg`}
              >
                {type} ({groupedItems[type].length})
              </span>
            ))}
          </div>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {visibleItems.map((item, index) => (
            <div
              key={item._id || index}
              className={`break-inside-avoid mb-6 group cursor-pointer transform transition-all duration-700 hover:scale-[1.02] ${getRandomHeight(index)}`}
              onClick={() => openModal(item, galleryItems.findIndex(g => g._id === item._id))}
            >
              <div className="relative h-full bg-white rounded-3xl shadow-xl overflow-hidden border border-white/20 backdrop-blur-sm">
                {/* Image Container */}
                <div className="relative h-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                  
                  {/* Room Type Badge */}
                  <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-white text-xs font-semibold ${getRoomTypeColor(item.description)} shadow-lg`}>
                    {item.description}
                  </div>

                  {/* View Icon */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
                    <Eye className="w-5 h-5 text-white" />
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                      Room {item.name}
                    </h3>
                    <div className="flex items-center space-x-1 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                      <span className="text-white/90 text-sm ml-2">(4.8)</span>
                    </div>
                    <p className="text-white/90 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                      Experience luxury and comfort in our {item.description.toLowerCase()} room with premium amenities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show More/Less Button */}
        {galleryItems.length > initialItemsToShow && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowMore(!showMore)}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              {showMore ? 'Show Less' : `Show ${galleryItems.length - initialItemsToShow} More Rooms`}
            </button>
          </div>
        )}
      </div>

      {/* Image Preview Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 z-10"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={() => navigateImage('prev')}
              className="absolute left-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={() => navigateImage('next')}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Main Image */}
            <div className="relative max-w-5xl max-h-[80vh] w-full">
              <img
                src={selectedImage.image}
                alt={selectedImage.name}
                className="w-full h-full object-contain rounded-2xl shadow-2xl"
              />
              
              {/* Image Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 rounded-b-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-2">
                      Room {selectedImage.name}
                    </h3>
                    <p className="text-white/90 text-lg">
                      {selectedImage.description} Room Experience
                    </p>
                    <div className="flex items-center space-x-1 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                      <span className="text-white/90 ml-2">(4.8) • Premium Location</span>
                    </div>
                  </div>
                  <div className={`px-4 py-2 rounded-full text-white font-semibold ${getRoomTypeColor(selectedImage.description)}`}>
                    {selectedImage.description}
                  </div>
                </div>
              </div>
            </div>

            {/* Image Counter */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white font-medium">
              {currentIndex + 1} / {galleryItems.length}
            </div>
          </div>

          {/* Click outside to close */}
          <div 
            className="absolute inset-0 -z-10" 
            onClick={closeModal}
          ></div>
        </div>
      )}
    </section>
  );
};

export default RoomCarousel;
