import { Socket } from "socket.io";
import { Logger } from "../../../../api/utils";

const logger = Logger.new("on-message");

export const name = "message";

export const handler = (socket: Socket, data: string) => {
  logger.log("socket.on.message", `received data: ${data}`);

  socket.emit(
    "server_message",
    JSON.stringify({ message: "hello from server", cId: Math.random() })
  );
};
