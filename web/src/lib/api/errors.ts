import { ZodError } from "zod";

export type ApiErrorCode =
  | "BAD_REQUEST"
  | "VALIDATION_ERROR"
  | "CONFLICT"
  | "NOT_FOUND"
  | "METHOD_NOT_ALLOWED"
  | "TOO_MANY_REQUESTS"
  | "INTERNAL_ERROR"
  | "SERVICE_UNAVAILABLE";

export class ApiError extends Error {
  readonly code: ApiErrorCode;
  readonly status: number;
  readonly details?: unknown;

  constructor(
    code: ApiErrorCode,
    message: string,
    status: number,
    details?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

export function badRequest(message: string, details?: unknown): ApiError {
  return new ApiError("BAD_REQUEST", message, 400, details);
}

export function validationError(error: ZodError): ApiError {
  return new ApiError("VALIDATION_ERROR", "Validation failed.", 400, {
    issues: error.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
    })),
  });
}

export function conflict(message: string, details?: unknown): ApiError {
  return new ApiError("CONFLICT", message, 409, details);
}

export function notFound(message: string): ApiError {
  return new ApiError("NOT_FOUND", message, 404);
}

export function methodNotAllowed(allow: string[]): ApiError {
  return new ApiError(
    "METHOD_NOT_ALLOWED",
    "Method not allowed.",
    405,
    { allow },
  );
}

export function internalError(
  message = "Unexpected server error.",
  details?: unknown,
): ApiError {
  return new ApiError("INTERNAL_ERROR", message, 500, details);
}

export function serviceUnavailable(
  message: string,
  details?: unknown,
): ApiError {
  return new ApiError("SERVICE_UNAVAILABLE", message, 503, details);
}

export function toApiError(error: unknown): ApiError {
  if (error instanceof ApiError) {
    return error;
  }

  if (error instanceof ZodError) {
    return validationError(error);
  }

  if (error instanceof Error && error.message.startsWith("Invalid server environment")) {
    return serviceUnavailable(
      "Server configuration is incomplete.",
      process.env.NODE_ENV === "development" ? error.message : undefined,
    );
  }

  return internalError();
}
