// src/components/Filters.jsx
import React from 'react';

const Filters = ({ genre, setGenre, location, setLocation, date, setDate }) => {
  return (
    <div className="container mb-4">
      <div className="row">
        <div className="col-12 col-md-4 mb-3">
          <input
            type="text "
            className="form-control"
            placeholder="Search by Genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </div>
        <div className="col-12 col-md-4 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="col-12 col-md-4 mb-3">
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Filters;
