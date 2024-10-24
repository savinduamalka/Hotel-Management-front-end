import React from 'react'

const bookings = [
  {
    bookingId: 'B001',
    roomId: 'R101',
    email: 'john.doe@example.com',
    startDate: '2024-11-01',
    endDate: '2024-11-05',
    status: 'Confirmed',
    reason: 'Vacation',
  },
  {
    bookingId: 'B002',
    roomId: 'R102',
    email: 'jane.smith@example.com',
    startDate: '2024-11-03',
    endDate: '2024-11-07',
    status: 'Pending',
    reason: 'Business',
  },
  {
    bookingId: 'B003',
    roomId: 'R103',
    email: 'robert.brown@example.com',
    startDate: '2024-11-10',
    endDate: '2024-11-15',
    status: 'Cancelled',
    reason: 'Personal',
  },
  {
    bookingId: 'B004',
    roomId: 'R104',
    email: 'linda.white@example.com',
    startDate: '2024-11-05',
    endDate: '2024-11-09',
    status: 'Confirmed',
    reason: 'Wedding',
  },
];

export default function Bookings() {
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
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={index} className={`text-[#7E60BF] text-center ${index % 2 === 0 ? 'bg-[#F7ECFC]' : 'bg-[#FEF9F2]'}`}>
              <td className="py-3 px-5 border-b border-[#E4B1F0]">{booking.bookingId}</td>
              <td className="py-3 px-5 border-b border-[#E4B1F0]">{booking.roomId}</td>
              <td className="py-3 px-5 border-b border-[#E4B1F0]">{booking.email}</td>
              <td className="py-3 px-5 border-b border-[#E4B1F0]">{booking.startDate}</td>
              <td className="py-3 px-5 border-b border-[#E4B1F0]">{booking.endDate}</td>
              <td className={`py-3 px-5 border-b border-[#E4B1F0] ${booking.status === 'Confirmed' ? 'text-green-600' : booking.status === 'Pending' ? 'text-yellow-600' : 'text-red-600'}`}>
                {booking.status}
              </td>
              <td className="py-3 px-5 border-b border-[#E4B1F0]">{booking.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
