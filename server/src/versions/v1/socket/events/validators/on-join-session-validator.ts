import { validate } from "../../../../../api/socket/events/validators/validate";
import { onJoinSessionSchema as schema } from "./schemas";

export const validateRequest = (data: string) => validate(data, schema);
