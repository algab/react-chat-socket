import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './pages/Chat';

const GuardPublic = ({ path, component, ...rest }) => {
    const user = localStorage.getItem('user');
    if (user) {
        return <Redirect to="/chat" />
    } else {
        return <Route path={path} component={component} {...rest} />
    }
};

const GuardPrivate = ({ path, component, ...rest }) => {
    const user = localStorage.getItem('user');
    if (user) {
        return <Route path={path} component={component} {...rest} />
    } else {
        return <Redirect to="/" />
    }
};

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <GuardPublic path="/" exact component={Login} />
            <GuardPublic path="/register" component={Register} />
            <GuardPrivate path="/chat" component={Chat} />
            <Redirect from="*" to="/" />
        </Switch>
    </ BrowserRouter>
);

export default Routes;
