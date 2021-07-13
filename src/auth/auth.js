import {apiLogin} from "../api/request";
import {STATUS} from "../config/api";

export const auth = {
    isAuthenticated: false,
    async signin(values) {
        const res = await apiLogin(values);
        auth.isAuthenticated = res.status === STATUS.SUCCESS;
        return res;
    },

    signout() {
        auth.isAuthenticated = false;
    }
};
