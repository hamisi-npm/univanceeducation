import { ApiError, badRequest } from "@/lib/api/errors";

export const TURNSTILE_SITEVERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export const TURNSTILE_TOKEN_FIELD = "turnstileToken" as const;

const DEFAULT_TIMEOUT_MS = 5_000;

const MISSING_TOKEN_MESSAGE = "Please complete the security check.";
const FAILED_CHECK_MESSAGE = "Security check failed. Please try again.";

export type TurnstileSiteverifyResponse = {
  success: boolean;
  "error-codes"?: string[];
  challenge_ts?: string;
  hostname?: string;
  action?: string;
  cdata?: string;
};

export type VerifyTurnstileOptions = {
  remoteip?: string | null;
  /** Injected for tests — defaults to global `fetch`. */
  fetchFn?: typeof fetch;
  /** Injected for tests — defaults to `TURNSTILE_SECRET_KEY`. */
  secretKey?: string;
  timeoutMs?: number;
};

export function getTurnstileSiteKey(): string | null {
  const key = process.env.TURNSTILE_SITE_KEY?.trim();
  return key || null;
}

export function getTurnstileSecretKey(): string | null {
  const key = process.env.TURNSTILE_SECRET_KEY?.trim();
  return key || null;
}

export function readTurnstileToken(body: unknown): unknown {
  if (!body || typeof body !== "object") {
    return undefined;
  }

  return (body as Record<string, unknown>)[TURNSTILE_TOKEN_FIELD];
}

function isSiteverifyResponse(value: unknown): value is TurnstileSiteverifyResponse {
  return (
    typeof value === "object" &&
    value !== null &&
    "success" in value &&
    typeof (value as { success: unknown }).success === "boolean"
  );
}

/**
 * Verifies a Cloudflare Turnstile token via Siteverify.
 * Fails closed on missing/invalid/expired tokens and on network errors.
 */
export async function verifyTurnstileToken(
  token: unknown,
  options: VerifyTurnstileOptions = {},
): Promise<void> {
  const secretKey = options.secretKey ?? getTurnstileSecretKey();

  if (!secretKey) {
    throw new ApiError(
      "SERVICE_UNAVAILABLE",
      "Security check is unavailable.",
      503,
    );
  }

  if (typeof token !== "string" || token.trim() === "") {
    throw badRequest(MISSING_TOKEN_MESSAGE);
  }

  const fetchFn = options.fetchFn ?? fetch;
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;

  const body = new URLSearchParams();
  body.set("secret", secretKey);
  body.set("response", token.trim());
  if (options.remoteip) {
    body.set("remoteip", options.remoteip);
  }

  let response: Response;
  try {
    response = await fetchFn(TURNSTILE_SITEVERIFY_URL, {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      body,
      signal: AbortSignal.timeout(timeoutMs),
    });
  } catch {
    throw badRequest(FAILED_CHECK_MESSAGE);
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    throw badRequest(FAILED_CHECK_MESSAGE);
  }

  if (!isSiteverifyResponse(payload)) {
    throw badRequest(FAILED_CHECK_MESSAGE);
  }

  if (!payload.success) {
    throw badRequest(FAILED_CHECK_MESSAGE);
  }
}
