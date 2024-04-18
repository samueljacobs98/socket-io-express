import { Socket } from "socket.io";
import { Logger } from "../../../../api/utils";
import { onClientMessageValidator as validator } from "./validators";

const logger = Logger.new("on-client-message");

export const name = "client_message";

export const handler = (_: Socket, data: string) => {
  const validationOutcome = validator.validateRequest(data);

  if (!validationOutcome.success) {
    logger.error(
      `socket.on.${name}`,
      `received invalid client_message data - ${validationOutcome.error}`
    );
    return;
  }

  logger.log(
    `socket.on.${name}`,
    `received valid client_message data: ${JSON.stringify(
      validationOutcome.requestData
    )}`
  );
};
