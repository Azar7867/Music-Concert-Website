import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import './ConcertCard1.css';

const ConcertCard = ({ concert }) => {
  const navigate = useNavigate();

// const handleBookNow = async () => {
//   try {
//     const bookingData = {
//       artist: concert.artist,
//       venue: concert.venue,
//       date: concert.date,
//       time: concert.time,
//       genre: concert.genre,
//       location: concert.location,
//       image: concert.image ,
//       price: concert.price,
//     };

//     await axios.post('http://localhost:3000/api/bookings', bookingData);

//     Swal.fire({
//       title: 'Booked!',
//       text: `${concert.artist} concert has been added to your bookings.`,
//       icon: 'success',
//       confirmButtonText: 'Go to Booking Page',
//       confirmButtonColor: '#3085d6',
//     }).then((result) => {
//       if (result.isConfirmed) {
//         navigate('/booking');
//       }
//     });
//   } catch (error) {
//     console.error("Error booking concert:", error.response?.data || error.message);
//     Swal.fire({
//       title: 'Error!',
//       text: error.response?.data?.message || 'Something went wrong while booking.',
//       icon: 'error',
//       confirmButtonText: 'Try Again'
//     });
//   }
// };
const handleBookNow = async () => {
  const { value: count } = await Swal.fire({
    title: '🎟️ How many tickets?',
    input: 'number',
    inputLabel: 'Enter number of tickets',
    inputAttributes: { min: 1, max: 10, step: 1 },
    inputValue: 1,
    confirmButtonText: 'Book Tickets',
    showCancelButton: true,
    background: '#f8f9fa'
  });

  if (!count || count < 1) return;

  try {
    const ticketCount = parseInt(count, 10); 
    const totalPrice = concert.price * ticketCount;

    const bookingRes = await axios.post('http://localhost:3000/api/bookings', {
      artist: concert.artist,
      venue: concert.venue,
      date: concert.date,
      time: concert.time,
      location: concert.location,
      price: concert.price,
      image: concert.image || '',
      ticketCount,
      totalPrice
    });

    const newBooking = bookingRes.data;
    await axios.post('http://localhost:3000/api/payments', {
      bookingId: newBooking._id,
      concertTitle: concert.artist,
      amount: totalPrice,
      price: concert.price,
      totalPrice,
      count:ticketCount,
      venue: concert.venue,
      date: concert.date,
      time: concert.time,
      location: concert.location,
      method: '',
      status: 'pending'
    });

    Swal.fire({
      title: 'Booking Confirmed!',
      text: `${concert.artist} concert has been booked successfully.`,
      icon: 'success',
      confirmButtonText: 'Go to Bookings',
      confirmButtonColor: '#3085d6',
      background: '#f0f8ff',
      customClass: { popup: 'rounded shadow' }
    }).then((result) => {
      if (result.isConfirmed) navigate('/booking');
    });

  } catch (error) {
    console.error("Booking failed:", error);
    Swal.fire({
      title: 'Error!',
      text: 'Something went wrong during booking.',
      icon: 'error',
      confirmButtonText: 'Try Again'
    });
  }
};


  return (
    <div className="concert-card card mb-3 shadow-sm">
      <div
  className="card-background"
  style={{
    backgroundImage: `url(${
      concert.image
        ? concert.image.startsWith('/uploads')
          ? `http://localhost:3000${concert.image}`
          : `/images/${concert.image}`
        : 'https://placehold.co/300x180?text=No+Image'
    })`
  }}
/>

      card-background
      <div className="card-body">
        
        <h5 className="card-title">{concert.artist}</h5>
        <p className="card-text"><strong>Venue:</strong> {concert.venue}</p>
        <p className="card-text"><strong>Date & Time:</strong> {concert.date} at {concert.time}</p>
        <p className="card-text"><strong>Genre:</strong> {concert.genre}</p>
        <p className="card-text"><strong>Location:</strong> {concert.location}</p>
        <p className="card-text"><strong>Ticket Price:</strong> {concert.price}</p>
        <p className="card-text text-success"><strong>Available Tickets:</strong> {concert.availableTickets}</p>

        <button className="btn btn-outline-primary mt-3 w-100" onClick={handleBookNow}>
          🎫 Book Now
        </button>
      </div>
    </div>
  );
};

export default ConcertCard;
