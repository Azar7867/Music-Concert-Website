import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/UserDashboard.css';

const UserDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [profile, setProfile] = useState({ _id: '', name: '', email: '' });
  const [saving, setSaving] = useState(false);
  const fetchBookings = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/bookings2');
      setBookings(res.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/users');
      if (Array.isArray(res.data) && res.data.length > 0) {
        setProfile(res.data[0]);
      } else {
        setProfile({
          _id: res.data._id || res.data.id || '',
          name: res.data.name || '',
          email: res.data.email || ''
        });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };
  const saveProfile = async () => {
    if (!profile._id) {
      Swal.fire('Error', 'User ID is missing', 'error');
      return;
    }

    try {
      setSaving(true);
      await axios.put(`http://localhost:3000/api/users/${profile._id}`, {
        name: profile.name,
        email: profile.email
      });

      Swal.fire({
        icon: 'success',
        title: 'Profile Updated!',
        text: 'Your profile has been successfully saved.',
        confirmButtonColor: '#28a745',
        background: '#e6fff4'
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      Swal.fire('Error', 'Failed to update profile', 'error');
    } finally {
      setSaving(false);
    }
  };
  const cancelBooking = async (id) => {
    const confirm = await Swal.fire({
      title: 'Cancel Booking?',
      text: "Are you sure you want to cancel this concert booking?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, cancel it!'
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/api/bookings2/${id}`);
        setBookings((prev) => prev.filter((b) => b._id !== id));
        Swal.fire('Cancelled', 'Your booking has been cancelled.', 'success');
      } catch (error) {
        console.error("Error cancelling booking:", error);
        Swal.fire('Error', 'Failed to cancel booking', 'error');
      }
    }
  };
  useEffect(() => {
    fetchBookings();
    fetchProfile();
  }, []);

  return (
    <div className="dashboard-container container py-4">
      <h2 className="text-center mb-5">👤 User Dashboard</h2>
      <div className="glass-card p-4 mb-5 shadow">
        <h4 className="mb-3">✏️ Edit Profile</h4>
        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={handleProfileChange}
          className="form-control mb-3"
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleProfileChange}
          className="form-control mb-3"
          placeholder="Email"
        />
        <button
          className="btn btn-outline-info"
          onClick={saveProfile}
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save Profile'}
        </button>
      </div>
      <div className="glass-card p-4 shadow">
        <h4 className="mb-4">🎫 Your Bookings</h4>
        {bookings.length === 0 ? (
          <p className="text-muted">No bookings available.</p>
        ) : (
          bookings.map((booking) => (
            <div key={booking._id} className="booking-card mb-3 p-3 border rounded">
              <h5 className="fw-bold">{booking.artist}</h5>
              <p><strong>Venue:</strong> {booking.venue}</p>
              <p><strong>Date:</strong> {booking.date}</p>
              <p><strong>Time:</strong> {booking.time}</p>
              <p><strong>Location:</strong> {booking.location}</p>
              <p><strong>Seat Type:</strong> {booking.seatType || 'General'}</p>
              <p><strong>Price:</strong> ₹{booking.price}</p>
              <button
                className="btn btn-danger btn-sm mt-2"
                onClick={() => cancelBooking(booking._id)}
              >
                Cancel Booking
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserDashboard;



