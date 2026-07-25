import { getRequestIp } from "@/lib/security/ip-hash";
import { ApiError } from "@/lib/api/errors";
import {
  enforceMemoryRateLimit,
  rateLimitUnavailable,
  type RateLimitInfo,
  type RateLimitOptions,
} from "@/lib/security/rate-limit-memory";
import {
  enforceRedisRateLimit,
  isUpstashConfigured,
  type RedisRateLimitClient,
} from "@/lib/security/rate-limit-redis";

export {
  DEFAULT_MAX_REQUESTS,
  DEFAULT_WINDOW_MS,
  rateLimitHeaders,
  resetMemoryRateLimitBuckets,
  tooManyRequests,
  type RateLimitInfo,
  type RateLimitOptions,
} from "@/lib/security/rate-limit-memory";

export { resetRedisRateLimitCache } from "@/lib/security/rate-limit-redis";

export type RateLimitFailMode = "memory" | "unavailable";

/**
 * Production + Redis configured but unreachable → 503 (fail closed).
 * Development / explicit memory mode → fall back to in-process Map.
 */
export function resolveRateLimitFailMode(
  nodeEnv = process.env.NODE_ENV,
  explicit = process.env.RATE_LIMIT_REDIS_FAIL_MODE,
): RateLimitFailMode {
  const normalized = explicit?.trim().toLowerCase();
  if (normalized === "memory" || normalized === "unavailable") {
    return normalized;
  }

  return nodeEnv === "production" ? "unavailable" : "memory";
}

export type EnforceRateLimitOptions = RateLimitOptions & {
  /** Injected Redis client for tests. */
  redisClient?: RedisRateLimitClient;
  /** Force backend selection in tests. */
  forceBackend?: "redis" | "memory";
  failMode?: RateLimitFailMode;
};

/**
 * Distributed rate limit when Upstash is configured; otherwise in-memory.
 * Public signature stays `enforceRateLimit` — now async for Redis I/O.
 */
export async function enforceRateLimit(
  key: string,
  options?: EnforceRateLimitOptions,
): Promise<RateLimitInfo> {
  const useRedis =
    options?.forceBackend === "redis" ||
    (options?.forceBackend !== "memory" &&
      (options?.redisClient != null || isUpstashConfigured()));

  if (!useRedis) {
    return enforceMemoryRateLimit(key, options);
  }

  try {
    return await enforceRedisRateLimit(key, {
      maxRequests: options?.maxRequests,
      windowMs: options?.windowMs,
      client: options?.redisClient,
    });
  } catch (error) {
    if (error instanceof ApiError && error.code === "TOO_MANY_REQUESTS") {
      throw error;
    }

    const failMode =
      options?.failMode ?? resolveRateLimitFailMode();

    if (failMode === "memory") {
      console.warn(
        "[rate-limit] Redis unavailable; falling back to in-memory limiter",
        error,
      );
      return enforceMemoryRateLimit(key, options);
    }

    console.error("[rate-limit] Redis unavailable; failing closed", error);
    throw rateLimitUnavailable();
  }
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

export {
  assertJsonBodyWithinLimit,
  MAX_JSON_BODY_BYTES,
  readJsonBodyWithinLimit,
} from "@/lib/security/request-body";
