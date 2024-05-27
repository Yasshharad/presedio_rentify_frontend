import React, { useState, useEffect, useCallback } from 'react';
import authService from '../services/authService';
import PropertyForm from '../components/Property/PropertyForm';
import PropertyList from '../components/Property/PropertyList';
import propertyService from '../services/propertyService';

const SellerDashboard = () => {
    const [user, setUser] = useState(null);
    const [properties, setProperties] = useState([]);

    const fetchUserData = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const userData = await authService.getUserData(token);
                setUser(userData);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }, []);

    const fetchProperties = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            if (token && user) {
                const propertiesData = await propertyService.getPropertiesByOwner(user._id, token);
                setProperties(propertiesData);
            }
        } catch (error) {
            console.error('Error fetching properties:', error);
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            fetchProperties();
        } else {
            fetchUserData();
        }
    }, [user, fetchUserData, fetchProperties]);

    const handleUpdateProperty = async (propertyId, updatedData) => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                await propertyService.updateProperty(propertyId, updatedData, token);
                // Refresh properties after update
                fetchProperties();
            }
        } catch (error) {
            console.error('Error updating property:', error);
        }
    };

    const handleDeleteProperty = async (propertyId) => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                await propertyService.deleteProperty(propertyId, token);
                alert("Deleted successfully.");
                fetchProperties();
            }
        } catch (error) {
            console.error('Error deleting property:', error);
        }
    };

    if (!user) {
        return <p>Loading...</p>; // Display loading state while user information is being fetched
    }

    return (
        <div className="dashboard-container">
            <h2>Welcome, {user.firstName}!</h2>
            <h3>Post New Property</h3>
            <div className="property-form">
                <PropertyForm />
            </div>
            <h3>Your Properties</h3>
            <div className="property-list">
                <PropertyList 
                    properties={properties} 
                    onUpdateProperty={handleUpdateProperty} 
                    onDeleteProperty={handleDeleteProperty}
                />
            </div>
        </div>
    );
};

export default SellerDashboard;