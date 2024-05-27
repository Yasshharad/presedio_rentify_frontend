import React, { useEffect, useState } from 'react';
import propertyService from '../../services/propertyService'; // Import the property service
import PropertyItem from './PropertyItem';

const PropertyList = () => {
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                // Fetch properties using the property service
                const propertiesData = await propertyService.getProperties();
                setProperties(propertiesData);
                setFilteredProperties(propertiesData); // Initially set filtered properties to all properties
            } catch (error) {
                console.error(error);
            }
        };
        fetchProperties();
    }, []);

    const applyFilters = (place, area, bedrooms, bathrooms) => {
        let filtered = [...properties]; // Copy properties array

        // Apply place filter
        if (place) {
            filtered = filtered.filter(property => property.place.toLowerCase().includes(place.toLowerCase()));
        }
        
        // Apply area filter
        if (area) {
            filtered = filtered.filter(property => property.area.toLowerCase().includes(area.toLowerCase()));
        }
        
        // Apply bedrooms filter
        if (bedrooms) {
            filtered = filtered.filter(property => property.bedrooms === parseInt(bedrooms));
        }
        
        // Apply bathrooms filter
        if (bathrooms) {
            filtered = filtered.filter(property => property.bathrooms === parseInt(bathrooms));
        }

        // Update filtered properties state
        setFilteredProperties(filtered);
    };

    return (
        <div className="property-list-container">
            {/* Filter input fields */}
            <div className="filter-inputs">
                <h4>Filter</h4>
                <input type="text" placeholder="Place" onChange={(e) => applyFilters(e.target.value, null, null, null)} />
                <input type="text" placeholder="Area" onChange={(e) => applyFilters(null, e.target.value, null, null)} />
                <input type="number" placeholder="Bedrooms" onChange={(e) => applyFilters(null, null, e.target.value, null)} />
                <input type="number" placeholder="Bathrooms" onChange={(e) => applyFilters(null, null, null, e.target.value)} />
            </div>

            {/* Display filtered properties */}
            {filteredProperties.map(property => (
                <PropertyItem key={property._id} property={property} showButtons/>
            ))}
        </div>
    );
};

export default PropertyList;
