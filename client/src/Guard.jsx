import React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';


export const Guard = ({ component: Component, token: Token, routeRedirect, ...rest }) => (
    <Routes>
        <Route {...rest} render={props => (
            localStorage.getItem(Token) ?
                <Component {...props} /> :
                <Navigate to={{ pathname: routeRedirect, state: { from: props.location } }} />
        )} />
    </Routes>
);