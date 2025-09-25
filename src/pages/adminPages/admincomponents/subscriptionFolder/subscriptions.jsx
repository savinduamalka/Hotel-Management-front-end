import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";

export default function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token && !isLoaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "api/subscription/all", {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setSubscriptions(res.data.subscriptions);
          setIsLoaded(true);
        })
        .catch((err) => {
          toast.error(
            err.response?.data?.message || "Failed to fetch subscriptions."
          );
        });
    }
  }, [isLoaded, token]);

  const handleDelete = (email) => {
    if (window.confirm("Are you sure you want to delete this subscription?")) {
      axios
        .delete(import.meta.env.VITE_BACKEND_URL + "api/subscription/delete", {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
          data: { email },
        })
        .then((res) => {
          toast.success(res.data.message || "Subscription deleted successfully!");
          setIsLoaded(false); // Refresh the list
        })
        .catch((err) => {
          toast.error(
            err.response?.data?.message || "Failed to delete subscription."
          );
        });
    }
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
      <h1 className="text-3xl font-bold text-[#7E60BF] mb-6">Email Subscriptions</h1>
      <table className="min-w-full bg-white border border-[#7E60BF] shadow-lg rounded-lg">
        <thead>
          <tr className="bg-[#7E60BF] text-white text-lg">
            <th className="py-4 px-6 border-b border-[#E4B1F0]">Email</th>
            <th className="py-4 px-6 border-b border-[#E4B1F0]">Subscription Date</th>
            <th className="py-4 px-6 border-b border-[#E4B1F0]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((sub, index) => (
            <tr
              key={index}
              className={`text-[#7E60BF] text-center ${
                index % 2 === 0 ? "bg-[#F7ECFC]" : "bg-[#FEF9F2]"
              }`}
            >
              <td className="py-3 px-5 border-b border-[#E4B1F0]">{sub.email}</td>
              <td className="py-3 px-5 border-b border-[#E4B1F0]">
                {new Date(sub.subscriptionDate).toLocaleDateString()}
              </td>
              <td className="py-3 px-5 border-b border-[#E4B1F0]">
                <button
                  onClick={() => handleDelete(sub.email)}
                  className="text-red-500 transition-colors duration-300 hover:text-red-700"
                >
                  <Trash2 size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
