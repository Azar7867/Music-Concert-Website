import React from 'react';

const PricingSummary = ({ seatType, unitPrice, quantity, totalPrice }) => {
  return (
    <div className="mt-4 p-3 border rounded bg-light">
      <h6>Pricing Summary</h6>
      <p>Seat Type: <strong>{seatType}</strong></p>
      <p>Price per Ticket: ₹{unitPrice}</p>
      <p>Quantity: {quantity}</p>
      <hr />
      <p className="fw-bold">Total: ₹{totalPrice}</p>
    </div>
  );
};

export default PricingSummary;
