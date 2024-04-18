import { validate } from "../../../../../api/socket/events/validators/validate";
import { onClientMessageSchema as schema } from "./schemas";

export const validateRequest = (data: string) => validate(data, schema);
