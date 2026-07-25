import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

import {
  DEFAULT_MAX_REQUESTS,
  DEFAULT_WINDOW_MS,
  type RateLimitInfo,
  type RateLimitOptions,
  tooManyRequests,
} from "@/lib/security/rate-limit-memory";

export type RedisRateLimitClient = {
  limit: (identifier: string) => Promise<{
    success: boolean;
    limit: number;
    remaining: number;
    reset: number;
  }>;
};

type CachedLimiter = {
  maxRequests: number;
  windowMs: number;
  limiter: RedisRateLimitClient;
};

let redisSingleton: Redis | null | undefined;
const limiterCache = new Map<string, CachedLimiter>();

export function isUpstashConfigured(): boolean {
  return Boolean(
    process.env.UPSTASH_REDIS_REST_URL?.trim() &&
      process.env.UPSTASH_REDIS_REST_TOKEN?.trim(),
  );
}

function getRedis(): Redis {
  if (redisSingleton) {
    return redisSingleton;
  }

  redisSingleton = Redis.fromEnv();
  return redisSingleton;
}

function cacheKey(maxRequests: number, windowMs: number): string {
  return `${maxRequests}:${windowMs}`;
}

function createLimiter(
  maxRequests: number,
  windowMs: number,
): RedisRateLimitClient {
  const windowSeconds = Math.max(1, Math.ceil(windowMs / 1000));
  return new Ratelimit({
    redis: getRedis(),
    limiter: Ratelimit.slidingWindow(maxRequests, `${windowSeconds} s`),
    prefix: "univance:ratelimit",
    analytics: false,
  });
}

function getLimiter(
  maxRequests: number,
  windowMs: number,
  inject?: RedisRateLimitClient,
): RedisRateLimitClient {
  if (inject) {
    return inject;
  }

  const key = cacheKey(maxRequests, windowMs);
  const cached = limiterCache.get(key);
  if (cached) {
    return cached.limiter;
  }

  const limiter = createLimiter(maxRequests, windowMs);
  limiterCache.set(key, { maxRequests, windowMs, limiter });
  return limiter;
}

/**
 * Distributed sliding-window rate limit via Upstash Redis REST.
 */
export async function enforceRedisRateLimit(
  key: string,
  options?: RateLimitOptions & { client?: RedisRateLimitClient },
): Promise<RateLimitInfo> {
  const maxRequests = options?.maxRequests ?? DEFAULT_MAX_REQUESTS;
  const windowMs = options?.windowMs ?? DEFAULT_WINDOW_MS;
  const limiter = getLimiter(maxRequests, windowMs, options?.client);

  const result = await limiter.limit(key);
  const resetSeconds =
    result.reset > 1_000_000_000_000
      ? Math.ceil(result.reset / 1000)
      : Math.ceil(result.reset);

  const info: RateLimitInfo = {
    limit: result.limit,
    remaining: Math.max(0, result.remaining),
    reset: resetSeconds,
  };

  if (!result.success) {
    const retryAfterSeconds = Math.max(
      1,
      resetSeconds - Math.floor(Date.now() / 1000),
    );
    throw tooManyRequests(undefined, {
      ...info,
      remaining: 0,
      retryAfterSeconds,
    });
  }

  return info;
}

/** Test helper — clears cached Redis clients/limiters. */
export function resetRedisRateLimitCache(): void {
  redisSingleton = undefined;
  limiterCache.clear();
}
