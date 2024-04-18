import { ZodError, ZodIssue } from "zod";
import { DomainError } from "./domain-error";

export class InternalError extends DomainError {
  constructor(info: string) {
    super("InternalError", info, 500);
  }
}

export class NotFoundError extends DomainError {
  constructor(info: string) {
    super("NotFoundError", info, 404);
  }
}

export class BadRequestError extends DomainError {
  constructor(info: string, name: string = "BadRequestError") {
    super(name, info, 400);
  }
}

export class ValidationError extends BadRequestError {
  private static formatIssue(issue: ZodIssue): string {
    return `
      code: ${issue.code}
      path: /${issue.path.join("/")}
      message: ${issue.message}
    `;
  }

  constructor(zodError: ZodError) {
    const info = `Invalid request data:\n${zodError.issues
      .map(ValidationError.formatIssue)
      .join("\n")}`;

    super(info, "ValidationError");
  }
}

export class UnauthorizedError extends DomainError {
  constructor(info: string) {
    super("UnauthorizedError", info, 401);
  }
}

export class ForbiddenError extends DomainError {
  constructor(info: string) {
    super("ForbiddenError", info, 403);
  }
}
