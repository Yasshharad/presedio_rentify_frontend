import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component }) => {
    const isAuthenticated = !!localStorage.getItem('token'); // Simple check for token in localStorage

    return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
