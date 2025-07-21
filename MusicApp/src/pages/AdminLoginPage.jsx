import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 const handleAdminLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.get('http://localhost:3000/api/admins');
    const admin = res.data.find(
      (admin) =>
        admin.email.toLowerCase() === email.toLowerCase() &&
        admin.password === password
    );

    if (admin) {
      localStorage.setItem('authToken', 'admin');
      navigate('/admin-dashboard');
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Invalid Admin Credentials!',
      });
    }
  } catch (error) {
    console.error('Error fetching admin data:', error);
    Swal.fire({
  icon: 'error',
  title: 'Login Failed',
  text: 'Invalid email or password!',
});
  }
};


  return (
    <div className="container py-5" style={{ maxWidth: '400px' }}>
      <h2 className="text-center mb-4">🛠️ Admin Login</h2>
      <form onSubmit={handleAdminLogin}>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-danger w-100">
          Login as Admin
        </button>
      </form>
    </div>
  );
};

export default AdminLoginPage;
