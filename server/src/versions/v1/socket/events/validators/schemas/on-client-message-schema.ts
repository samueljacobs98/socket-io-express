import { z } from "zod";

export const onClientMessageSchema = z.object({
  message: z.string(),
});
