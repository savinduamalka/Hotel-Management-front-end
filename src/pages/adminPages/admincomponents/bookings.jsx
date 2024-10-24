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
    <div>
      <h1 className='text-lg'>Admin Bookings</h1>
      <table>
        <thead>
          <th>BookingId</th>
          <th>RoomId</th>
          <th>Email</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Status</th>
          <th>Reason</th>
        </thead>
        <tbody>
        {
          bookings.map(
            (bookings,index)=>{
              return(
                <tr key={index}>
                  <td>{bookings.bookingId}</td>
                  <td>{bookings.email}</td>
                  <td>{bookings.roomId}</td>
                  <td>{bookings.startDate}</td>
                  <td>{bookings.endDate}</td>
                  <td>{bookings.status}</td>
                  <td>{bookings.reason}</td>
                </tr>
              )
            }
          )
        }
        </tbody>
      </table>
    </div>
  )
}
