import { Socket } from "socket.io";
import { Logger } from "../../../../api/utils";

const logger = Logger.new("on-disconnect");

export const name = "disconnect";

export const handler = (_: Socket, data: string) => {
  logger.log("socket.on.disconnect", `a user disconnected due to ${data}`);
};
