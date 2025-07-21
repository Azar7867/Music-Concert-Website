import React from 'react';
import { Button } from 'react-bootstrap';

const BookingItem = ({ booking, onCancel }) => {
  return (
    <div className="border rounded p-3 mb-3">
      <h5>{booking.concert}</h5>
      <p>Date: {new Date(booking.date).toLocaleString()}</p>
      <p>Status: {booking.status}</p>
      {booking.status === "upcoming" && (
        <Button variant="danger" onClick={() => onCancel(booking.id)}>
          Cancel Ticket
        </Button>
      )}
    </div>
  );
};

export default BookingItem;
