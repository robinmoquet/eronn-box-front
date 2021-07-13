import { STATUS } from "../config/api";
import { container13 } from "../mock/containerTree/13";
import {getBaseUrl} from "./api-utils";

const getHearders = (user) => {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Authorization', 'Bearer ' + user.jwt);
    return headers;
}

export const apiLogin = async (data) => {
    const body = {username: data.email, password: data.password};
    const url = getBaseUrl() + '/login_check';
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    const init = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
    };

    try {
        const resTmp = await fetch(url, init);
        const res = await resTmp.json();
        if (res.token === undefined) {
            return {status: STATUS.ERROR, message: res.message};
        } else {
            return {status: STATUS.SUCCESS, token: res.token};
        }
    } catch (e) {
        console.log(e)
    }
}

export const apiGetContainers = async (user) => {
    const headers = getHearders(user);
    const url = getBaseUrl() + '/container/list';
    const init = {
        method: 'GET',
        headers: headers
    };

    try {
        const resTmp = await fetch(url, init);
        const res = await resTmp.json();
        return res.containers;
    } catch (e) {
        console.log(e)
    }
}

export const apiMountContainer = async (keysecure, password, user) => {
    const headers = getHearders(user);
    const url = getBaseUrl() + '/container/mount/' + keysecure;
    const init = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({password: password})
    };

    try {
        const resTmp = await fetch(url, init);
        const res = await resTmp.json();
        return res;
    } catch (e) {
        console.log(e)
    }
}

export const apiUnmountContainer = async (id) => {
    return {status: STATUS.SUCCESS};
}

export const apiGetTreeContainer = async (id) => {
    return container13;
}
