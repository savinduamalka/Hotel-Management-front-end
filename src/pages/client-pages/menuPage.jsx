import React, { useEffect, useState, useMemo } from "react";
import axios from "../../config/axiosConfig";
import toast from "react-hot-toast";
import NavBar from "./navBar";
import Footer from "../../components/footer/Footer";
import { Skeleton } from "../../components/ui/skeleton";

const MENU_ENDPOINT = "api/menu";

export default function MenuPage() {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sizeView, setSizeView] = useState("both");

  const fetchMenu = async () => {
    try {
      const res = await axios.get(MENU_ENDPOINT);
      console.log(res)
      const cats = res.data.categories || [];
      setCategories(cats);
      if (cats.length) {
        setActiveCategory(cats[0].name);
      }
    } catch (e) {
      toast.error("Unable to load menu. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const filteredCategories = useMemo(() => {
    if (!search.trim()) {
      return categories;
    }
    return categories
      .map(c => ({
        ...c,
        items: (c.items || []).filter(i =>
          i.name.toLowerCase().includes(search.toLowerCase())
        )
      }))
      .filter(c => c.items.length);
  }, [categories, search]);

  const activeItems = useMemo(() => {
    // First check in filtered categories
    let cat = filteredCategories.find(c => c.name === activeCategory);
    // If not found in filtered, check in original categories (for when search doesn't match the category name)
    if (!cat && activeCategory) {
      cat = categories.find(c => c.name === activeCategory);
      // If found in original but has items that match search, filter them
      if (cat && search.trim()) {
        cat = {
          ...cat,
          items: (cat.items || []).filter(i =>
            i.name.toLowerCase().includes(search.toLowerCase())
          )
        };
      }
    }
    return cat ? cat.items || [] : [];
  }, [filteredCategories, activeCategory, categories, search]);

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden text-slate-800 bg-white">
      {/* Magical Sri Lankan Patterns on Pure White */}
      <div className="absolute inset-0 -z-10">
        {/* Subtle lotus pattern overlay */}
        <div className="absolute inset-0 opacity-[0.015] bg-repeat" style={{backgroundImage: "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"80\" height=\"80\" viewBox=\"0 0 80 80\"><path d=\"M40 20c-11 0-20 9-20 20s9 20 20 20 20-9 20-20-9-20-20-20zm0 35c-8.3 0-15-6.7-15-15s6.7-15 15-15 15 6.7 15 15-6.7 15-15 15z\" fill=\"%23d97706\"/><circle cx=\"40\" cy=\"40\" r=\"3\" fill=\"%23d97706\"/></svg>')"}}></div>
        
        {/* Magical floating elements */}
        <div className="absolute top-20 right-16 w-2 h-2 bg-amber-300 rounded-full animate-pulse opacity-40"></div>
        <div className="absolute top-40 left-20 w-1 h-1 bg-red-400 rounded-full animate-ping opacity-30"></div>
        <div className="absolute bottom-32 right-32 w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce opacity-35"></div>
        <div className="absolute bottom-60 left-16 w-1 h-1 bg-amber-500 rounded-full animate-pulse opacity-25"></div>
        
        {/* Elegant corner decorations */}
        <div className="absolute top-0 left-0 w-32 h-32 opacity-[0.03] bg-gradient-to-br from-amber-500 to-transparent rounded-full blur-xl"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 opacity-[0.03] bg-gradient-to-tl from-red-500 to-transparent rounded-full blur-xl"></div>
      </div>

      <NavBar />

      <main className="flex-1 pb-16 pt-28">
        {/* Hero Section with Traditional Sri Lankan Design */}
        <section className="px-4 mx-auto mb-20 max-w-7xl">
          <div className="relative">
            {/* Decorative Traditional Border */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-amber-500 rounded-full"></div>
            
            <div className="grid items-center gap-12 md:grid-cols-12">
              <div className="space-y-8 md:col-span-7">
                {/* Magical Traditional Badge */}
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-amber-50/80 to-red-50/80 border-2 border-amber-200 rounded-full shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-amber-500 to-red-500 rounded-full relative">
                    <span className="text-xs font-bold text-white">🏺</span>
                    <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-red-400 rounded-full opacity-30 animate-pulse"></div>
                  </div>
                  <span className="text-sm font-bold tracking-wider text-amber-800 uppercase">
                    ශුද්ධ ලාංකික • Authentic Ceylon
                  </span>
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce animation-delay-150"></div>
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce animation-delay-300"></div>
                  </div>
                </div>

                {/* Elegant Title with Traditional Typography */}
                <div className="space-y-4">
                  <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-br from-amber-700 via-red-600 to-orange-700 bg-clip-text text-transparent leading-tight">
                    ශ්‍රී ලංකාවේ<br />
                    <span className="text-4xl md:text-6xl font-light text-slate-700">Culinary Heritage</span>
                  </h1>
                  <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-red-500 rounded-full"></div>
                </div>

                {/* Poetic Description */}
                <div className="space-y-4 max-w-2xl">
                  <p className="text-xl leading-relaxed text-slate-700 font-medium">
                    <span className="text-amber-700 font-semibold">"පරම්පරා ගත රසකතා"</span><br />
                    Where ancient spice routes meet ocean breezes, where cinnamon whispers and cardamom sings.
                  </p>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    From the emerald hills of Kandy to the golden shores of Galle, experience the soul of Ceylon through every bite—curry leaves dancing with coconut milk, chilies kissed by monsoon rains.
                  </p>
                </div>

                {/* Traditional Search & Filter Section */}
                <div className="flex flex-wrap items-center gap-6 pt-4">
                  {/* Magical Search Box */}
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-pink-400 to-red-400 rounded-2xl blur opacity-20 group-hover:opacity-35 transition-all duration-500 animate-pulse"></div>
                    <div className="relative">
                      <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="කෑම සොයන්න • Search delicacies..."
                        className="px-6 py-4 w-80 text-sm font-medium bg-white border-2 border-amber-200 rounded-2xl placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-100/50 transition-all shadow-lg hover:shadow-xl focus:shadow-2xl"
                      />
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                        <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-red-400 rounded-full flex items-center justify-center hover:rotate-12 transition-transform duration-300">
                          <svg width="16" height="16" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                            <circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Magical Size Selector */}
                  <div className="flex items-center bg-white border-2 border-amber-200 rounded-2xl p-2 shadow-xl hover:shadow-2xl transition-all duration-300">
                    <span className="px-3 text-xs font-bold text-amber-700 uppercase tracking-widest flex items-center gap-2">
                      <span className="animate-pulse">✨</span>
                      Size
                    </span>
                    <div className="flex gap-1">
                      {[
                        {val:"both", label:"Both", emoji:"🍽️"},
                        {val:"small", label:"Small", emoji:"🥄"},
                        {val:"large", label:"Large", emoji:"🍲"}
                      ].map(o => (
                        <button
                          key={o.val}
                          type="button"
                          onClick={() => setSizeView(o.val)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-300 flex items-center gap-1 hover:scale-105 ${sizeView===o.val?"bg-gradient-to-r from-amber-400 to-red-400 text-white shadow-lg transform scale-105 animate-pulse":"text-slate-700 hover:bg-gradient-to-r hover:from-amber-50 hover:to-red-50 hover:text-amber-800"}`}
                        >
                          <span className={sizeView===o.val ? "animate-bounce" : ""}>{o.emoji}</span>
                          <span>{o.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Magical Heritage Panel */}
              <div className="hidden md:col-span-5 md:flex">
                <div className="relative w-full overflow-hidden">
                  {/* Enchanted Kandyan Art Panel */}
                  <div className="relative p-8 h-full bg-gradient-to-br from-amber-600 via-red-600 to-orange-700 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
                    {/* Magical Pattern Overlay */}
                    <div className="absolute inset-0 opacity-15">
                      <div className="absolute inset-0" style={{backgroundImage: "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\" viewBox=\"0 0 100 100\"><path d=\"M50 10L60 40L90 40L68 58L78 88L50 70L22 88L32 58L10 40L40 40Z\" fill=\"%23ffffff\"/></svg>')", backgroundSize: '50px 50px'}}></div>
                    </div>
                    
                    {/* Floating magical elements */}
                    <div className="absolute top-4 right-6 w-1 h-1 bg-yellow-300 rounded-full animate-ping"></div>
                    <div className="absolute bottom-8 left-6 w-0.5 h-0.5 bg-pink-300 rounded-full animate-pulse"></div>
                    <div className="absolute top-12 right-12 w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce"></div>
                    
                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col justify-between text-white">
                      <div>
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur">
                            <span className="text-2xl">🌶️</span>
                          </div>
                          <div>
                            <h3 className="text-lg font-bold">මුතු කුමරි</h3>
                            <p className="text-sm opacity-90">Heritage Cuisine</p>
                          </div>
                        </div>
                        
                        <blockquote className="space-y-4">
                          <p className="text-lg leading-relaxed italic">
                            "From the royal kitchens of ancient Kandy to your table—each recipe carries the whispers of monsoon winds and the warmth of traditional hearths."
                          </p>
                          <p className="text-sm opacity-90">
                            Our master chefs honor centuries-old techniques, where curry leaves are toasted until they sing and coconut milk is extracted with reverence.
                          </p>
                        </blockquote>
                      </div>
                      
                      <div className="flex items-center justify-between pt-6 border-t border-white/20">
                        <div className="flex items-center gap-2 bg-white/15 px-4 py-2 rounded-full backdrop-blur">
                          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                          <span className="text-xs font-semibold tracking-wider">Fresh Daily</span>
                        </div>
                        <div className="text-xs opacity-75">Est. 1948</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="px-4 mx-auto max-w-7xl">
          <div className="grid gap-14 md:grid-cols-12">
            {/* Traditional Category Sidebar */}
            <aside className="order-2 md:col-span-3 md:order-1">
              <div className="sticky space-y-8 top-28">
                {/* Magical Category Panel */}
                <div className="relative overflow-hidden bg-white rounded-3xl border-2 border-amber-200 shadow-2xl hover:shadow-3xl transition-all duration-500">
                  {/* Enchanted Border Pattern */}
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-400 via-red-500 to-orange-500"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-orange-500 via-red-500 to-amber-400"></div>
                  
                  {/* Magical sparkles */}
                  <div className="absolute top-4 right-4 w-1 h-1 bg-yellow-400 rounded-full animate-twinkle"></div>
                  <div className="absolute top-8 right-8 w-0.5 h-0.5 bg-pink-400 rounded-full animate-twinkle animation-delay-500"></div>
                  
                  <div className="p-6 space-y-6">
                    {/* Elegant Header */}
                    <div className="text-center space-y-3">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-500 to-red-500 rounded-full shadow-xl">
                        <span className="text-2xl">🍛</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-amber-800">ආහාර වර්ග</h3>
                        <p className="text-sm text-amber-700 opacity-80">Food Categories</p>
                      </div>
                      <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto"></div>
                    </div>

                    {/* Loading State */}
                    {loading && (
                      <div className="space-y-4">
                        {[...Array(6)].map((_, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <Skeleton className="w-12 h-12 rounded-xl bg-amber-200/50" />
                            <div className="flex-1 space-y-2">
                              <Skeleton className="h-4 bg-amber-200/50 rounded" />
                              <Skeleton className="h-3 w-2/3 bg-amber-200/30 rounded" />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* No Results */}
                    {!loading && filteredCategories.length === 0 && (
                      <div className="text-center py-8 space-y-3">
                        <div className="w-16 h-16 mx-auto bg-amber-100 rounded-full flex items-center justify-center">
                          <span className="text-2xl">🔍</span>
                        </div>
                        <p className="text-sm text-amber-700">කිසිවක් හමු නොවීය • No results found</p>
                      </div>
                    )}
                    
                    {/* Category Navigation */}
                    <nav className="space-y-3">
                      {!loading && filteredCategories.map((cat, index) => (
                        <button
                          key={cat.name}
                          onClick={() => setActiveCategory(cat.name)}
                          className={`group w-full relative flex items-center gap-4 p-4 rounded-2xl border-2 text-left font-medium transition-all duration-300 overflow-hidden ${
                            activeCategory === cat.name
                              ? "border-amber-400 bg-gradient-to-r from-amber-50 to-red-50 text-amber-900 shadow-lg transform scale-[1.02]"
                              : "border-amber-200/50 text-slate-700 hover:border-amber-300 hover:bg-amber-50/50 hover:shadow-md"
                          }`}
                        >
                          {/* Decorative Icon */}
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                            activeCategory === cat.name
                              ? "bg-gradient-to-br from-amber-400 to-red-400 text-white shadow-lg"
                              : "bg-amber-100 text-amber-600 group-hover:bg-amber-200"
                          }`}>
                            <span className="text-lg">
                              {index === 0 ? "🍛" : index === 1 ? "🍜" : index === 2 ? "🥘" : index === 3 ? "🍲" : "🥗"}
                            </span>
                          </div>
                          
                          {/* Category Info */}
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-sm truncate">{cat.name}</div>
                            <div className="text-xs opacity-70 mt-1">
                              {cat.items?.length || 0} items
                            </div>
                          </div>
                          
                          {/* Active Indicator */}
                          {activeCategory === cat.name && (
                            <div className="flex flex-col items-center gap-1">
                              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                              <span className="text-[9px] font-bold tracking-widest text-amber-600">ACTIVE</span>
                            </div>
                          )}
                          
                          {/* Hover Arrow */}
                          <div className={`transition-all duration-300 ${
                            activeCategory === cat.name ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                          }`}>
                            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                              <path d="m9 18 6-6-6-6"/>
                            </svg>
                          </div>
                        </button>
                      ))}
                    </nav>
                  </div>
                </div>
              </div>
            </aside>

            {/* Items */}
            <div className="order-1 md:col-span-9 md:order-2">
              {loading && (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="p-4 border rounded-2xl bg-white/70 border-slate-200">
                      <Skeleton className="w-full h-40 mb-4 bg-slate-200" />
                      <Skeleton className="h-6 mb-2 bg-slate-200" />
                      <Skeleton className="h-4 bg-slate-200" />
                    </div>
                  ))}
                </div>
              )}

              {!loading && activeItems.length === 0 && (
                <div className="text-center border shadow-sm p-14 rounded-2xl bg-white/90 border-slate-200">
                  <p className="text-slate-500">No items in this category.</p>
                </div>
              )}

              {!loading && activeItems.length > 0 && (
                <div className="space-y-12">
                  {/* Elegant Section Header */}
                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <h2 className="text-4xl font-bold bg-gradient-to-r from-amber-700 to-red-600 bg-clip-text text-transparent">
                          {activeCategory}
                        </h2>
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-0.5 bg-gradient-to-r from-amber-500 to-red-500"></div>
                          <span className="text-sm font-medium text-amber-700">
                            {activeItems.length} traditional recipe{activeItems.length !== 1 && "s"}
                          </span>
                          <div className="w-12 h-0.5 bg-gradient-to-r from-red-500 to-amber-500"></div>
                        </div>
                      </div>
                      
                      {/* Decorative Element */}
                      <div className="hidden md:flex items-center gap-2 bg-gradient-to-r from-amber-50 to-red-50 border border-amber-200 px-4 py-2 rounded-full">
                        <span className="w-2 h-2 bg-amber-500 rounded-full animate-ping"></span>
                        <span className="text-xs font-semibold text-amber-700 tracking-wider">Fresh Today</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Items Grid */}
                  <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
                    {activeItems.map(item => (
                      <MenuCard key={item.id} item={item} sizeView={sizeView} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function MenuCard({ item, sizeView }) {
  return (
    <div className="group relative overflow-hidden bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-amber-200/50 hover:border-amber-300">
      {/* Magical Top Border Pattern */}
      <div className="absolute inset-x-0 top-0 h-3 bg-gradient-to-r from-amber-400 via-red-500 to-orange-500"></div>
      <div className="absolute top-3 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-300/60 to-transparent"></div>
      
      {/* Magical corner sparkles */}
      <div className="absolute top-2 left-2 w-1 h-1 bg-yellow-400 rounded-full animate-pulse"></div>
      <div className="absolute top-2 right-2 w-0.5 h-0.5 bg-pink-400 rounded-full animate-ping"></div>
      
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <img
          src={item.image || "/vite.svg"}
          alt={item.name}
          className="object-cover w-full h-52 transition-all duration-700 bg-gradient-to-br from-amber-50 to-orange-50 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Trending Badge */}
        {item.hot && (
          <div className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-full shadow-lg backdrop-blur-sm animate-pulse">
            <div className="relative">
              <span className="text-sm">🔥</span>
              <div className="absolute -inset-1 bg-pink-400/40 rounded-full animate-ping"></div>
              <div className="absolute -inset-2 bg-purple-400/20 rounded-full animate-ping animation-delay-75"></div>
            </div>
            <span className="text-xs font-bold tracking-wider">TRENDING</span>
            <div className="flex gap-1">
              <span className="w-1 h-1 bg-yellow-300 rounded-full animate-twinkle"></span>
              <span className="w-1 h-1 bg-yellow-300 rounded-full animate-twinkle animation-delay-150"></span>
              <span className="w-1 h-1 bg-yellow-300 rounded-full animate-twinkle animation-delay-300"></span>
            </div>
          </div>
        )}
        
        {/* Magical Corner Decoration */}
        <div className="absolute top-4 right-4 w-8 h-8 border-2 border-white/80 rounded-full backdrop-blur-sm bg-white/30 flex items-center justify-center group-hover:rotate-180 transition-all duration-500 hover:scale-110">
          <span className="text-amber-600 text-xs animate-pulse">✨</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-5">
        {/* Title */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-slate-800 group-hover:text-amber-700 transition-colors duration-300 leading-tight">
            {item.name}
          </h3>
          <div className="w-16 h-0.5 bg-gradient-to-r from-amber-400 to-red-400 rounded-full"></div>
        </div>

        {/* Pricing with Traditional Sri Lankan Styling */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold text-amber-700 tracking-widest uppercase">මිල • Price</span>
            <div className="flex-1 h-px bg-gradient-to-r from-amber-300 to-transparent"></div>
          </div>
          
          <div className="grid gap-3">
            {(sizeView === "both" || sizeView === "small") && (
              <PricePill 
                label="Small" 
                value={item.smallPrice} 
                accent="from-green-50 via-emerald-50 to-teal-50 border-emerald-300 text-emerald-800" 
                icon="🥄"
              />
            )}
            {(sizeView === "both" || sizeView === "large") && (
              <PricePill 
                label="Large" 
                value={item.largePrice} 
                accent="from-amber-50 via-orange-50 to-red-50 border-amber-300 text-amber-800" 
                icon="🍽️"
              />
            )}
          </div>
        </div>
        
        {/* Magical Footer Decoration */}
        <div className="flex items-center justify-center pt-4 border-t border-amber-100">
          <div className="flex items-center gap-2 text-amber-600 opacity-60 group-hover:opacity-100 transition-all duration-300 hover:scale-105">
            <span className="text-xs animate-bounce">🏺</span>
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
            <span className="text-xs animate-pulse">✨</span>
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
            <span className="text-xs animate-bounce animation-delay-300">🏺</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function PricePill({ label, value, accent, icon }) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r ${accent} border-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}>
      <div className="flex items-center gap-2">
        <span className="text-lg">{icon}</span>
        <span className="text-sm font-bold tracking-wide opacity-80">{label}</span>
      </div>
      <div className="flex-1 text-right">
        <span className="text-lg font-bold">Rs {value}</span>
      </div>
      <div className="w-2 h-2 rounded-full bg-current opacity-30"></div>
    </div>
  );
}
