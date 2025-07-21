import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/ConcertDetailsPage.css';
import Swal from 'sweetalert2';
const ConcertDetailsPage = () => {
  const [concertDetails, setConcertDetails] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState({});
  const [prices, setPrices] = useState({});

  useEffect(() => {
    const fetchConcertDetails = async () => {
      try {
        // const response = await axios.get('http://localhost:3000/concertDetails');
        const response = await axios.get('http://localhost:3000/api/concert-details');
        setConcertDetails(response.data);
      } catch (error) {
        console.error("Error fetching concert details:", error);
      }
    };
    fetchConcertDetails();
  }, []);

  const handleSeatSelect = (concertId, seat) => {
    setSelectedSeats((prev) => ({ ...prev, [concertId]: seat.type }));
    setPrices((prev) => ({ ...prev, [concertId]: seat.price }));
  };

  // const handleBooking = (concertId, artist) => {
  //   const seat = selectedSeats[concertId];
  //   const price = prices[concertId];
  //   if (!seat) {
  //     alert(`Please select a seat type for ${artist}.`);
  //     return;
  //   }
  //   alert(`Booking confirmed: ${seat} seat for ₹${price} at ${artist}'s concert.`);
  // };
const handleBooking = (concertId, artist) => {
  const seat = selectedSeats[concertId];
  const price = prices[concertId];

  if (!seat) {
    Swal.fire({
      title: 'Oops!',
      text: `Please select a seat type for ${artist}.`,
      icon: 'warning',
      confirmButtonColor: '#dc3545',
      background: '#fffdf6'
    });
    return;
  }

  Swal.fire({
    title: '🎫 Booking Confirmed!',
    html: `
      <div style="font-size: 18px;">
        <p><strong>Artist:</strong> ${artist}</p>
        <p><strong>Seat Type:</strong> ${seat}</p>
        <p><strong>Total Price:</strong> ₹${price}</p>
      </div>
    `,
    icon: 'success',
    confirmButtonText: 'Done',
    confirmButtonColor: '#28a745',
    background: '#f0fff5',
    customClass: {
      popup: 'rounded shadow'
    }
  });
};

  return (
    <div className="concert-details-page">
      <div className="overlay">
        <div className="container py-5">
          <h2 className="text-center text-white mb-5 display-5">🎶 All Concerts</h2>
          {concertDetails.map((concert) => (
            <div key={concert._id} className="glass-card p-4 mb-5">
              <h4 className="text-white">{concert.artist} - Live in {concert.location}</h4>
              <p className="text-light"><strong>Venue:</strong> {concert.venue}</p>
              <p className="text-light"><strong>Date & Time:</strong> {concert.date} at {concert.time}</p>
              <p className="text-light"><strong>Genre:</strong> {concert.genre}</p>
              <p className="text-light"><strong>Description:</strong> {concert.description}</p>

              <div className="my-3">
                <h6 className="text-white">🎫 Select Seat Type</h6>
                <div className="d-flex flex-wrap gap-3">
                  {concert.seatTypes.map((seat) => (
                    <button
                      key={seat.type}
                      className={`btn ${selectedSeats[concert.id] === seat.type ? 'btn-light' : 'btn-outline-light'}`}
                      onClick={() => handleSeatSelect(concert.id, seat)}
                    >
                      {seat.type} - ₹{seat.price}
                    </button>
                  ))}
                </div>
              </div>

              {selectedSeats[concert.id] && (
                <p className="mt-2 text-white">
                  <strong>Selected:</strong> {selectedSeats[concert.id]} | <strong>Total:</strong> ₹{prices[concert.id]}
                </p>
              )}

              <button
                className="btn btn-success mt-3 w-100"
                onClick={() => handleBooking(concert.id, concert.artist)}
              >
                ✅ Book Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConcertDetailsPage;
