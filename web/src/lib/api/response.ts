import { NextResponse } from "next/server";

import { type ApiError, toApiError } from "@/lib/api/errors";

export type ApiSuccessBody<T> = {
  success: true;
  data: T;
};

export type ApiErrorBody = {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
};

export function jsonSuccess<T>(
  data: T,
  status = 200,
  headers?: HeadersInit,
): NextResponse<ApiSuccessBody<T>> {
  return NextResponse.json({ success: true, data }, { status, headers });
}

export function jsonError(
  error: ApiError,
  headers?: HeadersInit,
): NextResponse<ApiErrorBody> {
  const responseHeaders = new Headers(headers);

  if (error.code === "METHOD_NOT_ALLOWED" && error.details) {
    const allow = (error.details as { allow?: string[] }).allow;
    if (allow?.length) {
      responseHeaders.set("Allow", allow.join(", "));
    }
  }

  if (error.code === "TOO_MANY_REQUESTS" && error.details) {
    const details = error.details as {
      retryAfterSeconds?: number;
      limit?: number;
      remaining?: number;
      reset?: number;
    };

    if (details.retryAfterSeconds && details.retryAfterSeconds > 0) {
      responseHeaders.set("Retry-After", String(details.retryAfterSeconds));
    }
    if (typeof details.limit === "number") {
      responseHeaders.set("RateLimit-Limit", String(details.limit));
    }
    if (typeof details.remaining === "number") {
      responseHeaders.set(
        "RateLimit-Remaining",
        String(Math.max(0, details.remaining)),
      );
    }
    if (typeof details.reset === "number") {
      responseHeaders.set("RateLimit-Reset", String(details.reset));
    }
  }

  return NextResponse.json(
    {
      success: false,
      error: {
        code: error.code,
        message: error.message,
        ...(error.details !== undefined ? { details: error.details } : {}),
      },
    },
    { status: error.status, headers: responseHeaders },
  );
}

export function handleRouteError(error: unknown): NextResponse<ApiErrorBody> {
  const apiError = toApiError(error);

  if (apiError.status >= 500) {
    console.error("[api]", error);
  }

  return jsonError(apiError);
}
