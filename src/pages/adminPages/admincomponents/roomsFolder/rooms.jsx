import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Plus, X } from "lucide-react";

export default function Rooms() {
  const [room, setRoom] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newRoom, setNewRoom] = useState({
    RoomId: "",
    category: "",
    maxGuest: 3,
    available: true,
    images: "",
    description: "",
    notes: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token && !isLoaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "api/room/", {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setRoom(res.data.list);
          setIsLoaded(true);
        })
        .catch((err) => {
          toast.error("Failed to fetch rooms.");
        });
    }
  }, [isLoaded, token]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewRoom({
      ...newRoom,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const roomData = {
      ...newRoom,
      images: newRoom.images.split(",").map((url) => url.trim()),
    };

    axios
      .post(import.meta.env.VITE_BACKEND_URL + "api/room/", roomData, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        toast.success("Room created successfully!");
        setShowForm(false);
        setIsLoaded(false); // Refetch rooms
        setNewRoom({
          RoomId: "",
          category: "",
          maxGuest: 3,
          available: true,
          images: "",
          description: "",
          notes: "",
        });
      })
      .catch((err) => {
        toast.error(
          err.response?.data?.message || "Failed to create room."
        );
      });
  };

  if (!token) {
    return (
      <a
        href="/login"
        className="bg-[#7E60BF] text-[#FEF9F2] px-4 py-2 rounded hover:bg-[#6A4FA0] transition duration-300"
        style={{ fontSize: "18px" }}
      >
        Login
      </a>
    );
  }

  return (
    <div className="bg-[#FEF9F2] p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#7E60BF]">Room List</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-[#7E60BF] text-white px-4 py-2 rounded-lg hover:bg-[#6A4FA0] transition duration-300 flex items-center"
        >
          {showForm ? <X className="mr-2" /> : <Plus className="mr-2" />}
          {showForm ? "Cancel" : "Add Room"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6 border border-[#7E60BF]">
          <h2 className="text-2xl font-bold text-[#7E60BF] mb-4">Create New Room</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="RoomId"
              value={newRoom.RoomId}
              onChange={handleInputChange}
              placeholder="Room ID"
              required
              className="p-2 border border-[#E4B1F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7E60BF]"
            />
            <input
              type="text"
              name="category"
              value={newRoom.category}
              onChange={handleInputChange}
              placeholder="Category"
              required
              className="p-2 border border-[#E4B1F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7E60BF]"
            />
            <input
              type="number"
              name="maxGuest"
              value={newRoom.maxGuest}
              onChange={handleInputChange}
              placeholder="Max Guests"
              required
              className="p-2 border border-[#E4B1F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7E60BF]"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                name="available"
                checked={newRoom.available}
                onChange={handleInputChange}
                className="mr-2 h-5 w-5 text-[#7E60BF] focus:ring-[#7E60BF] border-[#E4B1F0] rounded"
              />
              <label htmlFor="available" className="text-[#7E60BF]">Available</label>
            </div>
            <textarea
              name="images"
              value={newRoom.images}
              onChange={handleInputChange}
              placeholder="Image URLs (comma-separated)"
              className="p-2 border border-[#E4B1F0] rounded-lg md:col-span-2 focus:outline-none focus:ring-2 focus:ring-[#7E60BF]"
            />
            <textarea
              name="description"
              value={newRoom.description}
              onChange={handleInputChange}
              placeholder="Description"
              className="p-2 border border-[#E4B1F0] rounded-lg md:col-span-2 focus:outline-none focus:ring-2 focus:ring-[#7E60BF]"
            />
            <textarea
              name="notes"
              value={newRoom.notes}
              onChange={handleInputChange}
              placeholder="Notes"
              className="p-2 border border-[#E4B1F0] rounded-lg md:col-span-2 focus:outline-none focus:ring-2 focus:ring-[#7E60BF]"
            />
            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                className="bg-[#7E60BF] text-white px-6 py-2 rounded-lg hover:bg-[#6A4FA0] transition duration-300"
              >
                Create Room
              </button>
            </div>
          </form>
        </div>
      )}

      <table className="min-w-full bg-white border border-[#7E60BF] shadow-lg rounded-lg">
        <thead>
          <tr className="bg-[#7E60BF] text-white text-lg">
            <th className="py-4 px-6 border-b border-[#E4B1F0]">Room ID</th>
            <th className="py-4 px-6 border-b border-[#E4B1F0]">Category</th>
            <th className="py-4 px-6 border-b border-[#E4B1F0]">Max Guest</th>
            <th className="py-4 px-6 border-b border-[#E4B1F0]">Available</th>
            <th className="py-4 px-6 border-b border-[#E4B1F0]">Images</th>
            <th className="py-4 px-6 border-b border-[#E4B1F0]">Description</th>
            <th className="py-4 px-6 border-b border-[#E4B1F0]">Notes</th>
          </tr>
        </thead>
        <tbody>
          {room.map((room, index) => (
            <tr
              key={index}
              className={`text-[#7E60BF] text-center ${
                index % 2 === 0 ? "bg-[#F7ECFC]" : "bg-[#FEF9F2]"
              }`}
            >
              <td className="py-3 px-5 border-b border-[#E4B1F0]">{room.RoomId}</td>
              <td className="py-3 px-5 border-b border-[#E4B1F0]">{room.category}</td>
              <td className="py-3 px-5 border-b border-[#E4B1F0]">{room.maxGuest}</td>
              <td className="py-3 px-5 border-b border-[#E4B1F0]">
                {room.available ? "Yes" : "No"}
              </td>
              <td className="py-3 px-5 border-b border-[#E4B1F0]">
                {Array.isArray(room.images) ? room.images.join(", ") : room.images}
              </td>
              <td className="py-3 px-5 border-b border-[#E4B1F0]">{room.description}</td>
              <td className="py-3 px-5 border-b border-[#E4B1F0]">{room.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
