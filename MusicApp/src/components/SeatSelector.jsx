import React from 'react';

const SeatSelector = ({ seatTypes, selectedSeat, setSelectedSeat, setTicketPrice }) => {
  const handleSelect = (seat) => {
    setSelectedSeat(seat.type);
    setTicketPrice(seat.price);
  };

  return (
    <div className="my-3">
      <h5>Select Seat Type</h5>
      <div className="d-flex flex-wrap gap-3">
        {seatTypes.map((seat) => (
          <button
            key={seat.type}
            className={`btn ${selectedSeat === seat.type ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => handleSelect(seat)}
          >
            {seat.type} - ₹{seat.price}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SeatSelector;
