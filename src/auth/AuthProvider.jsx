import React from 'react';
import {useAuthProvider} from "./hooks/useAuthProvider";
import {authContext} from "./authContext";
import {useCookies} from "react-cookie";
import {CONNECTION_COOKIE_NAME} from "../config/global";

function AuthProvider({ children }) {
    const auth = useAuthProvider();
    const [cookies] = useCookies([CONNECTION_COOKIE_NAME]);

    if (auth.user === null && cookies[CONNECTION_COOKIE_NAME] !== undefined) {
        auth.setUserWithToken(cookies[CONNECTION_COOKIE_NAME]);
    }

    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    );
}

export default AuthProvider;
