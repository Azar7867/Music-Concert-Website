import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import'./app.css'
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ConcertListing from './pages/ConcertListing';
import ConcertDetails from './pages/ConcertDetails';
import BookingPage from './pages/BookingPage';
import PaymentPage from './pages/PaymentPage';
import ConfirmationPage from './pages/ConfirmationPage';
import UserDashboard from './pages/UserDashboard';
import AdminPanel from './pages/AdminPanel';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/AdminDashboard';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem('authToken'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <Router>
      <Routes>
         <Route path="/admin-login" element={<AdminLoginPage />} />
  <Route
    path="/admin-dashboard"
    element={
      localStorage.getItem("authToken") === "admin" ? (
        <AdminDashboard />
      ) : (
        <Navigate to="/admin-login" />
      )
    }
  />
  <Route
  path="/admin"
  element={
    localStorage.getItem("authToken") === "admin" ? (
      <AdminPanel />
    ) : (
      <Navigate to="/admin-login" />
    )
  }
/>
        <Route path="/" element={isLoggedIn ? <HomePage /> : <Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/concerts" element={<ConcertListing />} />   
        <Route path="/concert/:id" element={<ConcertDetails />} />
         <Route path="/booking/" element={<BookingPage />} />
        <Route path="/payment" element={isLoggedIn ? <PaymentPage /> : <Navigate to="/login" replace />} />
        <Route path="/confirmation" element={isLoggedIn ? <ConfirmationPage /> : <Navigate to="/login" replace />} />
        <Route path="/dashboard" element={isLoggedIn ? <UserDashboard /> : <Navigate to="/login" replace />} />
        <Route path="/admin" element={isLoggedIn ? <AdminPanel /> : <Navigate to="/login" replace />} />

        
      </Routes>
    </Router>
  );
};

export default App;
