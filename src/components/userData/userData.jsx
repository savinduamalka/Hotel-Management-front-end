import React from "react";

function UserProfile({ img, name }) {
  return (
    <div className="flex items-center space-x-4 cursor-pointer">
      <img className="rounded-full w-[80px] h-[80px] border-2 border-white shadow-md" src={img} alt="User" />
      <h1 className="text-white text-[20px] font-medium">{name}</h1>
    </div>
  );
}

export default UserProfile;
