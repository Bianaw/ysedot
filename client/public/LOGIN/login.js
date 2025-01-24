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

        if (!username || !password) {
            setError("Both username and password are required.");
            return;
        }


        try {
            const response = await axios.post(
                'http://localhost:5001/api/users/login',
                { username, password },
                { headers: { 'Content-Type': 'application/json' } }
            );

            if (response.data && response.data.username) {
                // שמירת נתוני המשתמש ב-localStorage
                localStorage.setItem('username', response.data.username);
                localStorage.setItem('firstName', response.data.firstName || 'DefaultFirstName');
                localStorage.setItem('lastName', response.data.lastName || 'DefaultLastName');

                // מעבר לדף הראשי
                navigate('/main'); // עדכון המסלול לדף הראשי
            } else {
                throw new Error('Invalid response from server.');
            }
        } catch (err) {
            console.error('Error during login:', err);
            setError(err.response?.data?.message || 'An error occurred. Please try again.');
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
