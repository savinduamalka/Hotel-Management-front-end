import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Rooms() {
  const [room, setRoom] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token && !isLoaded) {
      axios
        .get("http://localhost:3000/api/room/", {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log(res.data.list);
          setRoom(res.data.list);
          setIsLoaded(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoaded, token]);

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
      <h1 className="text-3xl font-bold text-[#7E60BF] mb-6">Room List</h1>
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
              <td className="py-3 px-5 border-b border-[#E4B1F0]">{room.images}</td>
              <td className="py-3 px-5 border-b border-[#E4B1F0]">{room.description}</td>
              <td className="py-3 px-5 border-b border-[#E4B1F0]">{room.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
