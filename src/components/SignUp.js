import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
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
    // Ici, vous enverriez généralement formData au serveur pour l'enregistrement
    
    navigate('/');
  };

  return (
    <div className="custom-signup">
      <h2 className="custom-signup-title">Create Your Account</h2>
      <form className="custom-signup-form" onSubmit={handleSubmit}>
        <label className="custom-signup-label">
          Name:
          <input className="custom-signup-input" type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label className="custom-signup-label">
          Email:
          <input className="custom-signup-input" type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label className="custom-signup-label">
          Password:
          <input className="custom-signup-input" type="password" name="password" value={formData.password} onChange={handleChange} required />
        </label>
        <button className="custom-signup-button" type="submit">Sign Up</button>
        <p className="custom-signup-login-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
