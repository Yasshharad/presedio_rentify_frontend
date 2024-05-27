import React, { useEffect, useState } from 'react';
import authService from '../services/authService';
import SellerDashboard from '../Dashboard/SellerDashboard';
import BuyerDashboard from '../Dashboard/BuyerDashboard';

const Dashboard = () => {
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
        <div className="dashboard-container">
            <h1>Dashboard</h1>
            {user.role === 'seller' ? (
                <SellerDashboard />
            ) : (
                <BuyerDashboard />
            )}
        </div>
    );
};

export default Dashboard;
