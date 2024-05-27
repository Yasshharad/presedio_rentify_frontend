import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './pages/Dashboard';
import PropertyPage from './pages/PropertyPage';
import Profile from './pages/Profile'; // Import the Profile component
import ProtectedRoute from './ProtectedRoute';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import './App.css';

const App = () => {
    return (
        <div className="App">
            <Router>
                <Navbar/>
                <Routes>
                    <Route path="/" exact element={<Home/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/property/:id" element={<PropertyPage />} />
                    <Route path="/profile" element={<ProtectedRoute component={Profile} />} />
                    <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} />} />
                </Routes>
                <Footer/>
            </Router>
        </div>
    );
};

export default App;
