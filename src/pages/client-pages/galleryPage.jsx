import React, { useState, useEffect } from "react";
import NavbarDefault from "./navBar";
import LoginPage from "../../components/auth/login";
import SignupPage from "../../components/auth/signup";
import SeaAnimations from "../../components/animation/seaAnimations";
import Footer from "../../components/footer/Footer";
import EditProfileModal from "../../components/auth/editProfile";
import { 
  Search, 
  Filter, 
  Grid, 
  Eye, 
  Heart, 
  Share2, 
  Download,
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Camera,
  Play,
  Maximize2,
  Star
} from "lucide-react";

const GalleryPage = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState("masonry");
  const [favorites, setFavorites] = useState(new Set());
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [userUpdateKey, setUserUpdateKey] = useState(0);

  const handleLoginClick = () => setIsLoginModalOpen(true);
  const handleLoginClose = () => setIsLoginModalOpen(false);
  const handleSignupClick = () => setIsSignupModalOpen(true);
  const handleSignupClose = () => setIsSignupModalOpen(false);
  const handleEditProfileClick = () => setIsEditProfileOpen(true);
  const handleProfileUpdate = () => { setIsEditProfileOpen(false); setUserUpdateKey(k => k + 1); };
  const handleCloseModals = () => { setIsLoginModalOpen(false); setIsSignupModalOpen(false); setIsEditProfileOpen(false); };

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  // Curated collection featuring The Fortress Resort & Spa and Galle District
  const galleryImages = [
    // Hotel Exterior & Architecture
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=2049&auto=format&fit=crop&ixlib=rb-4.0.3",
      alt: "Luxury Resort Entrance",
      title: "The Fortress Resort & Spa",
      description: "Majestic entrance showcasing contemporary Sri Lankan architecture in perfect harmony with nature.",
      category: "Hotel Exterior",
      location: "Koggala, Galle",
      photographer: "Blue Horizon Collection",
      isVideo: false,
      aspectRatio: "wide",
      featured: true
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3",
      alt: "Modern Resort Architecture",
      title: "Contemporary Design",
      description: "Stunning architectural details that blend modern luxury with traditional Sri Lankan elements.",
      category: "Hotel Exterior",
      location: "The Fortress Resort",
      photographer: "Design Team",
      isVideo: false,
      aspectRatio: "standard",
      featured: false
    },
    
    // Pool & Spa
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      alt: "Infinity Pool Paradise",
      title: "Infinity Pool Paradise",
      description: "Our stunning infinity pool overlooking the pristine coastline of Koggala Bay.",
      category: "Pool & Spa",
      location: "The Fortress Resort",
      photographer: "Resort Photography",
      isVideo: false,
      aspectRatio: "wide",
      featured: true
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      alt: "Tranquil Spa Pavilion",
      title: "Ayurveda Spa Sanctuary",
      description: "Ancient healing traditions meet modern luxury in our award-winning spa.",
      category: "Pool & Spa",
      location: "The Fortress Spa",
      photographer: "Wellness Team",
      isVideo: false,
      aspectRatio: "portrait",
      featured: true
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      alt: "Luxury Pool Deck",
      title: "Pool Deck Relaxation",
      description: "Unwind on our expansive pool deck with panoramic ocean views.",
      category: "Pool & Spa",
      location: "Pool Area",
      photographer: "Resort Team",
      isVideo: false,
      aspectRatio: "standard",
      featured: false
    },

    // Rooms & Suites
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      alt: "Luxury Suite Ocean View",
      title: "Ocean View Sanctuary",
      description: "Wake up to breathtaking ocean views in our luxuriously appointed suites.",
      category: "Rooms & Suites",
      location: "The Fortress Resort",
      photographer: "Interior Design Team",
      isVideo: false,
      aspectRatio: "wide",
      featured: true
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      alt: "Premium Suite Interior",
      title: "Elegant Suite Design",
      description: "Sophisticated interiors with modern amenities and traditional touches.",
      category: "Rooms & Suites",
      location: "Premium Suites",
      photographer: "Design Studio",
      isVideo: false,
      aspectRatio: "portrait",
      featured: false
    },

    // Dining & Cuisine
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      alt: "Fine Dining Ocean View Restaurant",
      title: "Oceanfront Fine Dining",
      description: "Exquisite culinary experiences with panoramic ocean views at our signature restaurant.",
      category: "Dining & Cuisine",
      location: "The Fortress Resort",
      photographer: "Culinary Team",
      isVideo: false,
      aspectRatio: "wide",
      featured: true
    },
    {
      id: 9,
      src: "https://travelseewrite.com/wp-content/uploads/2023/08/sl-food.jpeg",
      alt: "Sri Lankan Culinary Masterpiece",
      title: "Authentic Sri Lankan Cuisine",
      description: "Traditional Sri Lankan flavors reimagined with contemporary flair.",
      category: "Dining & Cuisine",
      location: "Resort Restaurant",
      photographer: "Food Stylist",
      isVideo: false,
      aspectRatio: "standard",
      featured: false
    },
    {
      id: 10,
      src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3",
      alt: "Beachside Dining",
      title: "Sunset Beach Dining",
      description: "Romantic dining experience with your toes in the sand and waves as your soundtrack.",
      category: "Dining & Cuisine",
      location: "Beach Restaurant",
      photographer: "Evening Team",
      isVideo: false,
      aspectRatio: "wide",
      featured: true
    },

    // Heritage & Culture - Galle Fort
    {
      id: 11,
      src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      alt: "Historic Galle Fort",
      title: "UNESCO World Heritage",
      description: "The magnificent Galle Fort, a testament to centuries of colonial history and architectural brilliance.",
      category: "Heritage & Culture",
      location: "Galle Fort",
      photographer: "Heritage Collection",
      isVideo: false,
      aspectRatio: "wide",
      featured: true
    },
    {
      id: 12,
      src: "https://images.unsplash.com/photo-1544552866-d3ed42536cfd?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3",
      alt: "Traditional Stilt Fishermen",
      title: "Traditional Stilt Fishing",
      description: "Witness the ancient art of stilt fishing, a timeless tradition of Galle's coastal communities.",
      category: "Heritage & Culture",
      location: "Koggala Beach",
      photographer: "Cultural Documentation",
      isVideo: false,
      aspectRatio: "portrait",
      featured: true
    },
    {
      id: 13,
      src: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?q=80&w=2126&auto=format&fit=crop&ixlib=rb-4.0.3",
      alt: "Colonial Architecture",
      title: "Colonial Heritage",
      description: "Beautiful colonial-era buildings that tell the story of Galle's rich history.",
      category: "Heritage & Culture",
      location: "Galle Fort",
      photographer: "Architecture Team",
      isVideo: false,
      aspectRatio: "standard",
      featured: false
    },

    // Beaches & Nature
    {
      id: 14,
      src: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3",
      alt: "Pristine Beach Paradise",
      title: "Unawatuna Beach Bliss",
      description: "Golden sands and turquoise waters at one of Sri Lanka's most beautiful beaches.",
      category: "Beaches & Nature",
      location: "Unawatuna, Galle",
      photographer: "Coastal Collection",
      isVideo: false,
      aspectRatio: "wide",
      featured: true
    },
    {
      id: 15,
      src: "https://images.unsplash.com/photo-1586348943529-beaae6c28db9?q=80&w=2015&auto=format&fit=crop&ixlib=rb-4.0.3",
      alt: "Tropical Garden Oasis",
      title: "Lush Tropical Gardens",
      description: "Immerse yourself in the vibrant flora and fauna of our meticulously maintained gardens.",
      category: "Beaches & Nature",
      location: "Resort Grounds",
      photographer: "Landscape Team",
      isVideo: false,
      aspectRatio: "portrait",
      featured: true
    },
    {
      id: 16,
      src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3",
      alt: "Spectacular Ocean Sunset",
      title: "Golden Hour Magic",
      description: "Experience breathtaking sunsets that paint the sky in shades of gold and crimson.",
      category: "Beaches & Nature",
      location: "Galle Coast",
      photographer: "Sunset Collection",
      isVideo: false,
      aspectRatio: "wide",
      featured: true
    },
    {
      id: 17,
      src: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?q=80&w=2096&auto=format&fit=crop&ixlib=rb-4.0.3",
      alt: "Secluded Beach Walkway",
      title: "Private Beach Access",
      description: "Take romantic walks along our private stretch of pristine beach.",
      category: "Beaches & Nature",
      location: "Private Beach",
      photographer: "Romance Team",
      isVideo: false,
      aspectRatio: "standard",
      featured: false
    },

    // Activities & Adventures
    {
      id: 18,
      src: "https://cdn.ilna.ir/thumbnail/QHrnIG9IRF7e/XWHCw76VBsxziNocTLLHoesUW68OoqO1axxWWNC-1_29u4R4x8JTWBcfKP1V5I-iz9bi4y6If1Y,/-1.jpg",
      alt: "Thrilling Water Sports",
      title: "Ocean Adventures",
      description: "Dive into exciting water sports and marine adventures in the crystal-clear waters.",
      category: "Activities",
      location: "Koggala Bay",
      photographer: "Adventure Team",
      isVideo: false,
      aspectRatio: "wide",
      featured: true
    },
    {
      id: 19,
      src: "https://images.unsplash.com/photo-1588286840104-8957b019727f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      alt: "Peaceful Yoga Session",
      title: "Wellness & Meditation",
      description: "Find your inner peace with yoga and meditation sessions in serene natural settings.",
      category: "Activities",
      location: "Resort Wellness Center",
      photographer: "Mindfulness Team",
      isVideo: false,
      aspectRatio: "portrait",
      featured: true
    },
    {
      id: 20,
      src: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      alt: "Marine Life Discovery",
      title: "Underwater Exploration",
      description: "Discover the vibrant marine life of the Indian Ocean with our certified diving instructors.",
      category: "Activities",
      location: "Diving Center",
      photographer: "Marine Team",
      isVideo: false,
      aspectRatio: "standard",
      featured: false
    }
  ];

  const categories = ["All", "Hotel Exterior", "Rooms & Suites", "Pool & Spa", "Dining & Cuisine", "Heritage & Culture", "Beaches & Nature", "Activities"];

  const filteredImages = galleryImages.filter(image => {
    const matchesCategory = selectedCategory === "All" || image.category === selectedCategory;
    const matchesSearch = image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         image.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         image.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const openLightbox = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const toggleFavorite = (imageId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(imageId)) {
      newFavorites.delete(imageId);
    } else {
      newFavorites.add(imageId);
    }
    setFavorites(newFavorites);
  };

  const nextImage = () => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex]);
  };

  const prevImage = () => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[prevIndex]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <LoginPage
        isOpen={isLoginModalOpen}
        onClose={handleLoginClose}
        onSignupClick={() => { setIsLoginModalOpen(false); setIsSignupModalOpen(true); }}
      />
      <SignupPage
        isOpen={isSignupModalOpen}
        onClose={handleSignupClose}
        onLoginClick={handleLoginClick}
      />
      <NavbarDefault onLoginClick={handleLoginClick} onEditProfileClick={handleEditProfileClick} refreshKey={userUpdateKey} />

      <main className="flex-1 pt-20">
        {/* Magical Hero Section */}
        <section 
          className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-center bg-cover"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=2049&auto=format&fit=crop&ixlib=rb-4.0.3')" 
          }}
        >
          {/* Dynamic Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-blue-900/50 to-purple-900/40"></div>
          
          {/* Floating Animation Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute w-2 h-2 rounded-full top-1/4 left-10 bg-white/40 animate-pulse"></div>
            <div className="absolute w-1 h-1 delay-1000 rounded-full top-1/3 right-20 bg-blue-300/60 animate-ping"></div>
            <div className="absolute w-3 h-3 rounded-full bottom-1/4 left-1/4 bg-purple-300/30 animate-bounce delay-2000"></div>
          </div>

          <div className="container relative z-10 px-4 mx-auto text-center sm:px-6">
            {/* Magical Gallery Title */}
            <div className="mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 mb-8 rounded-full shadow-2xl bg-gradient-to-r from-blue-600 to-purple-600 animate-bounce">
                <Camera className="w-10 h-10 text-white" />
              </div>
              
              <h1 className="mb-6 text-6xl font-black leading-tight tracking-wider text-transparent md:text-7xl lg:text-8xl bg-gradient-to-br from-white via-blue-100 to-purple-100 bg-clip-text drop-shadow-2xl animate-fade-in">
                GALLERY
              </h1>
              
              <div className="relative mb-8">
                <span className="text-3xl font-black text-transparent md:text-4xl lg:text-5xl bg-gradient-to-r from-blue-200 via-white to-purple-200 bg-clip-text animate-pulse">
                  The Fortress Resort & Galle
                </span>
                <div className="absolute w-64 h-1 transform -translate-x-1/2 rounded-full -bottom-3 left-1/2 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse"></div>
              </div>
              
              <p className="max-w-3xl mx-auto text-xl font-light leading-relaxed tracking-wide text-blue-100/90">
                Journey through a visual symphony of luxury, heritage, and natural beauty in Sri Lanka's most enchanting destination
              </p>
            </div>

            {/* Magical Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-16">
              {[
                { number: "20+", label: "Stunning Photos", icon: Camera },
                { number: "7", label: "Categories", icon: Grid },
                { number: "4K", label: "Ultra HD Quality", icon: Eye },
                { number: "24/7", label: "New Captures", icon: Heart }
              ].map((stat, index) => (
                <div key={index} className="relative group">
                  <div className="absolute inset-0 transition-all duration-700 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-xl group-hover:blur-2xl"></div>
                  <div className="relative px-6 py-4 transition-all duration-500 border-2 shadow-2xl bg-white/10 backdrop-blur-xl rounded-2xl border-white/20 group-hover:border-white/30">
                    <stat.icon className="w-6 h-6 mx-auto mb-2 text-blue-200" />
                    <div className="text-2xl font-black text-white">{stat.number}</div>
                    <div className="text-sm font-medium text-blue-200">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Magical Controls Section */}
        <section className="py-12 bg-gradient-to-r from-white via-blue-50/50 to-purple-50/50">
          <div className="container px-4 mx-auto sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              {/* Search & Filter */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                {/* Magical Search */}
                <div className="relative group">
                  <div className="absolute inset-0 transition-all duration-500 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-md group-hover:blur-lg"></div>
                  <div className="relative flex items-center">
                    <Search className="absolute w-5 h-5 text-gray-400 left-4" />
                    <input
                      type="text"
                      placeholder="Search magical moments..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full py-3 pl-12 pr-4 text-gray-800 transition-all duration-300 border-2 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl border-gray-200/50 focus:outline-none focus:ring-4 focus:ring-blue-400/30 focus:border-blue-400 focus:bg-white"
                    />
                  </div>
                </div>

                {/* Category Filter Pills */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                        selectedCategory === category
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                          : 'bg-white/60 text-gray-700 hover:bg-white/80 hover:shadow-md border border-gray-200/50'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-4">
                <div className="flex p-1 border shadow-lg rounded-2xl bg-white/60 backdrop-blur-sm border-gray-200/50">
                  <button
                    onClick={() => setViewMode("masonry")}
                    className={`p-3 rounded-xl transition-all duration-300 ${
                      viewMode === "masonry"
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-3 rounded-xl transition-all duration-300 ${
                      viewMode === "grid"
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    <Filter className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Magical Gallery Grid */}
        <section className="py-16">
          <div className="container px-4 mx-auto sm:px-6 lg:px-8">
            {isLoading ? (
              /* Loading State */
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-cyan-400/20 rounded-3xl blur-xl animate-pulse"></div>
                    <div className="relative overflow-hidden border-2 shadow-2xl bg-white/10 backdrop-blur-xl rounded-3xl border-white/20">
                      <div className={`bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse ${
                        i % 3 === 0 ? 'h-80' : i % 3 === 1 ? 'h-64' : 'h-96'
                      }`}></div>
                      <div className="p-4 space-y-2">
                        <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse"></div>
                        <div className="w-1/2 h-3 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Magical Masonry Gallery */
              <div className={`${
                viewMode === "masonry" 
                  ? "columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6" 
                  : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              }`}>
                {filteredImages.map((image, index) => (
                  <div
                    key={image.id}
                    className={`relative group cursor-pointer transform transition-all duration-500 hover:scale-105 ${
                      viewMode === "masonry" ? "break-inside-avoid mb-6" : ""
                    }`}
                    onClick={() => openLightbox(image)}
                    style={{ 
                      animationDelay: `${index * 100}ms`,
                      ...(viewMode === "grid" && { 
                        height: image.aspectRatio === "portrait" ? "400px" : 
                                image.aspectRatio === "wide" ? "250px" : "300px" 
                      })
                    }}
                  >
                    {/* Magical Glow Effect */}
                    <div className="absolute inset-0 transition-all duration-700 opacity-0 bg-gradient-to-r from-blue-400/0 via-purple-400/30 to-cyan-400/0 rounded-3xl blur-xl group-hover:opacity-100 group-hover:blur-2xl"></div>
                    
                    {/* Image Container */}
                    <div className="relative overflow-hidden transition-all duration-500 bg-white border-2 shadow-2xl rounded-3xl border-white/20 group-hover:border-white/40 group-hover:shadow-3xl">
                      {/* Featured Badge */}
                      {image.featured && (
                        <div className="absolute z-10 px-3 py-1 text-xs font-bold text-white rounded-full shadow-lg top-4 left-4 bg-gradient-to-r from-yellow-500 to-orange-500">
                          <Star className="inline w-3 h-3 mr-1 fill-current" />
                          Featured
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="absolute z-10 flex gap-2 transition-opacity duration-300 opacity-0 top-4 right-4 group-hover:opacity-100">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(image.id);
                          }}
                          className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
                            favorites.has(image.id)
                              ? 'bg-red-500 text-white'
                              : 'bg-white/20 text-white hover:bg-white/30'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${favorites.has(image.id) ? 'fill-current' : ''}`} />
                        </button>
                        <button 
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 text-white transition-all duration-300 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Image */}
                      <div className="relative overflow-hidden">
                        <img
                          src={image.src}
                          alt={image.alt}
                          className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                            viewMode === "masonry" ? "h-auto" : "h-full"
                          }`}
                          loading="lazy"
                        />
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:opacity-100"></div>
                        
                        {/* Hover Content */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white transition-all duration-500 transform translate-y-full group-hover:translate-y-0">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-xl font-bold">{image.title}</h3>
                            <Maximize2 className="w-5 h-5 opacity-75" />
                          </div>
                          <p className="mb-3 text-sm opacity-90 line-clamp-2">{image.description}</p>
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center space-x-2 opacity-75">
                              <MapPin className="w-3 h-3" />
                              <span>{image.location}</span>
                            </div>
                            <div className="flex items-center space-x-2 opacity-75">
                              <Camera className="w-3 h-3" />
                              <span>{image.photographer}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute transition-opacity duration-300 opacity-0 bottom-4 left-4 group-hover:opacity-100">
                        <span className="px-3 py-1 text-xs font-semibold text-white rounded-full bg-gradient-to-r from-blue-600/80 to-purple-600/80 backdrop-blur-sm">
                          {image.category}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No Results State */}
            {!isLoading && filteredImages.length === 0 && (
              <div className="py-20 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-gradient-to-r from-gray-200 to-gray-300">
                  <Search className="w-8 h-8 text-gray-500" />
                </div>
                <h3 className="mb-2 text-2xl font-bold text-gray-800">No images found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Magical Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm">
          <div className="relative flex items-center justify-center w-full h-full mx-4 max-w-7xl">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute z-20 flex items-center justify-center w-12 h-12 text-white transition-all duration-300 rounded-full top-6 right-6 bg-white/10 backdrop-blur-sm hover:bg-white/20"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute z-20 flex items-center justify-center text-white transition-all duration-300 transform -translate-y-1/2 rounded-full left-6 top-1/2 w-14 h-14 bg-white/10 backdrop-blur-sm hover:bg-white/20"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={nextImage}
              className="absolute z-20 flex items-center justify-center text-white transition-all duration-300 transform -translate-y-1/2 rounded-full right-6 top-1/2 w-14 h-14 bg-white/10 backdrop-blur-sm hover:bg-white/20"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Main Image Container */}
            <div className="relative flex items-center justify-center w-full h-full p-20">
              <div className="relative max-w-full max-h-full">
                {/* Image */}
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="object-contain max-w-full max-h-full shadow-2xl rounded-2xl"
                />
                
                {/* Image Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="mb-2 text-2xl font-bold">{selectedImage.title}</h3>
                      <p className="mb-3 text-white/90">{selectedImage.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-white/75">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{selectedImage.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Camera className="w-4 h-4" />
                          <span>{selectedImage.photographer}</span>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-600/60 to-purple-600/60 backdrop-blur-sm">
                          {selectedImage.category}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleFavorite(selectedImage.id)}
                        className={`p-3 rounded-full backdrop-blur-sm transition-all duration-300 ${
                          favorites.has(selectedImage.id)
                            ? 'bg-red-500 text-white'
                            : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${favorites.has(selectedImage.id) ? 'fill-current' : ''}`} />
                      </button>
                      <button className="p-3 text-white transition-all duration-300 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30">
                        <Share2 className="w-5 h-5" />
                      </button>
                      <button className="p-3 text-white transition-all duration-300 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30">
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Thumbnail Navigation */}
            <div className="absolute max-w-2xl transform -translate-x-1/2 bottom-6 left-1/2">
              <div className="flex gap-2 p-4 overflow-x-auto rounded-2xl bg-white/10 backdrop-blur-sm">
                {filteredImages.map((image) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImage(image)}
                    className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden transition-all duration-300 ${
                      selectedImage.id === image.id
                        ? 'ring-2 ring-white scale-110'
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {isEditProfileOpen && (
        <EditProfileModal isOpen={isEditProfileOpen} onClose={handleCloseModals} onUpdate={handleProfileUpdate} />
      )}

      <Footer />

      {/* Magical CSS Styles */}
      <style>{`
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

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Custom scrollbar for thumbnails */
        .overflow-x-auto::-webkit-scrollbar {
          height: 4px;
        }
        
        .overflow-x-auto::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
        }
        
        .overflow-x-auto::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 2px;
        }
        
        .overflow-x-auto::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }

        /* Enhanced shadow for gallery items */
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05);
        }
      `}</style>
    </div>
  );
};

export default GalleryPage;
