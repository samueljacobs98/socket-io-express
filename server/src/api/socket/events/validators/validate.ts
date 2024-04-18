import { ZodSchema } from "zod";
import { BadRequestError, ValidationError } from "../../../core/models/errors";

type ParseOutcome =
  | { success: true; data: unknown }
  | { success: false; error: BadRequestError };

const parse = (raw: string): ParseOutcome => {
  try {
    return {
      success: true,
      data: JSON.parse(raw),
    };
  } catch {
    return {
      success: false,
      error: new BadRequestError("Invalid JSON"),
    };
  }
};

type ValidationOutcome<T> =
  | { success: true; requestData: T }
  | { success: false; error: BadRequestError };

export const validate = <T>(
  raw: string,
  schema: ZodSchema<T>
): ValidationOutcome<T> => {
  const parsed = parse(raw);

  if (!parsed.success) {
    return parsed;
  }

  const validationResult = schema.safeParse(parsed.data);

  if (!validationResult.success) {
    const { error } = validationResult;
    return {
      success: false,
      error: new ValidationError(error),
    };
  }

  return {
    success: true,
    requestData: validationResult.data,
  };
};
