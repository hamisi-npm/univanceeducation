import type { ApiErrorBody, ApiSuccessBody } from "@/lib/api/response";

export class ApiClientError extends Error {
  readonly status: number;
  readonly code: string;
  readonly details?: unknown;

  constructor(status: number, code: string, message: string, details?: unknown) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export async function postJson<T>(
  url: string,
  body: unknown,
): Promise<T> {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });

  let payload: ApiSuccessBody<T> | ApiErrorBody | null = null;

  try {
    payload = (await response.json()) as ApiSuccessBody<T> | ApiErrorBody;
  } catch {
    throw new ApiClientError(
      response.status,
      "INVALID_RESPONSE",
      "The server returned an invalid response.",
    );
  }

  if (!response.ok || !payload || payload.success !== true) {
    const errorPayload = payload && payload.success === false ? payload.error : null;
    throw new ApiClientError(
      response.status,
      errorPayload?.code ?? "REQUEST_FAILED",
      errorPayload?.message ?? "Request failed.",
      errorPayload?.details,
    );
  }

  return payload.data;
}
