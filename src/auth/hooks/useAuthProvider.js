import {useState} from "react";
import {auth} from "../auth";
import {useCookies} from "react-cookie";
import {CONNECTION_COOKIE_NAME} from "../../config/global";

export function useAuthProvider() {
    const [user, setUser] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookie, removeCookie] = useCookies([CONNECTION_COOKIE_NAME]);

    const signin = async (values) => {
        let res = await auth.signin(values);
        if (auth.isAuthenticated) {
            setCookie(CONNECTION_COOKIE_NAME, res.token, {path: '/'});
            setUserWithToken(res.token);
        }
        return res;
    };

    const signout = () => {
        auth.signout();
        removeCookie(CONNECTION_COOKIE_NAME);
        setUser(null);
    };

    const setUserWithToken = token => {
        // get data du user
        setUser({jwt: token});
    }

    return {
        user,
        signin,
        signout,
        setUserWithToken
    };
}
