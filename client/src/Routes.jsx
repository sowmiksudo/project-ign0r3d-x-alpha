import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import PrivateRoute from './PrivateRoute';
import { Guard } from './Guard';
import "./styles/App.css";
import Xsms from "./components/pages/xSMS/Xsms";
import { Box } from '@mui/material';
import Home from "./components/pages/Home";
import Profile from "./components/pages/Profile";

function RouteList() {
    return (
        <Box className="overlay">
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/x-sms" element={<Xsms />} />
                <Route path="/user/login" element={<Login />} />
                <Route path="/user/register" element={<Register />} />
                <Route path="/user" element={<Profile />} />
                <Route path="/user/*" element={<Guard token="user-token" routeNavigate="/login" component={PrivateRoute} />} /> 
            </Routes>
        </Box>
    );
}
export default RouteList;
