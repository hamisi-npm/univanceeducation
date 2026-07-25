import { afterEach, describe, expect, it, vi } from "vitest";

import { ApiError } from "@/lib/api/errors";
import { jsonError } from "@/lib/api/response";
import {
  enforceRateLimit,
  rateLimitHeaders,
  rateLimitKeyFromRequest,
  resetMemoryRateLimitBuckets,
  resetRedisRateLimitCache,
  resolveRateLimitFailMode,
} from "@/lib/security/rate-limit";
import type { RedisRateLimitClient } from "@/lib/security/rate-limit-redis";

function mockRedisClient(
  responses: Array<{
    success: boolean;
    limit: number;
    remaining: number;
    reset: number;
  }>,
): RedisRateLimitClient {
  let index = 0;
  return {
    limit: vi.fn(async () => {
      const next = responses[Math.min(index, responses.length - 1)]!;
      index += 1;
      return next;
    }),
  };
}

describe("resolveRateLimitFailMode", () => {
  it("defaults to memory outside production", () => {
    expect(resolveRateLimitFailMode("development")).toBe("memory");
    expect(resolveRateLimitFailMode("test")).toBe("memory");
  });

  it("defaults to unavailable in production", () => {
    expect(resolveRateLimitFailMode("production")).toBe("unavailable");
  });

  it("honors explicit RATE_LIMIT_REDIS_FAIL_MODE", () => {
    expect(resolveRateLimitFailMode("production", "memory")).toBe("memory");
    expect(resolveRateLimitFailMode("development", "unavailable")).toBe(
      "unavailable",
    );
  });
});

describe("enforceRateLimit (memory)", () => {
  afterEach(() => {
    resetMemoryRateLimitBuckets();
    resetRedisRateLimitCache();
  });

  it("allows requests under the limit", async () => {
    const info = await enforceRateLimit("contact:1.1.1.1", {
      forceBackend: "memory",
      maxRequests: 5,
      windowMs: 60_000,
    });
    expect(info.remaining).toBe(4);
    expect(info.limit).toBe(5);
  });

  it("allows exactly at the limit", async () => {
    for (let i = 0; i < 4; i += 1) {
      await enforceRateLimit("contact:at-limit", {
        forceBackend: "memory",
        maxRequests: 5,
        windowMs: 60_000,
      });
    }
    const info = await enforceRateLimit("contact:at-limit", {
      forceBackend: "memory",
      maxRequests: 5,
      windowMs: 60_000,
    });
    expect(info.remaining).toBe(0);
  });

  it("rejects when the limit is exceeded", async () => {
    for (let i = 0; i < 5; i += 1) {
      await enforceRateLimit("contact:over", {
        forceBackend: "memory",
        maxRequests: 5,
        windowMs: 60_000,
      });
    }

    await expect(
      enforceRateLimit("contact:over", {
        forceBackend: "memory",
        maxRequests: 5,
        windowMs: 60_000,
      }),
    ).rejects.toMatchObject({
      status: 429,
      code: "TOO_MANY_REQUESTS",
    });
  });

  it("isolates different scopes", async () => {
    for (let i = 0; i < 5; i += 1) {
      await enforceRateLimit("contact:same-ip", {
        forceBackend: "memory",
        maxRequests: 5,
        windowMs: 60_000,
      });
    }

    await expect(
      enforceRateLimit("newsletter:same-ip", {
        forceBackend: "memory",
        maxRequests: 8,
        windowMs: 60_000,
      }),
    ).resolves.toMatchObject({ limit: 8 });
  });

  it("isolates different IPs", async () => {
    for (let i = 0; i < 5; i += 1) {
      await enforceRateLimit("contact:10.0.0.1", {
        forceBackend: "memory",
        maxRequests: 5,
        windowMs: 60_000,
      });
    }

    await expect(
      enforceRateLimit("contact:10.0.0.2", {
        forceBackend: "memory",
        maxRequests: 5,
        windowMs: 60_000,
      }),
    ).resolves.toMatchObject({ remaining: 4 });
  });

  it("resets after the window elapses", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-01T00:00:00.000Z"));

    for (let i = 0; i < 5; i += 1) {
      await enforceRateLimit("contact:window", {
        forceBackend: "memory",
        maxRequests: 5,
        windowMs: 60_000,
      });
    }

    await expect(
      enforceRateLimit("contact:window", {
        forceBackend: "memory",
        maxRequests: 5,
        windowMs: 60_000,
      }),
    ).rejects.toMatchObject({ status: 429 });

    vi.setSystemTime(new Date("2026-01-01T00:01:01.000Z"));

    await expect(
      enforceRateLimit("contact:window", {
        forceBackend: "memory",
        maxRequests: 5,
        windowMs: 60_000,
      }),
    ).resolves.toMatchObject({ remaining: 4 });

    vi.useRealTimers();
  });

  it("calculates Retry-After on 429 responses", async () => {
    for (let i = 0; i < 5; i += 1) {
      await enforceRateLimit("contact:retry", {
        forceBackend: "memory",
        maxRequests: 5,
        windowMs: 60_000,
      });
    }

    try {
      await enforceRateLimit("contact:retry", {
        forceBackend: "memory",
        maxRequests: 5,
        windowMs: 60_000,
      });
      expect.unreachable("expected rate limit to throw");
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
      const response = jsonError(error as ApiError);
      expect(response.headers.get("Retry-After")).toBeTruthy();
      expect(Number(response.headers.get("Retry-After"))).toBeGreaterThan(0);
      expect(response.headers.get("RateLimit-Limit")).toBe("5");
      expect(response.headers.get("RateLimit-Remaining")).toBe("0");
      expect(response.headers.get("RateLimit-Reset")).toBeTruthy();
    }
  });
});

describe("enforceRateLimit (redis mock)", () => {
  afterEach(() => {
    resetMemoryRateLimitBuckets();
    resetRedisRateLimitCache();
  });

  it("uses Redis success results", async () => {
    const client = mockRedisClient([
      {
        success: true,
        limit: 5,
        remaining: 3,
        reset: Math.floor(Date.now() / 1000) + 60,
      },
    ]);

    const info = await enforceRateLimit("contact:redis", {
      forceBackend: "redis",
      redisClient: client,
      maxRequests: 5,
      windowMs: 60_000,
    });

    expect(info).toMatchObject({ limit: 5, remaining: 3 });
    expect(client.limit).toHaveBeenCalledWith("contact:redis");
  });

  it("throws 429 when Redis reports limited", async () => {
    const reset = Math.floor(Date.now() / 1000) + 42;
    const client = mockRedisClient([
      { success: false, limit: 5, remaining: 0, reset },
    ]);

    await expect(
      enforceRateLimit("contact:redis-limited", {
        forceBackend: "redis",
        redisClient: client,
      }),
    ).rejects.toMatchObject({
      status: 429,
      details: expect.objectContaining({
        retryAfterSeconds: expect.any(Number),
        limit: 5,
        remaining: 0,
        reset,
      }),
    });
  });

  it("falls back to memory when Redis is unavailable and failMode=memory", async () => {
    const client: RedisRateLimitClient = {
      limit: vi.fn(async () => {
        throw new Error("redis down");
      }),
    };

    const info = await enforceRateLimit("contact:fallback", {
      forceBackend: "redis",
      redisClient: client,
      failMode: "memory",
      maxRequests: 5,
      windowMs: 60_000,
    });

    expect(info.remaining).toBe(4);
  });

  it("returns 503 when Redis is unavailable and failMode=unavailable", async () => {
    const client: RedisRateLimitClient = {
      limit: vi.fn(async () => {
        throw new Error("redis down");
      }),
    };

    await expect(
      enforceRateLimit("contact:fail-closed", {
        forceBackend: "redis",
        redisClient: client,
        failMode: "unavailable",
      }),
    ).rejects.toMatchObject({
      status: 503,
      code: "SERVICE_UNAVAILABLE",
    });
  });
});

describe("rateLimit helpers", () => {
  it("builds scope:ip keys", () => {
    const request = new Request("http://localhost", {
      headers: { "x-forwarded-for": "203.0.113.10" },
    });
    expect(rateLimitKeyFromRequest(request, "contact")).toBe(
      "contact:203.0.113.10",
    );
    expect(rateLimitKeyFromRequest(request, "newsletter")).toBe(
      "newsletter:203.0.113.10",
    );
  });

  it("builds informational RateLimit headers", () => {
    const headers = new Headers(
      rateLimitHeaders({
        limit: 8,
        remaining: 2,
        reset: 1_700_000_000,
      }),
    );
    expect(headers.get("RateLimit-Limit")).toBe("8");
    expect(headers.get("RateLimit-Remaining")).toBe("2");
    expect(headers.get("RateLimit-Reset")).toBe("1700000000");
  });
});
