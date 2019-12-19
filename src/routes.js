import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './pages/Chat';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/chat" component={Chat} />
        </Switch>
    </ BrowserRouter>
);

export default Routes;
