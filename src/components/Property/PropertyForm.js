import React, { useState } from 'react';
import propertyService from '../../services/propertyService'; // Import the property service

const PropertyForm = () => {
    const [formData, setFormData] = useState({
        place: '',
        area: '',
        bedrooms: '',
        bathrooms: '',
        nearby: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            // Post property using the property service
            await propertyService.createProperty(formData, token);
            alert("Property added succesully.")
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="place" placeholder="Place" value={formData.place} onChange={handleChange} required />
            <input type="text" name="area" placeholder="Area" value={formData.area} onChange={handleChange} required />
            <input type="number" name="bedrooms" placeholder="Bedrooms" value={formData.bedrooms} onChange={handleChange} required />
            <input type="number" name="bathrooms" placeholder="Bathrooms" value={formData.bathrooms} onChange={handleChange} required />
            <input type="text" name="nearby" placeholder="Nearby" value={formData.nearby} onChange={handleChange} required />
            <button type="submit">Post Property</button>
        </form>
    );
};

export default PropertyForm;
