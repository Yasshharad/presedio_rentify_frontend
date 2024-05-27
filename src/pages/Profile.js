import React, { useEffect, useState } from 'react';
import authService from '../services/authService'; // Import the authService to access user data

const Profile = () => {
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

    if (!user) {
        return <p>Loading...</p>; // Display loading state while user information is being fetched
    }

    return (
        <div className="profile-container">
            <h1>Profile</h1>
            <p><span>First Name:</span> {user.firstName}</p>
            <p><span>Last Name:</span> {user.lastName}</p>
            <p><span>Email:</span> {user.email}</p>
            <p><span>Phone:</span> {user.phone}</p>
        </div>
    );
};

export default Profile;
