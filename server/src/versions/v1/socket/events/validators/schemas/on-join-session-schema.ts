import { z } from "zod";

export const onJoinSessionSchema = z.object({
  sessionId: z.string(),
});
