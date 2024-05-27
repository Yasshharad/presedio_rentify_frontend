import React, { useState } from 'react';
import authService from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        role: 'buyer'
    });
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize the useNavigate hook

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await authService.register(formData);
            alert("Registered Successfully.")
            navigate('/login'); // Redirect to login page after successful registration
        } catch (error) {
            console.error(error);
            setError('Registration failed. Please try again.'); // Set error message for user feedback
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
            <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            <select name="role" value={formData.role} onChange={handleChange}>
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
            </select>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message if present */}
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
