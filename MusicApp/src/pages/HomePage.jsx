import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ConcertCard from '../components/ConcertCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/HomePage.css';
import Footer from '../components/Footer';
import axios from 'axios';
import { differenceInSeconds } from 'date-fns';
const backgroundImages = ['/bg1.jpg', '/bg2.jpg', '/bg3.jpg'];

const popularVideos = [
  {
    id: 1,
    title: "Illayaraja Concert",
    videoUrl: "https://www.youtube.com/embed/yAnmugkHG3M?si=U9_uuP33SHPhEfLE"
  },
  {
    id: 2,
    title: "Sid Sriram | Rhythm",
    videoUrl: "https://www.youtube.com/embed/795-W8vdOCU?si=_F4PoJnYp4UlTIs"
  },
  {
    id: 3,
    title: "Yuan Sankar Raja ",
    videoUrl: "https://www.youtube.com/embed/LAw9_q4y8gk?si=z1AO4hvYWKOFpyHd"
  }
];

const testimonials = [
  { name: "Aarthi", review: "Amazing concert experience! Loved the vibe.", rating: 5 },
  { name: "Karthik", review: "Booking was super smooth. Will use again!", rating: 4 },
  { name: "Priya", review: "Got free merch for being early! Best surprise!", rating: 5 }
];

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [bgIndex, setBgIndex] = useState(0);
  const [concerts, setConcerts] = useState([]);
  const [popularTamilConcerts, setPopularTamilConcerts] = useState([]);
  const [timeLeft, setTimeLeft] = useState("");
const nextEventDate = new Date('2025-08-30T20:00:00');

  const calculateTimeLeft = () => {
    const totalSeconds = differenceInSeconds(nextEventDate, new Date());
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(days).padStart(2, '0')}d : ${String(hours).padStart(2, '0')}h : ${String(minutes).padStart(2, '0')}m : ${String(seconds).padStart(2, '0')}s`;
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // axios.get("http://localhost:3000/concerts")
    axios.get("http://localhost:3000/api/concerts1")
      .then(res => setConcerts(res.data))
      .catch(err => console.error("Error loading concerts:", err));

    axios.get("http://localhost:3000/api/popular-tamil")
    // axios.get("http://localhost:3000/api/popular-concerts")
      .then(res => setPopularTamilConcerts(res.data))
      .catch(err => console.error("Error loading popular concerts:", err));
  }, []);
 useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  const filteredConcerts = concerts.filter((concert) =>
    (concert.artist?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     concert.venue?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     concert.location?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="homepage-full">
      {/* Hero Banner */}
      {/* <section
        className="hero-banner d-flex flex-column justify-content-center align-items-center text-center"
        style={{ backgroundImage: `url(${backgroundImages[bgIndex]})`, position: 'relative' }}
      >
        <div style={{ position: 'absolute', top: 40, right: 30 }} className="d-flex gap-3">
          <Link to="/login" className="btn btn-outline-light">Login</Link>
          <Link to="/signup" className="btn btn-warning">Sign Up</Link>
          <Link to="/admin-login" className="btn btn-danger">🛠️ Admin Panel</Link>
        </div>

        <h1 className="display-4 fw-bold animate-title text-white">🎵 Music Concert Ticket Booking 🎫</h1>
        <p className="lead animate-subtitle text-white">Find your favorite live shows and book tickets instantly!</p>
        <input
          type="text"
          placeholder="Search by artist, concert or location..."
          className="form-control form-control-lg mt-3 animate-input"
          style={{ maxWidth: '600px', width: '90%' }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <section className="py-5 text-center">
          <h3 className="hero1 mb-4 btn-outline-info">🎯 Quick Navigation</h3>
          <div className="d-flex flex-wrap justify-content-center gap-4">
            <Link to="/concerts" className="btn btn-outline-primary">🎼 Concert Listing</Link>
            <Link to="/concert/1" className="btn btn-outline-secondary">🎤 Concert Details</Link>
            <Link to="/booking" className="btn btn-outline-success">🎫 Booking Page</Link>
            <Link to="/payment" className="btn btn-outline-info">💳 Payment Gateway</Link>
            <Link to="/confirmation" className="btn btn-outline-warning">✅ Confirmation Page</Link>
            <Link to="/dashboard" className="btn btn-outline-primary">👤 User Dashboard</Link>
          </div>
        </section>
      </section> */}
      <section className="hero-banner d-flex flex-column justify-content-center align-items-center text-center position-relative">
  <video
    autoPlay
    loop
    muted
    playsInline
    className="bg-video"
  >
    <source src="/concert-bg.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>

  <div style={{ position: 'absolute', top: 40, right: 30, zIndex: 2 }} className="d-flex gap-3">
    <Link to="/login" className="btn btn-outline-light">Login</Link>
    <Link to="/signup" className="btn btn-warning">Sign Up</Link>
    <Link to="/admin-login" className="btn btn-danger">🛠️ Admin Panel</Link>
  </div>

  <h1 className="display-4 fw-bold animate-title text-white" style={{ zIndex: 2 }}>🎵 Music Concert Ticket Booking 🎫</h1>
  <p className="lead animate-subtitle text-white" style={{ zIndex: 2 }}>
    Find your favorite live shows and book tickets instantly!
  </p>
  <input
    type="text"
    placeholder="Search by artist, concert or location..."
    className="form-control form-control-lg mt-3 animate-input"
    style={{ maxWidth: '600px', width: '90%', zIndex: 2 }}
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  <section className="py-5 text-center" style={{ zIndex: 2 }}>
    <h3 className="hero1 mb-4 btn-outline-info">🎯 Quick Navigation</h3>
    <div className="d-flex flex-wrap justify-content-center gap-4">
      <Link to="/concerts" className="btn btn-outline-primary">🎼 Concert Listing</Link>
      <Link to="/concert/1" className="btn btn-outline-secondary">🎤 Concert Details</Link>
      <Link to="/booking" className="btn btn-outline-success">🎫 Booking Page</Link>
      <Link to="/payment" className="btn btn-outline-info">💳 Payment Gateway</Link>
      <Link to="/confirmation" className="btn btn-outline-warning">✅ Confirmation Page</Link>
      <Link to="/dashboard" className="btn btn-outline-primary">👤 User Dashboard</Link>
    </div>
  </section>
</section>

      <div className="offer-strip ">
        💥 Buy 1 Get 1 Free | 🔥 Early Bird Discount | 🎁 Free Merchandise for First 100 Bookings!
      </div>

      <div className="slider-container">
        <div className="slider-track">
          {filteredConcerts.length > 0 ? (
            [...filteredConcerts, ...filteredConcerts].map((concert, index) => (
              <div className="slider-item" key={index}>
                <ConcertCard concert={concert} />
              </div>
            ))
          ) : (
            <div className="text-center w-100">
              <p className="fs-5 text-muted">No concerts found matching your search.</p>
            </div>
          )}
        </div>
      </div>

      <div className="container-fluid px-5 py-5 bg-dark text-white">
  <h3 className="mb-4 text-center text-warning">🔥 Most Popular Tamil Music Concerts</h3>
  <div className="row justify-content-center gx-4 gy-4">
    {popularTamilConcerts.map((concert, index) => {
      const tags = ['Trending', 'Popular', 'Recommended'];
      const tag = concert.tag || tags[index % tags.length];

      return (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={concert._id}>
          <div className="position-relative">
            <span className="badge tag-badge position-absolute top-0 start-0 m-2">
              {tag}
            </span>
            <ConcertCard concert={concert} />
          </div>
        </div>
      );
    })}
  </div>
</div>
      <div className="container-fluid px-5 py-5 bg-black text-white">
        <h3 className="mb-4 text-center text-info">🎬 Popular Concert Videos</h3>
        <div className="row justify-content-center gx-4 gy-4">
          {popularVideos.map((video) => (
            <div className="col-12 col-md-6 col-lg-4" key={video.id}>
              <div className="card bg-dark text-white shadow-sm">
                <div className="ratio ratio-16x9">
                  <iframe
                    src={video.videoUrl}
                    title={video.title}
                    allowFullScreen
                    className="rounded-top"
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title text-center">{video.title}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
 <section className="countdown-section">
      <div className="countdown-content">
        <h3 className=" mb-3">⏳ Countdown to the Next Big Concert!</h3>
        <h4 className="display-6 fw-bold">{timeLeft}</h4>
        <p >Mark your calendars for 30th August 2025 - Don’t miss out!</p>
      </div>
      </section>
      <div className="testimonial-section">
        <h3 className="testimonial-card">💬 User Testimonials</h3>
        <div className=" row justify-content-center">
          {testimonials.map((t, idx) => (
            <div key={idx} className="col-md-4 mb-3">
              <div className="cardtest h-100 shadow-sm">
                <div className="card-body">
                  <p className="mb-1">"{t.review}"</p>
                  <small className="testimonial-author">— {t.name}</small><br/>
                  <span>{'⭐'.repeat(t.rating)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="about-section">
        <h3 className="text-center text-primary mb-3">🎵 About Azardeen Concerts</h3>
        <p className="text-center">Azardeen Concerts is your go-to platform for discovering and booking live music shows across India. Our mission is to bring electrifying performances closer to you – from classical legends to trending pop stars. Join us and feel the rhythm live!</p>
      </div>
      <div className="newsletter-section">
        <h4 className="mb-3">📬 Subscribe to Our Newsletter</h4>
        <p className="mb-3">Stay updated with the latest concert announcements and offers!</p>
        <form className="d-flex justify-content-center">
          <input type="email" className="form-control w-50 me-2" placeholder="Enter your email..." />
          <button className="btn btn-primary">Subscribe</button>
        </form>
      </div>

      <Footer
        companyName="Azardeen Concerts"
        year={2025}
        logo="/bg2.jpg"
        address="123 Music Street, Chennai, India"
        email="support@azardeenconcerts.com"
        phone="+91 98765 43210"
        links={[
          { label: 'Privacy Policy', href: '/privacy' },
          { label: 'Terms of Service', href: '/terms' },
          { label: 'Contact Us', href: '/contact' }
        ]}
      />
    </div>
  );
};

export default HomePage;
