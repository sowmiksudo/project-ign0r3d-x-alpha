import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Profile from './components/pages/Profile';
import Home from './components/pages/Home';
import Xsms from './components/pages/xSMS/Xsms';
export default function PrivateRoute(props) {
    return (
        <div>
            <Routes>
                <Route exact path={`${props.match.path}/x-sms`} element={<Xsms />} />
                <Route path={`${props.match.path}/user`} element={<Profile />} />
                <Route exact path={`${props.match.path}/`} element={<Home />} />
            </Routes>
        </div>
    );
}