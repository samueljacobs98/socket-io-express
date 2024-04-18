import { Socket } from "socket.io";
import { Logger } from "../../../../api/utils";

const logger = Logger.new("on-client-message");

export const name = "client_message";

export const handler = (_: Socket, data: unknown) => {
  logger.log(`socket.on.${name}`, `received client_message data: ${data}`);
};
//
