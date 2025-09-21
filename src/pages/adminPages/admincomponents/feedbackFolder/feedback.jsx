import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Feedback() {
  const [feedback, setFeedback] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token && !isLoaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "api/feedback")
        .then((res) => {
          setFeedback(res.data.feedbacks);
          setIsLoaded(true);
        })
        .catch((err) => {
          toast.error("Failed to fetch feedback.");
        });
    }
  }, [isLoaded]);

  if (!token) {
    return (
      <Link
        to="/login"
        className="bg-[#7E60BF] text-[#FEF9F2] px-4 py-2 rounded hover:bg-[#6A4FA0] transition duration-300"
        style={{ fontSize: "18px" }}
      >
        Login
      </Link>
    );
  }

  return (
    <div className="bg-[#FEF9F2] p-8">
      <h1 className="text-3xl font-bold text-[#7E60BF] mb-6">User Feedback</h1>
      <table className="min-w-full bg-white border border-[#7E60BF] shadow-lg rounded-lg">
        <thead>
          <tr className="bg-[#7E60BF] text-white text-lg">
            <th className="py-4 px-6 border-b border-[#E4B1F0]">Feedback ID</th>
            <th className="py-4 px-6 border-b border-[#E4B1F0]">Email</th>
            <th className="py-4 px-6 border-b border-[#E4B1F0]">Rating</th>
            <th className="py-4 px-6 border-b border-[#E4B1F0]">Feedback</th>
            <th className="py-4 px-6 border-b border-[#E4B1F0]">Date</th>
            <th className="py-4 px-6 border-b border-[#E4B1F0]">Response</th>
            <th className="py-4 px-6 border-b border-[#E4B1F0]">Visibility</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(feedback) &&
            feedback.map((entry, index) => (
              <tr
                key={entry.feedbackId}
                className={`text-[#7E60BF] text-center ${
                  index % 2 === 0 ? "bg-[#F7ECFC]" : "bg-[#FEF9F2]"
                }`}
              >
                <td className="py-3 px-5 border-b border-[#E4B1F0]">
                  {entry.feedbackId}
                </td>
                <td className="py-3 px-5 border-b border-[#E4B1F0]">
                  {entry.email}
                </td>
                <td className="py-3 px-5 border-b border-[#E4B1F0]">
                  {entry.rating}
                </td>
                <td className="py-3 px-5 border-b border-[#E4B1F0]">
                  {entry.feedback}
                </td>
                <td className="py-3 px-5 border-b border-[#E4B1F0]">
                  {new Date(entry.feedbackDate).toLocaleDateString()}
                </td>
                <td className="py-3 px-5 border-b border-[#E4B1F0]">
                  {entry.response}
                </td>
                <td className="py-3 px-5 border-b border-[#E4B1F0]">
                  {entry.visibility ? "Visible" : "Hidden"}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
