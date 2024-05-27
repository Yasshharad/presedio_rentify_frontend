import React, { useEffect, useState } from 'react';
import propertyService from '../services/propertyService'; // Import the property service
import PropertyItem from '../components/Property/PropertyItem';

const Home = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                // Fetch properties using the property service
                const propertiesData = await propertyService.getProperties();
                setProperties(propertiesData);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setError('Failed to fetch properties. Please try again later.');
                setLoading(false);
            }
        };
        fetchProperties();
    }, []);

    return (
        <div className="home-container">
            <h1>Welcome to Rentify</h1>
            <h1>Properties for you.</h1>
            {loading ? (
                <p>Loading properties...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className="property-list">
                    {properties.map(property => (
                        <PropertyItem key={property._id} property={property} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
