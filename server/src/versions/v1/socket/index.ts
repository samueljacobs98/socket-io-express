import { Socket } from "socket.io";
import { eventHandlers } from "./events";

export const socketHandler = (socket: Socket) => {
  eventHandlers.forEach((e) =>
    socket.on(e.name, (data: unknown) => e.handler(socket, data))
  );
};
