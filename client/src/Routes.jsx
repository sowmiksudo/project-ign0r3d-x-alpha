import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import ProtectedRoutes from './ProtectedRoutes';
import { Box } from '@mui/material';
import Page from "./components/layouts/Page";
import Xsms from "./components/pages/xSMS/Xsms";
import Profile from "./components/pages/Profile";
import Home from "./components/pages/Home";
import NotFound from "./components/pages/NotFound";
import LandingPage from "./components/pages/LandingPage";

function RouteList() {
    return (
        <Box className="overlay">
            <Page>
                <Routes>
                    <Route index element={<LandingPage />} />
                    <Route path="/user">
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                    </Route>
                    <Route element={<ProtectedRoutes />}>
                        <Route path="/user">
                            <Route index element={<Home />} />
                            <Route path="profile" element={<Profile />} />
                        </Route>
                        <Route path={`x-sms`} element={<Xsms />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Page>
        </Box>
    );
}
export default RouteList;
