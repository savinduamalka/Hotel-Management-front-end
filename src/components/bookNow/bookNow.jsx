import React, { useState, useRef } from "react";
import { SeaAnimations } from "../animation/seaAnimations";

export default function BookNow({ isOpen, onClose, onSubmit }) {
  const [email, setEmail] = useState("");
  const [roomType, setRoomType] = useState("");
  const [roomId, setRoomId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const modalRef = useRef(null);

  // Mock room data by type (replace with API call in production)
  const roomOptions = {
    Luxury: [101, 102, 103],
    Normal: [201, 202, 203, 204],
    Budget: [301, 302]
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !roomType || !roomId || !startDate || !endDate) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");
    onSubmit && onSubmit({ email, roomType, roomId, startDate, endDate, notes });
    onClose();
    setEmail("");
    setRoomType("");
    setRoomId("");
    setStartDate("");
    setEndDate("");
    setNotes("");
  };

  // Close modal when clicking outside the modal content
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-[2px]"
      onMouseDown={handleBackdropClick}
    >
      {/* Sea animation background */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <SeaAnimations.Waves />
        <SeaAnimations.Bubbles />
      </div>
      <div
        ref={modalRef}
        className="relative z-10 w-full max-w-lg p-0 mx-2 animate-fadeIn"
        style={{
          borderRadius: "2rem",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          background: "rgba(255, 255, 255, 0.25)",
          backdropFilter: "blur(16px) saturate(180%)",
          border: "1.5px solid rgba(255,255,255,0.18)",
          overflow: "hidden"
        }}
        onMouseDown={e => e.stopPropagation()}
      >
        <div className="relative p-8 bg-gradient-to-br from-white/80 to-blue-50/80">
          <button
            className="absolute text-2xl font-bold text-gray-400 transition-colors top-4 right-4 hover:text-blue-600 focus:outline-none"
            onClick={onClose}
            aria-label="Close"
            type="button"
            tabIndex={0}
          >
            &times;
          </button>
          <div className="flex flex-col items-center mb-6">
            <div className="flex items-center justify-center w-16 h-16 mb-2 rounded-full shadow-lg bg-gradient-to-tr from-blue-400 to-indigo-400 animate-float">
              <svg width="36" height="36" fill="none" viewBox="0 0 24 24"><path d="M2 17c0-2.761 4.03-5 9-5s9 2.239 9 5v2H2v-2Z" fill="#fff"/><ellipse cx="12" cy="7" rx="4" ry="5" fill="#3B82F6"/></svg>
            </div>
            <h2 className="mb-1 text-3xl font-extrabold tracking-tight text-center text-blue-700 drop-shadow">Book Your Stay</h2>
            <p className="text-sm font-medium text-center text-blue-500">Experience the luxury of Blue Horizon</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-1 text-sm font-semibold text-blue-700">Email <span className="text-red-500">*</span></label>
              <input
                type="email"
                className="w-full px-4 py-2 text-blue-900 transition border border-blue-200 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-blue-300"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="you@email.com"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-semibold text-blue-700">Room Type <span className="text-red-500">*</span></label>
              <select
                className="w-full px-4 py-2 text-blue-900 transition border border-blue-200 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={roomType}
                onChange={e => {
                  setRoomType(e.target.value);
                  setRoomId(""); // Reset roomId when type changes
                }}
                required
              >
                <option value="">Select a type</option>
                <option value="Luxury">Luxury</option>
                <option value="Normal">Normal</option>
                <option value="Budget">Budget</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 text-sm font-semibold text-blue-700">Room Number <span className="text-red-500">*</span></label>
              <select
                className="w-full px-4 py-2 text-blue-900 transition border border-blue-200 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={roomId}
                onChange={e => setRoomId(e.target.value)}
                required
                disabled={!roomType}
              >
                <option value="">{roomType ? "Select a room" : "Select room type first"}</option>
                {roomType && roomOptions[roomType]?.map(id => (
                  <option key={id} value={id}>{id}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-3">
              <div className="w-1/2">
                <label className="block mb-1 text-sm font-semibold text-blue-700">Check In <span className="text-red-500">*</span></label>
                <input
                  type="date"
                  className="w-full px-4 py-2 text-blue-900 transition border border-blue-200 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                  required
                />
              </div>
              <div className="w-1/2">
                <label className="block mb-1 text-sm font-semibold text-blue-700">Check Out <span className="text-red-500">*</span></label>
                <input
                  type="date"
                  className="w-full px-4 py-2 text-blue-900 transition border border-blue-200 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={endDate}
                  onChange={e => setEndDate(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block mb-1 text-sm font-semibold text-blue-700">Notes</label>
              <textarea
                className="w-full px-4 py-2 text-blue-900 transition border border-blue-200 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                rows={2}
                placeholder="Any special requests?"
              />
            </div>
            {error && <div className="text-sm font-semibold text-center text-red-500">{error}</div>}
            <button
              type="submit"
              className="w-full py-3 text-lg font-bold text-white transition-all shadow-lg bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl hover:from-blue-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Confirm Booking
            </button>
          </form>
        </div>
      </div>
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
