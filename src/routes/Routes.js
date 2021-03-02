import React from 'react';
import { Route } from 'react-router-dom';
import Header from '../UI/Header/Header';
const Classes = React.lazy(() => import("../components/Classes"));

const AuthRoutes = () => {
    const routes = [
        <Route
            path="/"
            exact
            component={Classes}
        />
    ];

    return (
        <>
            <Header />
            {routes}
        </>
    )
}

export default AuthRoutes;