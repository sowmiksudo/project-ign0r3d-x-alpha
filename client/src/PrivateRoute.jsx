import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Profile from './components/pages/Profile';
export default function PrivateRoute(props) {
    return (
        <div>
            <Routes>
                <Route exact path={`${props.match.path}`} element={<Profile />} />
            </Routes>
        </div>
    );
}