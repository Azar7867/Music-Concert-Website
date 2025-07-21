import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, facebookProvider } from '../firebase';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (email === "admin@example.com" && password === "admin123") {
        localStorage.setItem("authToken", "admin");
        navigate("/");
        return;
      }

      const res = await axios.get('http://localhost:3000/api/users');
      const user = res.data.find(user => user.email === email && user.password === password);

      if (user) {
        localStorage.setItem("authToken", user.email);
        navigate("/");
      } else {
        alert("Invalid credentials or user not found");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Error during login");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      localStorage.setItem("authToken", result.user.email);
      navigate("/");
    } catch (error) {
      alert("Google Sign-in failed: " + error.message);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      localStorage.setItem("authToken", result.user.email);
      navigate("/");
    } catch (error) {
      alert("Facebook Sign-in failed: " + error.message);
    }
  };

  return (
    <div className="container py-5 d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label>Email</label>
            <input type="email" className="form-control" required value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input type="password" className="form-control" required value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
          <p className="text-center mt-3">
            New User? <a href="/signup">Signup here</a>
          </p>
        </form>

        <hr className="my-4" />

        <div className="d-grid gap-2">
          <button onClick={handleGoogleLogin} className="btn btn-outline-danger d-flex align-items-center justify-content-center gap-2">
            <FcGoogle size={20} /> Sign in with Google
          </button>
          <button onClick={handleFacebookLogin} className="btn btn-outline-primary d-flex align-items-center justify-content-center gap-2">
            <FaFacebook size={20} /> Sign in with Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
