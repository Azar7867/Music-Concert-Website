import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/BookingPage.css';
import Swal from 'sweetalert2';
const BookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/bookings');
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

const handleDeleteConfirmation = (id) => {
  Swal.fire({
    title: 'Are you sure?',
    text: 'This booking and its payment will be permanently deleted!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel',
    background: '#fff',
    customClass: {
      popup: 'border rounded-4',
      title: 'fs-4 text-dark',
      htmlContainer: 'fs-6 text-secondary',
      confirmButton: 'px-4 py-2',
      cancelButton: 'px-4 py-2',
    }
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/api/bookings/${id}`);
        const paymentRes = await axios.get(`http://localhost:3000/api/payments?bookingId=${id}`);
        const relatedPayment = paymentRes.data[0];
        if (relatedPayment) {
          await axios.delete(`http://localhost:3000/api/payments/${relatedPayment._id}`);
        }
        setBookings((prev) => prev.filter((b) => b._id !== id));
        Swal.fire({
          title: 'Deleted!',
          text: 'Your booking and payment have been removed.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
          background: '#f9f9f9'
        });
      } catch (error) {
        console.error("Error deleting booking or payment:", error);
        Swal.fire({
          title: 'Error',
          text: 'Failed to delete booking or payment.',
          icon: 'error',
          confirmButtonColor: '#d33'
        });
      }
    }
  });
};



  const handlePayNow = async (concert) => {
    try {
      await axios.post("http://localhost:3000/api/payments", {
  concertTitle: concert.artist,
  amount: concert.price,
  method: "",
  status: "pending",
  bookingId: concert.id,
  venue: concert.venue,
  date: concert.date,
  time: concert.time,
  location: concert.location,
  count: concert.ticketCount
});
      navigate("/payment");
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="booking-container">
      <h2 className="text-center mb-4">Your Booked Concerts</h2>
      <div className="row g-4">
        {bookings.length > 0 ? (
          bookings.map((concert) => (
            <div key={concert._id} className="col-md-6">
              <div className="booking-card card p-3 h-100">
                {/* <img
  src={concert.image }
  alt={concert.artist}
  className="booking-image mb-3"
/> */}
<img
  src={
    concert.image
      ? concert.image.startsWith('/uploads')  // ✅ Uploaded via API
        ? `http://localhost:3000${concert.image}`
        : `/images/${concert.image}`          // ✅ Static from public/images
      : 'https://placehold.co/300x180?text=No+Image'
  }
  alt={concert.artist}
  className="booking-image mb-3"
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = 'https://placehold.co/300x180?text=No+Image';
  }}
/>
                <h4>{concert.artist}</h4>
                <p><strong>Venue:</strong> {concert.venue}</p>
                <p><strong>Date:</strong> {concert.date}</p>
                <p><strong>Time:</strong> {concert.time}</p>
                <p><strong>Location:</strong> {concert.location}</p>
               <p><strong>Price:</strong> ₹{concert.price || 'N/A'}</p>
<p><strong>Tickets:</strong> {concert.ticketCount}</p>
<p><strong>Total Price:</strong> ₹{concert.totalPrice || concert.price}</p>

                <div className="booking-buttons d-flex justify-content-between mt-3">
                  <button className="btn premium-delete-btn" onClick={() => handleDeleteConfirmation(concert._id)}>
                    🗑️ Delete Booking
                  </button>
                  <button className="btn btn-success" onClick={() => handlePayNow(concert)}>
                    Pay Now
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-booking-msg">No bookings found.</p>
        )}
      </div>
    </div>
  );
};

export default BookingPage;

