// CreateAccount.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import axios from 'axios';

import './CreateAccount.css'; 

function CreateAccount() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/register', { name, email, password });
      console.log(response.data);
      window.location.href = '/login'; 
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="create-account">
      <section>
        <div>
          <h1>Create Account</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="name"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="input-container">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                placeholder="name@company.com"
                required
              />
            </div>
            <div className="input-container">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                placeholder="••••••••"
                required
              />
            </div>
            <button type="submit">SignUp</button>
          </form>
          <p>
            Already have an account?{' '}
            <Link to="/login">Login here</Link>
          </p>
        </div>
      </section>
    </div>
  );
}

export default CreateAccount;
