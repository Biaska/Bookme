import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar'; // Import your preferred Calendar component
import 'react-calendar/dist/Calendar.css'; // Import CSS for styling

interface BookingDetails {
  date: Date;
  name: string;
  note: string;
}

const BookingCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [name, setName] = useState('');
  const [note, setNote] = useState('');

  const [bookings, setBookings] = useState<BookingDetails[]>([]);

  useEffect(() => {
    const storedBookings = localStorage.getItem('bookings');
    if (storedBookings) {
      setBookings(JSON.parse(storedBookings));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }, [bookings]);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setIsFormVisible(true);
  };

  const handleBookNow = () => {
    if (selectedDate && name) {
      const bookingDetails: BookingDetails = {
        date: selectedDate,
        name,
        note,
      };

      // Store booking details in local storage
      localStorage.setItem('booking', JSON.stringify(bookingDetails));

      alert('Booking successful!'); // Replace with desired success handling
      setIsFormVisible(false);
      setName('');
      setNote('');
    } else {
      alert('Please select a date and enter your name.');
    }
  };

  return (
    <div>
      <Calendar onClickDay={handleDateClick} value={selectedDate} />

      {isFormVisible && selectedDate && (
        <div>
          <h2>Book for {selectedDate.toDateString()}</h2>
          <form>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="note">Note:</label>
              <textarea
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
            <button type="button" onClick={handleBookNow}>
              Book Now
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default BookingCalendar;