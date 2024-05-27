import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth/';

const register = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}register`, userData);
        return response.data;
    } catch (error) {
        handleError(error, 'registration');
    }
};

const login = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}login`, userData);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    } catch (error) {
        handleError(error, 'login');
    }
};

const getUserData = async (token) => {
    try {
        const response = await axios.get(`${API_URL}user`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        handleError(error, 'fetching user data');
    }
};

const logout = () => {
    localStorage.removeItem('token');
};

const handleError = (error, action) => {
    let errorMessage = 'An error occurred';
    if (error.response && error.response.data) {
        errorMessage = error.response.data.message || errorMessage;
    }
    throw new Error(`${action} failed: ${errorMessage}`);
};

const authService = {
    register,
    login,
    getUserData, // Add getUserData function
    logout
};

export default authService;
