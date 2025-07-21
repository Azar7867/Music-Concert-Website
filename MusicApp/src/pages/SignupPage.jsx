import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/AuthPage.css';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get('http://localhost:3000/api/users');
      const exists = res.data.some(user => user.email === formData.email);

      if (exists) {
        alert("User already exists");
        return;
      }

      await axios.post('http://localhost:3000/api/users', formData);
      alert("Signup successful. Please login.");
      navigate("/login");

    } catch (err) {
      console.error("Signup error:", err);
      alert("Error during signup");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          <button type="submit" className="btn btn-success w-100">Sign Up</button>
          <p className="text-center mt-3">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;


