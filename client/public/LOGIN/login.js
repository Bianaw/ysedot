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
    e.preventDefault();
    setError('');

    try {
      // יצירת אובייקט FormData
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);

      // שליחת הבקשה עם Axios
      const response = await axios.post('http://localhost:5001/api/users/login', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // שמירת שם המשתמש ב-localStorage
      localStorage.setItem('username', response.data.username);

      // מעבר לדף הראשי
      navigate('/main');
    } catch (err) {
      // טיפול בשגיאות
      setError(err.response?.data || 'An error occurred. Please try again.');
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
