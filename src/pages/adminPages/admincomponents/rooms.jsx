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
    <div>
      <table>
        <thead>
          <tr>
            <th>Room Id</th>
            <th>Category</th>
            <th>Max Guest</th>
            <th>Available</th>
            <th>Images</th>
            <th>Description</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {room.map((room, index) => (
            <tr key={index}>
              <td>{room.RoomId}</td>
              <td>{room.category}</td>
              <td>{room.maxGuest}</td>
              <td>{room.available ? "Yes" : "No"}</td>
              <td>{room.images}</td>
              <td>{room.description}</td>
              <td>{room.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
