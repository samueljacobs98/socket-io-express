import { Socket } from "socket.io";
import { onJoinSessionValidator as validator } from "./validators";

export const name = "join_session";

export const fn = (socket: Socket) => (data: string) => {
  console.log("session joined");
  const validationResult = validator.validateRequest(data);
  console.log(validationResult);

  if (!validationResult.success) {
    console.error(validationResult.error.message);
    return;
  }

  const { requestData } = validationResult;
  console.log(requestData);

  const sessionId = requestData.sessionId;
  socket.join(sessionId);
  console.log("Socket Rooms:", socket.rooms);

  console.log("flag");
  socket
    .to(sessionId)
    .emit(
      "session_join_successful",
      JSON.stringify({ message: "successfully joined session" })
    );
};
