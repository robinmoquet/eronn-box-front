import { REGEX_PARAM_ROUTER } from '../config/regex';

const routes = {
    home: {
        path: '/',
    },
    login: {
        path: '/login'
    },
    containerList: {
        path: '/containers'
    },
    container: {
        path: '/container/{keysecure}'
    },
    technicalSupport: {
        path: '/tech-support',
    },
};

/**
 * Permet de récupérer l'url d'une route.
 * Ex:
 *      path('user', null, false) => /user/:id
 *      path('user', {id: '24', device: 'desktop'}) => /user/24?device=desktop
 *
 * @param routeName Le nom de la route
 * @param options Les parameters d'url, si present dans le path, ils seront ajouter dans la QueryString
 * @param paramMustBeReplace Définit si les params, doivent etre incluent dans le path/QueryString
 * @return {string} L'url correspondant à la routeName
 */
export const path = (
    routeName,
    options = null,
    paramMustBeReplace = true
) => {
    let route = routes[routeName]?.path;
    if (route === undefined)
        throw new Error(`No route found for: ${routeName}`);

    if (routeHaveParams(route)) {
        const params = getListParams(route);

        if (params === null) {
            throw new Error("Functions routeHavParams doesn't work !");
        }

        if (paramMustBeReplace && (options === undefined || options === null)) {
            throw new Error(`Missing parameters: ${params?.join(', ')}`);
        }

        route = replaceParams(
            route,
            params,
            options,
            paramMustBeReplace
        );

        if (
            paramMustBeReplace &&
            hasRestOptions(options, params)
        ) {
            route = addRestOptionsToQueryString(
                route,
                options,
                params
            );
        }
    }

    return encodeURI(route);
};

const routeHaveParams = (route) =>
    REGEX_PARAM_ROUTER.test(route);

const hasRestOptions = (
    options,
    params
) =>
    Object.keys(options).filter((option) => !params.includes(option))
        .length > 0;

const getListParams = (route) => {
    const found = route.match(REGEX_PARAM_ROUTER);
    const res = [];
    found?.every((param) => res.push(param.replace(/[{}]/g, '')));
    return res;
};

const replaceParams = (
    route,
    params,
    options,
    paramMustBeReplace
) => {
    let res = route;
    if (paramMustBeReplace) {
        params.forEach((param) => {
            const option = options[param];
            if (option === undefined) {
                throw new Error(`Missing parameter: ${param}`);
            }
            res = res.replace(`{${param}}`, `${option}`);
        });
    } else {
        params.forEach((param) => {
            res = res.replace(`{${param}}`, `:${param}`);
        });
    }
    return res;
};

const addRestOptionsToQueryString = (
    route,
    options,
    params
) => {
    const restOptions = Object.keys(options).filter(
        (option) => !params.includes(option)
    );
    let res = route;
    let isFirst = true;
    restOptions.forEach((restOption) => {
        if (isFirst) {
            res = `${res}?${restOption}=${options[restOption]}`;
            isFirst = false;
        } else res = `${res}&${restOption}=${options[restOption]}`;
    });
    return res;
};
