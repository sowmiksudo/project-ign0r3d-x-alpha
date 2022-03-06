import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';


const isAuth = () => {
    const user = localStorage.getItem("user-token")
    return user
}

const ProtectedRoutes = () => {
    const auth = isAuth();
    return auth ? <Outlet /> : <Navigate to="/user/login" />
}

export default ProtectedRoutes;