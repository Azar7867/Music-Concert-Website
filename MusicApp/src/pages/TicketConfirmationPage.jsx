import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react';
import html2canvas from 'html2canvas';

const TicketConfirmationPage = () => {
  const [ticket, setTicket] = useState(null);
  const ticketRef = useRef();

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const res = await axios.get('http://localhost:5000/tickets/1'); // fetch specific ticket by ID
        setTicket(res.data);
      } catch (err) {
        console.error("Error fetching ticket:", err);
      }
    };

    fetchTicket();
  }, []);

  const handleDownload = () => {
    html2canvas(ticketRef.current).then((canvas) => {
      const link = document.createElement("a");
      link.download = "concert_ticket.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  const handleEmail = () => {
    alert("Email sent successfully (mock).");
  };

  if (!ticket) return <p className="text-center mt-5">Loading ticket...</p>;

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">🎫 Ticket Confirmation</h2>
      
      <div className="card shadow p-4" ref={ticketRef}>
        <h4 className="text-center mb-3">{ticket.concert}</h4>
        <p><strong>Name:</strong> {ticket.name}</p>
        <p><strong>Location:</strong> {ticket.location}</p>
        <p><strong>Date:</strong> {ticket.date}</p>
        <p><strong>Seat Type:</strong> {ticket.seat}</p>
        <p><strong>Price:</strong> ₹{ticket.price}</p>
        
        <div className="text-center mt-3">
          <QRCode value={`TicketID:${ticket.id}|${ticket.name}|${ticket.concert}`} />
          <p className="text-muted mt-2">Show this QR at entry</p>
        </div>
      </div>

      <div className="text-center mt-4">
        <button className="btn btn-success me-3" onClick={handleDownload}>📥 Download Ticket</button>
        <button className="btn btn-primary" onClick={handleEmail}>📧 Email Ticket</button>
      </div>
    </div>
  );
};

export default TicketConfirmationPage;
