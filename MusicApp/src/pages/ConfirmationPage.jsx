import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import QRCode from 'react-qr-code';
import html2canvas from 'html2canvas';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/ConfirmationPage.css';
import Swal from 'sweetalert2';

const ConfirmationPage = () => {
  const [tickets, setTickets] = useState([]);
  const [profile, setProfile] = useState({ name: '', email: '' });
  const ticketRefs = useRef({});

  useEffect(() => {
    axios.get('http://localhost:3000/api/bookings2')
      .then(res => setTickets(res.data))
      .catch(err => console.error("Error fetching tickets:", err));
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3000/api/users')
      .then(res => {
        const user = Array.isArray(res.data) ? res.data[0] : res.data;
        setProfile({ name: user.name || '', email: user.email || '' });
      })
      .catch(err => console.error("Error fetching profile:", err));
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this ticket!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`http://localhost:3000/api/bookings2/${id}`);
      setTickets((prev) => prev.filter((ticket) => ticket._id !== id));

      Swal.fire('Deleted!', 'Your ticket has been deleted.', 'success');
    } catch (error) {
      console.error("Failed to delete ticket:", error);
      Swal.fire('Error!', 'Something went wrong while deleting.', 'error');
    }
  };

  const handleDownload = (id) => {
    const ticketElement = ticketRefs.current[id];
    if (!ticketElement) return;

    html2canvas(ticketElement).then((canvas) => {
      const link = document.createElement("a");
      link.download = `ticket_${id}.png`;
      link.href = canvas.toDataURL();
      link.click();
    });
  };

const handleEmail = async (ticket) => {
  const { artist, venue, date, time, location, seatType, price } = ticket;
  const { name, email } = profile;

  const htmlContent = `
    <h2>🎫 Your Concert Ticket - ${artist}</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Venue:</strong> ${venue}</p>
    <p><strong>Date:</strong> ${date}</p>
    <p><strong>Time:</strong> ${time}</p>
    <p><strong>Seat Type:</strong> ${seatType}</p>
    <p><strong>Total Price:</strong> ₹${price}</p>
    <p>📍 Location: ${location}</p>
    <br/>
    <p>Show your ticket QR at entry. Enjoy the concert!</p>
  `;

  try {
    await axios.post('http://localhost:3000/api/email/send-ticket', {
      to: email,
      subject: `🎟️ Ticket Confirmation - ${artist}`,
      text: `Ticket booked for ${artist} at ${venue}, ${date} ${time}`,
      html: htmlContent
    });

    Swal.fire({
      title: 'Email Sent!',
      text: `Ticket sent to ${email}`,
      icon: 'success',
      timer: 2000,
      showConfirmButton: false
    });
  } catch (error) {
    console.error("Email error:", error);
    Swal.fire({
      title: 'Error!',
      text: 'Failed to send ticket email.',
      icon: 'error'
    });
  }
};


  if (!tickets.length) return <div className="loading-msg">🎫 Loading Your Tickets...</div>;

  return (
    <div className="confirmation-container container py-4">
      <h2 className="text-center text-success mb-4">🎫 Booking Confirmations</h2>

      {tickets.map((ticket) => (
        <div
  key={ticket._id}
  className="ticket-card shadow mb-4 rounded border position-relative text-white"
  ref={(el) => ticketRefs.current[ticket._id] = el}
  style={{
    backgroundImage: `url(bg1.jpg)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '400px',
    padding: '2rem',
    position: 'relative',
    overflow: 'hidden'
  }}
>
  <div className="bg-overlay position-absolute top-0 start-0 w-100 h-100" style={{
    background: 'rgba(0, 0, 0, 0.6)',
    zIndex: 0
  }}></div>

  <div className="ticket-content position-relative z-1">
    <h2 className="text-center mb-4 display-5 fw-bold animate-title"style={{ fontFamily: 'Lobster', fontSize: '2rem' }} >{ticket.artist}</h2>

    <div className="text-center mb-4">
      <QRCode
        value={`Ticket ID: ${ticket._id} | ${profile.name} | ${ticket.artist}`}
        style={{ height: "120px", width: "120px", background: "white", padding: "5px" }}
      />
      <p className="text-light mt-2">Show this QR code at the entry</p>
    </div>

    <div className="ticket-details text-start">
      <p><strong>Name:</strong> {profile.name}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Venue:</strong> {ticket.venue}</p>
      <p><strong>Date:</strong> {ticket.date}</p>
      <p><strong>Time:</strong> {ticket.time}</p>
      <p><strong>Seat Type:</strong> {ticket.seatType}</p>
      <p><strong>Total Price:</strong> ₹{ticket.price}</p>
      <p><strong>Number of Tickets:</strong> {ticket.ticketCount|| 1}</p>
      <p><strong>Location:</strong> {ticket.location}</p>
    </div>

    <div className="ticket-actions d-flex gap-3 justify-content-center mt-4">
      <button className="btn btn-outline-light" onClick={() => handleDownload(ticket._id)}>
        ⬇️ Download
      </button>
      <button className="btn btn-outline-light" onClick={() => handleEmail(ticket)}>
        📧 Email
      </button>
      <button className="btn btn-outline-danger" onClick={() => handleDelete(ticket._id)}>
        ❌ Delete 
      </button>
    </div>
  </div>
</div>
      ))}
    </div>
  );
};

export default ConfirmationPage;
