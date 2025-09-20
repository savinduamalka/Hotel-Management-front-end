import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token && !isLoaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "api/booking", {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setBookings(res.data.bookings);
          setIsLoaded(true);
        })
        .catch((err) => {
          toast.error("Failed to fetch bookings.");
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

  function updateStatus(bookingId) {
  const newStatus = selectedStatus[bookingId] || "Pending";
    
    axios
        .put(
          import.meta.env.VITE_BACKEND_URL + `api/booking/${bookingId}`,
            { status: newStatus },
            {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            }
        )
        .then(() => {
            // Update booking list to reflect the changed status
            setBookings((prevBookings) =>
                prevBookings.map((booking) =>
                    booking.bookingId === bookingId
                        ? { ...booking, status: newStatus }
                        : booking
                )
            );
            setSelectedStatus((prev) => ({ ...prev, [bookingId]: newStatus }));
            toast.success(`Booking ${bookingId} status updated to ${newStatus}.`);
        })
        .catch((err) => {
            toast.error("Failed to update booking status.");
        });
}


  return (
    <div className="bg-[#FEF9F2] p-8">
      <h1 className="text-3xl font-bold text-[#7E60BF] mb-6">Admin Bookings</h1>
      <table className="min-w-full bg-white border border-[#7E60BF] shadow-lg rounded-lg">
        <thead>
          <tr className="bg-[#7E60BF] text-white text-lg">
            <th className="py-4 px-6 border-b border-[#E4B1F0]">Booking ID</th>
            <th className="py-4 px-6 border-b border-[#E4B1F0]">Room ID</th>
            <th className="py-4 px-6 border-b border-[#E4B1F0]">Email</th>
            <th className="py-4 px-6 border-b border-[#E4B1F0]">Start Date</th>
            <th className="py-4 px-6 border-b border-[#E4B1F0]">End Date</th>
            <th className="py-4 px-6 border-b border-[#E4B1F0]">Status</th>
            <th className="py-4 px-6 border-b border-[#E4B1F0]">Reason</th>
            <th className="py-4 px-6 border-b border-[#E4B1F0]">Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(bookings) &&
            bookings.map((booking, index) => (
              <tr
                key={booking.bookingId}
                className={`text-[#7E60BF] text-center ${
                  index % 2 === 0 ? "bg-[#F7ECFC]" : "bg-[#FEF9F2]"
                }`}
              >
                <td className="py-3 px-5 border-b border-[#E4B1F0]">
                  {booking.bookingId}
                </td>
                <td className="py-3 px-5 border-b border-[#E4B1F0]">
                  {booking.roomId}
                </td>
                <td className="py-3 px-5 border-b border-[#E4B1F0]">
                  {booking.email}
                </td>
                <td className="py-3 px-5 border-b border-[#E4B1F0]">
                  {booking.startDate}
                </td>
                <td className="py-3 px-5 border-b border-[#E4B1F0]">
                  {booking.endDate}
                </td>
                <td
                  className={`py-3 px-5 border-b border-[#E4B1F0] ${
                    booking.status === "Confirmed"
                      ? "text-green-600"
                      : booking.status === "Pending"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {booking.status}
                </td>
                <td className="py-3 px-5 border-b border-[#E4B1F0]">
                  {booking.reason}
                </td>
                <td className="py-3 px-5 border-b border-[#E4B1F0]">
                  <select
                    className="p-2 border border-[#E4B1F0] rounded"
                    value={selectedStatus[booking.bookingId] || booking.status}
                    onChange={(e) =>
                      setSelectedStatus((prev) => ({
                        ...prev,
                        [booking.bookingId]: e.target.value,
                      }))
                    >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                  <button
                    onClick={() => updateStatus(booking.bookingId)}
                    className="ml-2 px-3 py-1 bg-[#7E60BF] text-white rounded hover:bg-[#6A4FA0] transition duration-300"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
