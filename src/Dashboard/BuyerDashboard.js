import React, { useEffect, useState } from 'react';
import authService from '../services/authService';

const BuyerDashboard = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const userData = await authService.getUserData(token);
                    console.log(userData);
                    setUser(userData);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, []);

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div className="dashboard-container">
            <p>Welcome to your dashboard, {user.firstName}</p>
        </div>
    );
};

export default BuyerDashboard;
