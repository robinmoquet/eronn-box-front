import React from 'react';
import {useAuth} from "../auth/hooks/useAuth";
import {Route, Redirect} from "react-router-dom";
import {path} from "./routes";

function PrivateRoute({ children, ...rest }) {
    let auth = useAuth();
    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth.user ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: path('login'),
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

export default PrivateRoute;
