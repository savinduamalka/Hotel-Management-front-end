import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token && !isLoaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "api/users/all", {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setUsers(res.data.users);
          setIsLoaded(true);
        })
        .catch((err) => {
          toast.error(
            err.response?.data?.message || "Failed to fetch users."
          );
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
      <h1 className="text-3xl font-bold text-[#7E60BF] mb-6">User List</h1>
      <table className="min-w-full bg-white border border-[#7E60BF] shadow-lg rounded-lg">
        <thead>
          <tr className="bg-[#7E60BF] text-white text-lg">
            <th className="py-4 px-6 border-b border-[#E4B1F0]">Image</th>
            <th className="py-4 px-6 border-b border-[#E4B1F0]">First Name</th>
            <th className="py-4 px-6 border-b border-[#E4B1F0]">Last Name</th>
            <th className="py-4 px-6 border-b border-[#E4B1F0]">Email</th>
            <th className="py-4 px-6 border-b border-[#E4B1F0]">Type</th>
            <th className="py-4 px-6 border-b border-[#E4B1F0]">WhatsApp</th>
            <th className="py-4 px-6 border-b border-[#E4B1F0]">Email Verified</th>
            <th className="py-4 px-6 border-b border-[#E4B1F0]">Disabled</th>
            <th className="py-4 px-6 border-b border-[#E4B1F0]">Joined Date</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={index}
              className={`text-[#7E60BF] text-center ${
                index % 2 === 0 ? "bg-[#F7ECFC]" : "bg-[#FEF9F2]"
              }`}
            >
              <td className="py-3 px-5 border-b border-[#E4B1F0]">
                <img src={user.image} alt={user.firstname} className="h-10 w-10 rounded-full object-cover mx-auto" />
              </td>
              <td className="py-3 px-5 border-b border-[#E4B1F0]">{user.firstname}</td>
              <td className="py-3 px-5 border-b border-[#E4B1F0]">{user.lastname}</td>
              <td className="py-3 px-5 border-b border-[#E4B1F0]">{user.email}</td>
              <td className="py-3 px-5 border-b border-[#E4B1F0]">{user.type}</td>
              <td className="py-3 px-5 border-b border-[#E4B1F0]">{user.whatsapp}</td>
              <td className="py-3 px-5 border-b border-[#E4B1F0]">{user.emailVerified ? "Yes" : "No"}</td>
              <td className="py-3 px-5 border-b border-[#E4B1F0]">{user.disable ? "Yes" : "No"}</td>
              <td className="py-3 px-5 border-b border-[#E4B1F0]">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
