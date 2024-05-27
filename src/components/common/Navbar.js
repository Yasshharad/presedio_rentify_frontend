import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import authService from '../../services/authService';

const Navbar = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const userData = await authService.getUserData(token);
                    setUser(userData);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, []);

    const handleLogout = () => {
        authService.logout();
        setUser(null);
        window.location.href = '/'; // Redirect to home page after logout
    };

    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/dashboard">Dashboard</Link>
            {user ? (
                <>
                    <Link to="/profile">Profile</Link>
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>
            )}
        </nav>
    );
};

export default Navbar;
