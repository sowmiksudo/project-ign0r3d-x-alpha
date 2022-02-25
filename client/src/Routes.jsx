import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import PrivateRoute from './PrivateRoute';
import { Guard } from './Guard';
import "./styles/App.css";
import { Navigate } from 'react-router-dom';
import { Box } from '@mui/material';

function RouteList() {
    return (
        <Box className="overlay">
            <Routes>
                <Route path="/user/login" element={<Login />} />
                <Route path="/user/register" element={<Register />} />
                <Route path="/*" element={<Guard token="user-token" routeNavigate="/login" component={PrivateRoute} />} /> 
                <Route exact path="/" element={<Navigate to="/user/login" />} /> 
                <Route element={<Navigate to="/user/login" />} />
            </Routes>
        </Box>
    );
}
export default RouteList;
