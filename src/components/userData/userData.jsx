import React from "react";

function UserProfile({ img, name }) {
  return (
    <div className="flex items-center space-x-4 transition-transform duration-300 ease-in-out cursor-pointer hover:scale-105">
      <img className="rounded-full w-[80px] h-[80px] border-2 border-[#E4B1F0] shadow-lg" src={img} alt="User" />
      <h1 className="text-[#FEF9F2] text-[22px] font-semibold">{name}</h1>
    </div>
  );
}

export default UserProfile;
