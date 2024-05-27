import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import propertyService from '../services/propertyService';

const PropertyPage = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const propertyData = await propertyService.getPropertyById(id);
                setProperty(propertyData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching property:', error);
                setError('Failed to fetch property. Please try again later.');
                setLoading(false);
            }
        };
        fetchProperty();
    }, [id]);

    if (loading) return <p>Loading...</p>; // Display loading state while property data is being fetched
    if (error) return <p>{error}</p>; // Display error message if there's an error fetching property data
    if (!property) return <p>No property found.</p>; // Display message if property data is empty

    const handleInterestedClick = () => {
        // Implement functionality for "I'm Interested" button click
        console.log('I am interested in this property:', property);
    };

    return (
        <div className="property-page-container">
            <h1>{property.place}</h1>
            <p>Area: {property.area}</p>
            <p>Bedrooms: {property.bedrooms}</p>
            <p>Bathrooms: {property.bathrooms}</p>
            <p>Nearby: {property.nearby.join(', ')}</p>
            <button onClick={handleInterestedClick}>I'm Interested</button>
        </div>
    );
};

export default PropertyPage;
