import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';

export const EventSource = NativeEventSource || EventSourcePolyfill;
