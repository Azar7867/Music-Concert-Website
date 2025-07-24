// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './ConcertCard.css'
// const ConcertCard = ({ concert }) => {
//   return (
//     <div className="card h-100 shadow-sm">
//       {/* Show concert image */}
//       {concert.image && (
//         <img
//           src={concert.image}
//           alt={concert.artist}
//           className="card-img-top"
//           style={{ height: '180px', objectFit: 'cover' }}
//         />
//       )}
//       <div className="card-body d-flex flex-column justify-content-between">
//         <div>
//           <h5 className="card-title">{concert.artist}</h5>
//           <p className="card-text"><strong>venue:</strong> {concert.venue}</p>
//           <p className="card-text"><strong>Date:</strong> {concert.date}</p>
//           <p className="card-text"><strong>Time:</strong> {concert.time}</p>
//           <p className="card-text"><strong>Location:</strong> {concert.location}</p>
//         </div>
//         <div>
//           <p className="card-text text-success fw-bold mt-2">₹{concert.price}</p>
//           <button className="btn btn-outline-primary btn-sm w-100 mt-2">Book Now</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ConcertCard;

// import React from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './ConcertCard.css';

// const ConcertCard = ({ concert }) => {
//   const navigate = useNavigate();

//   const handleBookNow = async () => {
//     try {
//       await axios.post('http://localhost:3000/bookings', concert);

//       // 🎨 SweetAlert2 popup
//       Swal.fire({
//         title: 'Booking Confirmed!',
//         text: `${concert.artist} concert has been booked successfully.`,
//         icon: 'success',
//         confirmButtonText: 'Go to Bookings',
//         confirmButtonColor: '#3085d6',
//         background: '#f0f8ff',
//         customClass: {
//           popup: 'rounded shadow'
//         }
//       }).then((result) => {
//         if (result.isConfirmed) {
//           navigate('/booking');
//         }
//       });

//     } catch (error) {
//       console.error("Booking failed:", error);
//       Swal.fire({
//         title: 'Error!',
//         text: 'Something went wrong during booking.',
//         icon: 'error',
//         confirmButtonText: 'Try Again'
//       });
//     }
//   };

//   return (
//     <div className="card h-100 shadow-sm">
//       {concert.image && (
//         <img
//           src={concert.image}
//           alt={concert.artist}
//           className="card-img-top"
//           style={{ height: '180px', objectFit: 'cover' }}
//         />
//       )}
//       <div className="card-body d-flex flex-column justify-content-between">
//         <div>
//           <h5 className="card-title">{concert.artist}</h5>
//           <p className="card-text"><strong>Venue:</strong> {concert.venue}</p>
//           <p className="card-text"><strong>Date:</strong> {concert.date}</p>
//           <p className="card-text"><strong>Time:</strong> {concert.time}</p>
//           <p className="card-text"><strong>Location:</strong> {concert.location}</p>
//         </div>
//         <div>
//           <p className="card-text text-success fw-bold mt-2">₹{concert.price}</p>
//           <button className="btn btn-outline-primary btn-sm w-100 mt-2" onClick={handleBookNow}>
//             Book Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ConcertCard;
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ConcertCard.css'; 

const ConcertCard = ({ concert }) => {
  const navigate = useNavigate();

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
    <div className="concert-card-container position-relative overflow-hidden shadow rounded">
      <img
  src={
    concert.image
      ? concert.image.startsWith('/uploads')  // ✅ Uploaded via API
        ? `http://localhost:3000${concert.image}`
        : `/images/${concert.image}`          // ✅ Static from public/images
      : 'https://placehold.co/300x180?text=No+Image'
  }
  alt={concert.artist}
  className="concert-background-image"
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = 'https://placehold.co/300x180?text=No+Image';
  }}
/>

      <div className="concert-content p-4">
        <h5 className="card-title">{concert.artist}</h5>
        <p><strong>Venue:</strong> {concert.venue}</p>
        <p><strong>Date:</strong> {concert.date}</p>
        <p><strong>Time:</strong> {concert.time}</p>
        <p><strong>Location:</strong> {concert.location}</p>
        <p className="text-success fw-bold mt-2">₹{concert.price}</p>
        <button className="btn btn-outline-light btn-sm w-100 mt-2" onClick={handleBookNow}>
          Book Now
        </button>
      </div>
    </div>
  );
};

export default ConcertCard;



