import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Rooms() {
  const [room, setRoom] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token && isLoaded) {
      axios.get("http://localhost:3000/api/rooms", {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      }).then(
        (res)=>{
          console.log(res.data);
          setRoom(res.data.rooms);
          setIsLoaded(true);
        }
      )
      .catch(
        (err)=>{
          console.log(err);
        }
      );
    }
  }, [isLoaded]);

  return <div></div>;
}
