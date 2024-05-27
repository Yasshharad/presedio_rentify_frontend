import axios from 'axios';

const API_URL = 'http://localhost:5000/api/properties/';

const createProperty = async (propertyData, token) => {
    try {
        const response = await axios.post(API_URL, propertyData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(`Failed to create property: ${error.message}`);
    }
};

const getProperties = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch properties: ${error.message}`);
    }
};

const getPropertyById = async (id) => {
    try {
        const response = await axios.get(API_URL + id);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch property with ID ${id}: ${error.message}`);
    }
};

const handleError = (error, action) => {
    let errorMessage = 'An error occurred';
    if (error.response && error.response.data) {
        errorMessage = error.response.data.message || errorMessage;
    }
    throw new Error(`${action} failed: ${errorMessage}`);
};

const getPropertiesByOwner = async (ownerId, token) => {
    try {
        const response = await axios.get(`${API_URL}?owner=${ownerId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        handleError(error, 'fetching properties');
    }
};

const propertyService = {
    createProperty,
    getProperties,
    getPropertyById,
    getPropertiesByOwner
};

export default propertyService;
