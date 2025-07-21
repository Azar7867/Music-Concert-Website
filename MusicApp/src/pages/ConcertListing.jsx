import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ConcertCard from '../components/concertcard1';
import Filters from '../components/Filters';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/concertListing.css';
const ConcertListingPage = () => {
  const [concerts, setConcerts] = useState([]);
  const [genre, setGenre] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/concerts1');
        setConcerts(response.data);
      } catch (error) {
        console.error("Error fetching concerts:", error);
      }
    };

    fetchConcerts();
  }, []);

  const filteredConcerts = concerts.filter((concert) => {
    const genreMatch = concert.genre?.toLowerCase().includes(genre.toLowerCase());
    const locationMatch = concert.location?.toLowerCase().includes(location.toLowerCase());
    const dateMatch = date === '' || concert.date === date;
    return genreMatch && locationMatch && dateMatch;
  });

  return (
    <div className="container my-5 concert-listing-page">
      <h2 className="text-center mb-4 text-warning">🎵 Concert Listings</h2>
      <Filters
        genre={genre}
        setGenre={setGenre}
        location={location}
        setLocation={setLocation}
        date={date}
        setDate={setDate}
      />

      <div className="row mt-4">
        {filteredConcerts.length > 0 ? (
          filteredConcerts.map((concert) => (
            <div key={concert._id} className="col-md-6 col-lg-4 mb-4">
              <ConcertCard concert={concert} />
            </div>
          ))
        ) : (
          <div className="text-center text-muted mt-4">
            <p>No concerts found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConcertListingPage;

