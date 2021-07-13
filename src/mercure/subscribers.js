import {EventSourcePolyfill} from "event-source-polyfill";
import {HUB_MERCURE, TOKEN_MERCURE} from "../config/mercure";

export const subscribeForMountProcess = (topic) => {
    const url = new URL(HUB_MERCURE);
    url.searchParams.append('topic', topic);

    return new EventSourcePolyfill(url, {
        headers: {
            'Authorization': 'Bearer ' + TOKEN_MERCURE,
        }
    });
}
