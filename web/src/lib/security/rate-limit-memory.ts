import { ApiError, serviceUnavailable } from "@/lib/api/errors";

export type RateLimitInfo = {
  limit: number;
  remaining: number;
  /** Unix timestamp (seconds) when the current window resets. */
  reset: number;
  retryAfterSeconds?: number;
};

export type RateLimitOptions = {
  maxRequests?: number;
  windowMs?: number;
};

export const DEFAULT_WINDOW_MS = 60_000;
export const DEFAULT_MAX_REQUESTS = 5;

export function tooManyRequests(
  message = "Too many requests. Please try again later.",
  info: RateLimitInfo,
): ApiError {
  return new ApiError("TOO_MANY_REQUESTS", message, 429, {
    retryAfterSeconds: info.retryAfterSeconds ?? 60,
    limit: info.limit,
    remaining: info.remaining,
    reset: info.reset,
  });
}

export function rateLimitUnavailable(
  message = "Rate limiting is temporarily unavailable. Please try again later.",
): ApiError {
  return serviceUnavailable(message);
}

export function rateLimitHeaders(info: RateLimitInfo): HeadersInit {
  return {
    "RateLimit-Limit": String(info.limit),
    "RateLimit-Remaining": String(Math.max(0, info.remaining)),
    "RateLimit-Reset": String(info.reset),
  };
}

type MemoryBucket = {
  hits: number[];
};

const memoryBuckets = new Map<string, MemoryBucket>();

/**
 * In-memory sliding-window limiter (per process).
 * Used for local/dev when Redis is unset, and as a configured fallback.
 */
export function enforceMemoryRateLimit(
  key: string,
  options?: RateLimitOptions,
): RateLimitInfo {
  const maxRequests = options?.maxRequests ?? DEFAULT_MAX_REQUESTS;
  const windowMs = options?.windowMs ?? DEFAULT_WINDOW_MS;
  const now = Date.now();
  const windowStart = now - windowMs;

  const bucket = memoryBuckets.get(key) ?? { hits: [] };
  bucket.hits = bucket.hits.filter((timestamp) => timestamp > windowStart);

  const reset = Math.ceil((now + windowMs) / 1000);

  if (bucket.hits.length >= maxRequests) {
    const oldest = bucket.hits[0] ?? now;
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((oldest + windowMs - now) / 1000),
    );
    memoryBuckets.set(key, bucket);
    const info: RateLimitInfo = {
      limit: maxRequests,
      remaining: 0,
      reset: Math.ceil((oldest + windowMs) / 1000),
      retryAfterSeconds,
    };
    throw tooManyRequests(undefined, info);
  }

  bucket.hits.push(now);
  memoryBuckets.set(key, bucket);

  return {
    limit: maxRequests,
    remaining: Math.max(0, maxRequests - bucket.hits.length),
    reset,
  };
}

/** Test helper — clears in-memory buckets between cases. */
export function resetMemoryRateLimitBuckets(): void {
  memoryBuckets.clear();
}
