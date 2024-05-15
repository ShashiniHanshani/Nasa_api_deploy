import React from 'react';
import { Route } from 'react-router-dom';

const isAuthenticated = () => {
    // Check if the user is authenticated
    const accessToken = localStorage.getItem('accessToken');
    return !!accessToken;
};

const authentication = ({ component: Component, fallback: Fallback, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated() ? (
                    <Component {...props} />
                ) : (
                    <Fallback {...props} />
                )
            }
        />
    );
};

export default authentication;
