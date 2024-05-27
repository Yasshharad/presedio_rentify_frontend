import React, { useState } from 'react';
import authService from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize the useNavigate hook

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { token } = await authService.login({ email, password });
            localStorage.setItem('token', token);
            alert("Logged in Successfully.")
            navigate('/dashboard'); // Use navigate instead of history.push
        } catch (error) {
            console.error(error);
            setError('Invalid email or password. Please try again.'); // Set error message for user feedback
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message if present */}
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
