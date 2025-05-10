import axios from "axios";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@/ui/skeleton";

// Helper to decode JWT
function decodeJWT(token) {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    return decoded;
  } catch {
    return {};
  }
}

function UserProfile({ onLoginClick }) {
  const [name, setName] = useState('');
  const [isChanged, setIsChanged] = useState(false);
  const [image, setImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoading(true);

    if (!token) {
      setName('Guest');
      setImage('');
      setIsLoading(false);
    } else {
      // decode token for name/email/image
      const decoded = decodeJWT(token);
      const fullName = (decoded.firstName || "") + " " + (decoded.lastName || "");
      setName(fullName.trim() || "User");
      setImage(decoded.image || ""); 

      // fallback: fetch image from backend only if not present in token
      if (!decoded.image) {
        axios.get(import.meta.env.VITE_BACKEND_URL + "api/users", {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json"
          },
        })
        .then((res) => {
          setImage(res.data.image);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem("token");
          setName('Guest');
          setImage('');
          setIsLoading(false);
        });
      } else {
        setIsLoading(false);
      }
    }
  }, [isChanged]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsChanged(!isChanged);
    window.location.href = "/";
  };

  return (
    <div className="flex items-center gap-2">
      {isLoading ? (
        <>
          <Skeleton className="w-8 h-8 rounded-full" />
          <Skeleton className="w-20 h-4 rounded" />
        </>
      ) : (
        <>
          <div className="relative flex-shrink-0">
            {image ? (
              <img 
                className="object-cover w-8 h-8 border-2 rounded-full shadow-sm border-white/70"
                src={image} 
                alt={name || "User"}
              />
            ) : (
              <div className="flex items-center justify-center w-8 h-8 border-2 rounded-full shadow-sm bg-white/20 border-white/70 backdrop-blur-sm">
                <span className="text-sm font-semibold text-white">
                  {name ? name.charAt(0).toUpperCase() : "G"}
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-white">{name || "Guest"}</span>
            {name === 'Guest' ? (
              <button 
                onClick={onLoginClick}
                className="px-2 py-1 text-xs text-blue-600 transition duration-150 bg-white rounded-md shadow-sm hover:bg-blue-50"
              >
                Sign In
              </button>
            ) : (
              <button
                onClick={handleLogout}
                className="px-2 py-1 text-xs text-blue-600 transition duration-150 bg-white rounded-md shadow-sm hover:bg-blue-50"
              >
                Sign Out
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default UserProfile;
