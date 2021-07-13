import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { path } from './routes';
import Home from '../pages/Home';
import Container from '../pages/Container';
import NotFound from '../pages/NotFound';
import ContainerList from "../pages/ContainerList";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";
import AuthProvider from "../auth/AuthProvider";

const Router = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Switch>
                    <Route path={path('login', null, false)} exact><Login /></Route>
                    <PrivateRoute path={path('home', null, false)} exact><Home /></PrivateRoute>
                    <PrivateRoute path={path('containerList', null, false)} exact><ContainerList /></PrivateRoute>
                    <PrivateRoute path={path('container', null, false)} exact><Container /></PrivateRoute>
                    <PrivateRoute path="/" component={NotFound} />
                </Switch>
            </BrowserRouter>
        </AuthProvider>
    )
};

export default Router;
