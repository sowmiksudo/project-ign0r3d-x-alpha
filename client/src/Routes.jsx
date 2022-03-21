import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';
import { Box } from '@mui/material';
import Page from "./components/layouts/Page";

import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Profile from "./components/pages/Profile";
import Home from "./components/pages/Home";
import NotFound from "./components/pages/NotFound";
import LandingPage from "./components/pages/LandingPage";

import Xsms from "./components/pages/xSMS/Xsms";
import Layout from "./components/pages/xSMS/Layout";
import History from "./components/pages/xSMS/History";
import Dashboard from "./components/pages/xSMS/Dashboard";

import Bomber from "./components/pages/bomber/Bomber";
import BomberDashboard from "./components/pages/bomber/Dashboard";
import Blacklist from "./components/pages/bomber/Blacklist";
import BomberHistory from "./components/pages/bomber/History";
import APIs from "./components/pages/bomber/API/APIs";
import BomberLayout from "./components/pages/bomber/BomberLayout";

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
                        <Route path="/x-sms">
                            <Route index element={<Layout><Xsms /></Layout>} />
                            <Route path="history" element={<Layout><History /></Layout>} />
                            <Route path="dashboard" element={<Layout><Dashboard /></Layout>} />
                        </Route>
                        <Route path="/bomber">
                            <Route index element={<BomberLayout><Bomber /></BomberLayout>} />
                            <Route path="history" element={<BomberLayout><BomberHistory /></BomberLayout>} />
                            <Route path="dashboard" element={<BomberLayout><BomberDashboard /></BomberLayout>} />
                            <Route path="api" element={<BomberLayout><APIs /></BomberLayout>} />
                            <Route path="blacklist" element={<BomberLayout><Blacklist /></BomberLayout>} />
                        </Route>
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Page>
        </Box>
    );
}
export default RouteList;
