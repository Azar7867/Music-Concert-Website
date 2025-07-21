import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AdminPanel = () => {
  const [concerts, setConcerts] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    id: '',
    artist: '',
    venue: '',
    date: '',
    time: '',
    location: '',
    price: '',
    availableTickets: '',
    genre: '',
    image: null
  });

  const fetchConcerts = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/concerts1');
      setConcerts(res.data);
    } catch (error) {
      console.error("Failed to fetch concerts", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/users');
      setUsers(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/bookings2');
      const enriched = res.data.map(booking => {
        const user = users.find(u => u._id === booking.userId);
        return {
          ...booking,
          userName: user?.name || 'Unknown',
          userEmail: user?.email || 'Unknown'
        };
      });
      setBookings(enriched);
    } catch (error) {
      console.error("Failed to fetch bookings", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (users.length > 0) fetchBookings();
    fetchConcerts();
  }, [users]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleAddOrUpdate = async () => {
    const formData = new FormData();
    formData.append("artist", form.artist);
    formData.append("venue", form.venue);
    formData.append("date", form.date);
    formData.append("time", form.time);
    formData.append("location", form.location);
    formData.append("genre", form.genre);
    formData.append("price", form.price);
    formData.append("availableTickets", form.availableTickets);
    formData.append('image', form.image);

    try {
      if (form.id) {
        await axios.put(`http://localhost:3000/api/concerts1/${form.id}`, formData);
        Swal.fire('Success', 'Concert Updated!', 'success');
      } else {
        await axios.post('http://localhost:3000/api/concerts1', formData);
        Swal.fire('Success', 'Concert Added!', 'success');
      }

      setForm({
        id: '', artist: '', venue: '', date: '', time: '', location: '',
        genre: '', price: '', availableTickets: '', image: null
      });
      fetchConcerts();
    } catch (error) {
      console.error("Error saving concert", error);
      Swal.fire("Error", "Concert save failed!", "error");
    }
  };

  const handleEdit = (concert) => {
    setForm({
      id: concert._id,
      artist: concert.artist,
      venue: concert.venue,
      date: concert.date,
      time: concert.time,
      location: concert.location,
      genre: concert.genre,
      price: concert.price,
      availableTickets: concert.availableTickets,
      image: null
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/concerts1/${id}`);
      Swal.fire('Success', 'Concert Deleted!', 'success');
      fetchConcerts();
    } catch (error) {
      Swal.fire('Failed', 'Failed To Delete!', 'error');
    }
  };

  const handleDeleteBooking = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/bookings2/${id}`);
      Swal.fire('Success', 'Booking Deleted!', 'success');
      fetchBookings();
    } catch (error) {
      Swal.fire('Failed', 'Failed To Delete Booking!', 'error');
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">🛠️ Admin Panel – Manage Concerts</h2>

      {/* 🎤 Form */}
      <div className="row mb-4">
        <div className="col-md-6 mx-auto">
          <h5>{form.id ? "Edit Concert" : "Add New Concert"}</h5>
          <input className="form-control mb-2" name="image" type="file" accept="image/*" onChange={handleChange} />
          <input className="form-control mb-2" name="artist" placeholder="Artist" value={form.artist} onChange={handleChange} />
          <input className="form-control mb-2" name="venue" placeholder="Venue" value={form.venue} onChange={handleChange} />
          <input className="form-control mb-2" name="location" placeholder="Location" value={form.location} onChange={handleChange} />
          <input className="form-control mb-2" name="genre" placeholder="Genre" value={form.genre} onChange={handleChange} />
          <input className="form-control mb-2" name="date" type="date" value={form.date} onChange={handleChange} />
          <input className="form-control mb-2" name="time" type="time" value={form.time} onChange={handleChange} />
          <input className="form-control mb-2" name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} />
          <input className="form-control mb-2" name="availableTickets" type="number" placeholder="Tickets" value={form.availableTickets} onChange={handleChange} />
          <button className="btn btn-success w-100" onClick={handleAddOrUpdate}>
            {form.id ? "Update Concert" : "Add Concert"}
          </button>
        </div>
      </div>
      <h5 className="mb-3">🎫 Concert List</h5>
      <table className="table table-bordered text-center">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            {/* <th>Image</th> */}
            <th>Artist</th>
            <th>Venue</th>
            <th>Location</th>
            <th>Genre</th>
            <th>Date</th>
            <th>Time</th>
            <th>Price</th>
            <th>Tickets</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {concerts.map((c, i) => (
            <tr key={c._id}>
              <td>{i + 1}</td>
              {/* <td>{c.image ? <img src={`http://localhost:3000/uploads/${c.image}`} alt="Concert" width="60" height="60" /> : 'No Image'}</td> */}
              <td>{c.artist}</td>
              <td>{c.venue}</td>
              <td>{c.location}</td>
              <td>{c.genre}</td>
              <td>{c.date}</td>
              <td>{c.time}</td>
              <td>₹{c.price}</td>
              <td>{c.availableTickets}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(c)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(c._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h5 className="mt-5 mb-3">🎟️ Booking Confirmation List</h5>
      <table className="table table-striped text-center">
        <thead className="table-primary">
          <tr>
            <th>#</th>
            <th>Artist</th>
            <th>User</th>
            <th>Email</th>
            <th>Date</th>
            <th>Time</th>
            <th>Venue</th>
            <th>Seat Type</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b, i) => (
            <tr key={b._id}>
              <td>{i + 1}</td>
              <td>{b.artist}</td>
              <td>{users[0]?.name || 'Unknown'}</td>
        <td>{users[0]?.email || 'Unknown'}</td>
              <td>{b.date}</td>
              <td>{b.time}</td>
              <td>{b.venue}</td>
              <td>{b.seatType || '-'}</td>
              <td>₹{b.price}</td>
              <td>
                <button className="btn btn-sm btn-danger" onClick={() => handleDeleteBooking(b._id)}>Delete</button>
              </td>
            </tr>
          ))}
          {bookings.length === 0 && (
            <tr><td colSpan="10">No bookings found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
