import React from 'react';

interface BookingDetails {
  date: Date;
  name: string;
  note: string;
}

const BookingList: React.FC = () => {
  const storedBookings = localStorage.getItem('bookings');
  const bookings: BookingDetails[] = storedBookings
    ? JSON.parse(storedBookings)
    : [];

  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Name</th>
          <th>Note</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((booking) => (
          <tr key={booking.date.getTime()}>
            <td>{booking.date.toDateString()}</td>
            <td>{booking.name}</td>
            <td>{booking.note}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BookingList;