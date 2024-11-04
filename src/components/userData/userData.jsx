import axios from "axios";
import React, { useEffect, useState } from "react";

function UserProfile(props) {
  const [name, setName] = useState('');
  const [isChanged, setIsChanged] = useState(false);
  const [image,setImage]=useState('');

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setName('Guest');
    } else {
      axios.get(import.meta.env.VITE_BACKEND_URL + "api/users", {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json"
          },
        })
        .then((res) => {
          console.log(res);  
          setName(res.data.firstname + ' ' + res.data.lastname);
          setImage(res.data.image);   
        })
        .catch((err) => {
          console.log(err);
          console.log(err.response);
        });
    }
  }, [isChanged]);

  return (
    <div className="flex items-center space-x-4 transition-transform duration-300 ease-in-out cursor-pointer hover:scale-105">
      <img className="rounded-full w-[80px] h-[80px] border-2 border-[#E4B1F0] shadow-lg" src={image} alt="User" />
      <h1 className="text-[#FEF9F2] text-[22px] font-semibold">{name}</h1>
    {name === 'Guest' ? (
      <a href="/login" className="bg-[#7E60BF] text-[#FEF9F2] px-4 py-2 rounded hover:bg-[#6A4FA0] transition duration-300" style={{ fontSize: "18px" }}>
        Login
      </a>
    ) : (
      <button
        onClick={() => {
          localStorage.removeItem("token");
          setIsChanged(!isChanged);
        }}
        className="bg-[#7E60BF] text-[#FEF9F2] px-4 py-2 rounded hover:bg-[#6A4FA0] transition duration-300"
        style={{ fontSize: "18px" }}
      >
        Logout
      </button>
    )}
    </div>
  );
}

export default UserProfile;
