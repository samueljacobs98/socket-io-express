import * as onDisconnect from "./on-disconnect";
import * as onMessage from "./on-message";
import * as onClientMessage from "./on-client-message";

export const eventHandlers = [onDisconnect, onMessage, onClientMessage];
