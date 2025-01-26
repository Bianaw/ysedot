import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    setError(''); // Clear previous errors

    try {
      // Sending the login request
      const response = await axios.post(
        'http://localhost:5001/api/users/login',
        { username, password }, // Sending data as JSON
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Check if response contains the required data
      if (
        response.data &&
        response.data.username &&
        response.data.firstName &&
        response.data.lastName &&
        response.data.email &&
        response.data.phoneNumber
      ) {
        // Save user details in localStorage
        localStorage.setItem('username', response.data.username);
        localStorage.setItem('firstName', response.data.firstName);
        localStorage.setItem('lastName', response.data.lastName);
        localStorage.setItem('email', response.data.email);
        localStorage.setItem('phoneNumber', response.data.phoneNumber);

        // Navigate to the main page
        navigate('/main');
      } else {
        throw new Error('Invalid response from server.');
      }
    } catch (err) {
      // Handle errors
      console.error('Error during login:', err);
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        'An error occurred. Please try again.';
      setError(errorMessage);
    }
  };

  return (
    <div className="form-container">
      <h2>Welcome Back!</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default Login;
