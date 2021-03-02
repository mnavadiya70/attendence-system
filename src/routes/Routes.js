import React from 'react';
import { Route } from 'react-router-dom';

const Home = React.lazy(() => import("../components/Home"));

const AuthRoutes = () => {
    return [
        <Route
            path="/"
            exact
            component={Home}
        />
    ];
}

export default AuthRoutes;