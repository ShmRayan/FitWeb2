import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici, vous enverriez généralement formData au serveur pour l'authentification
    
    navigate('/');
  };

  return (
    <div className="custom-login">
      <h2 className="custom-login-title">Login to Your Account</h2>
      <form className="custom-login-form" onSubmit={handleSubmit}>
        <label className="custom-login-label">
          Email:
          <input className="custom-login-input" type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label className="custom-login-label">
          Password:
          <input className="custom-login-input" type="password" name="password" value={formData.password} onChange={handleChange} required />
        </label>
        <button className="custom-login-button" type="submit">Login</button>
        <p className="custom-login-signup-link">
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
