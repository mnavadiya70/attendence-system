import React from 'react';
import { Route } from 'react-router-dom';

const Login = React.lazy(() => import("../components/Auth/Login/Login"));

const AuthRoutes = () => {
    return [
        <Route
            path="/"
            key="Login"
            exact
            component={Login}
        />
    ];
}

export default AuthRoutes;