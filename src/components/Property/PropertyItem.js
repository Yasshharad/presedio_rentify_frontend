import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PropertyItem = ({ property, showButtons, onUpdateProperty, onDeleteProperty }) => {
    const [sellerDetails, setSellerDetails] = useState(null);
    const [showSellerDetails, setShowSellerDetails] = useState(false);
    const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);
    const [updatedPropertyData, setUpdatedPropertyData] = useState({
        place: property.place,
        area: property.area,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        nearby: property.nearby.join(', '),
    });

    useEffect(() => {
        const fetchSellerDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/auth/users/${property.owner}`);
                setSellerDetails(response.data);
                setShowSellerDetails(true);
            } catch (error) {
                console.error('Error fetching seller details:', error);
            }
        };

        if (showSellerDetails && !sellerDetails) {
            fetchSellerDetails();
        }
    }, [property.owner, sellerDetails, showSellerDetails]);

    const handleInterestClick = () => {
        setShowSellerDetails(true);
    };

    const handleUpdateClick = () => {
        setIsUpdateFormOpen(true);
    };

    const handleUpdateFormSubmit = async (e) => {
        e.preventDefault();
        try {
            // Call the backend API to update the property
            await axios.put(`http://localhost:5000/api/properties/${property._id}`, updatedPropertyData);
            // Call the onUpdateProperty function passed from the parent component
            onUpdateProperty(property._id, updatedPropertyData);
            setIsUpdateFormOpen(false);
        } catch (error) {
            console.error('Error updating property:', error);
        }
    };

    const handleDeleteClick = async () => {
        try {
            // Call the backend API to delete the property
            await axios.delete(`http://localhost:5000/api/properties/${property._id}`);
            // Call the onDeleteProperty function passed from the parent component
            onDeleteProperty(property._id);
        } catch (error) {
            console.error('Error deleting property:', error);
        }
    };

    const handleInputChange = (e) => {
        setUpdatedPropertyData({
            ...updatedPropertyData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="property-item">
            <h3>{property.place}</h3>
            {/* Display property details */}
            <p>Area: {property.area}</p>
            <p>Bedrooms: {property.bedrooms}</p>
            <p>Bathrooms: {property.bathrooms}</p>
            <p>Nearby: {property.nearby.join(', ')}</p>

            {showSellerDetails && sellerDetails && (
                <div className="seller-details">
                    {/* Display seller details */}
                    <p>Seller: {sellerDetails.firstName} {sellerDetails.lastName}</p>
                    <p>Contact(email): {sellerDetails.email}</p>
                    <p>Contact(Phone Number): {sellerDetails.phone}</p>
                </div>
            )}
            <button onClick={handleInterestClick}>I'm Interested</button>
            {showButtons && (
                <>
                    <button onClick={handleUpdateClick}>Update</button>
                    <button onClick={handleDeleteClick}>Delete</button>
                </>
            )}

            {isUpdateFormOpen && (
                <form className="update-form" onSubmit={handleUpdateFormSubmit}>
                    <input type="text" name="place" value={updatedPropertyData.place} onChange={handleInputChange} />
                    <input type="text" name="area" value={updatedPropertyData.area} onChange={handleInputChange} />
                    <input type="text" name="bedrooms" value={updatedPropertyData.bedrooms} onChange={handleInputChange} />
                    <input type="text" name="bathrooms" value={updatedPropertyData.bathrooms} onChange={handleInputChange} />
                    <input type="text" name="nearby" value={updatedPropertyData.nearby} onChange={handleInputChange} />
                    <button type="submit">Update Property</button>
                </form>
            )}
        </div>
    );
};

export default PropertyItem;
