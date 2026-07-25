import { getRequestIp } from "@/lib/security/ip-hash";
import { ApiError } from "@/lib/api/errors";

type RateLimitBucket = {
  hits: number[];
};

const buckets = new Map<string, RateLimitBucket>();

const DEFAULT_WINDOW_MS = 60_000;
const DEFAULT_MAX_REQUESTS = 5;

export function tooManyRequests(
  message = "Too many requests. Please try again later.",
  retryAfterSeconds = 60,
): ApiError {
  return new ApiError("TOO_MANY_REQUESTS", message, 429, {
    retryAfterSeconds,
  });
}

/**
 * In-memory sliding-window rate limit (per server instance).
 * Suitable as lightweight production protection for public form APIs.
 */
export function enforceRateLimit(
  key: string,
  options?: {
    maxRequests?: number;
    windowMs?: number;
  },
): void {
  const maxRequests = options?.maxRequests ?? DEFAULT_MAX_REQUESTS;
  const windowMs = options?.windowMs ?? DEFAULT_WINDOW_MS;
  const now = Date.now();
  const windowStart = now - windowMs;

  const bucket = buckets.get(key) ?? { hits: [] };
  bucket.hits = bucket.hits.filter((timestamp) => timestamp > windowStart);

  if (bucket.hits.length >= maxRequests) {
    const oldest = bucket.hits[0] ?? now;
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((oldest + windowMs - now) / 1000),
    );
    buckets.set(key, bucket);
    throw tooManyRequests(undefined, retryAfterSeconds);
  }

  bucket.hits.push(now);
  buckets.set(key, bucket);
}

export function rateLimitKeyFromRequest(
  request: Request,
  scope: string,
): string {
  const ip = getRequestIp(request.headers) ?? "unknown";
  return `${scope}:${ip}`;
}

/** Reject common bot honeypot fields when non-empty (optional on legitimate clients). */
export function assertHoneypotEmpty(body: unknown): void {
  if (!body || typeof body !== "object") {
    return;
  }

  const record = body as Record<string, unknown>;
  const honeypot = record.website ?? record.companyWebsite;

  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    throw new ApiError("BAD_REQUEST", "Invalid request.", 400);
  }
}

const MAX_JSON_BYTES = 16_384;

export function assertJsonBodyWithinLimit(request: Request): void {
  const contentLength = request.headers.get("content-length");
  if (!contentLength) {
    return;
  }

  const size = Number(contentLength);
  if (Number.isFinite(size) && size > MAX_JSON_BYTES) {
    throw new ApiError("BAD_REQUEST", "Request body is too large.", 413);
  }
}
