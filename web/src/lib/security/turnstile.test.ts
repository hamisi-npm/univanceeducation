import { describe, expect, it, vi, afterEach } from "vitest";

import { ApiError } from "@/lib/api/errors";
import {
  verifyTurnstileToken,
  type TurnstileSiteverifyResponse,
} from "@/lib/security/turnstile";

function jsonResponse(body: unknown, init?: ResponseInit): Response {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "content-type": "application/json" },
    ...init,
  });
}

describe("verifyTurnstileToken", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("accepts a valid token", async () => {
    const fetchFn = vi.fn().mockResolvedValue(
      jsonResponse({ success: true } satisfies TurnstileSiteverifyResponse),
    );

    await expect(
      verifyTurnstileToken("valid-token", {
        secretKey: "test-secret",
        fetchFn: fetchFn as unknown as typeof fetch,
      }),
    ).resolves.toBeUndefined();

    expect(fetchFn).toHaveBeenCalledOnce();
  });

  it("rejects an invalid token", async () => {
    const fetchFn = vi.fn().mockResolvedValue(
      jsonResponse({
        success: false,
        "error-codes": ["invalid-input-response"],
      } satisfies TurnstileSiteverifyResponse),
    );

    await expect(
      verifyTurnstileToken("bad-token", {
        secretKey: "test-secret",
        fetchFn: fetchFn as unknown as typeof fetch,
      }),
    ).rejects.toMatchObject({
      status: 400,
      code: "BAD_REQUEST",
      message: "Security check failed. Please try again.",
    });
  });

  it("rejects a missing token", async () => {
    await expect(
      verifyTurnstileToken(undefined, { secretKey: "test-secret" }),
    ).rejects.toMatchObject({
      status: 400,
      message: "Please complete the security check.",
    });

    await expect(
      verifyTurnstileToken("", { secretKey: "test-secret" }),
    ).rejects.toMatchObject({ status: 400 });

    await expect(
      verifyTurnstileToken("   ", { secretKey: "test-secret" }),
    ).rejects.toMatchObject({ status: 400 });
  });

  it("rejects an expired / already-used token", async () => {
    const fetchFn = vi.fn().mockResolvedValue(
      jsonResponse({
        success: false,
        "error-codes": ["timeout-or-duplicate"],
      } satisfies TurnstileSiteverifyResponse),
    );

    await expect(
      verifyTurnstileToken("expired-token", {
        secretKey: "test-secret",
        fetchFn: fetchFn as unknown as typeof fetch,
      }),
    ).rejects.toMatchObject({ status: 400 });
  });

  it("fails closed on Cloudflare timeout", async () => {
    const fetchFn = vi.fn().mockRejectedValue(new Error("The operation was aborted"));

    await expect(
      verifyTurnstileToken("any-token", {
        secretKey: "test-secret",
        fetchFn: fetchFn as unknown as typeof fetch,
      }),
    ).rejects.toMatchObject({
      status: 400,
      message: "Security check failed. Please try again.",
    });
  });

  it("fails closed on Cloudflare network failure", async () => {
    const fetchFn = vi.fn().mockRejectedValue(new TypeError("fetch failed"));

    await expect(
      verifyTurnstileToken("any-token", {
        secretKey: "test-secret",
        fetchFn: fetchFn as unknown as typeof fetch,
      }),
    ).rejects.toMatchObject({ status: 400 });
  });

  it("fails closed on malformed Cloudflare response", async () => {
    const fetchFn = vi.fn().mockResolvedValue(
      new Response("not-json", {
        status: 200,
        headers: { "content-type": "text/plain" },
      }),
    );

    await expect(
      verifyTurnstileToken("any-token", {
        secretKey: "test-secret",
        fetchFn: fetchFn as unknown as typeof fetch,
      }),
    ).rejects.toMatchObject({ status: 400 });
  });

  it("fails closed when success field is missing", async () => {
    const fetchFn = vi.fn().mockResolvedValue(jsonResponse({ ok: true }));

    await expect(
      verifyTurnstileToken("any-token", {
        secretKey: "test-secret",
        fetchFn: fetchFn as unknown as typeof fetch,
      }),
    ).rejects.toMatchObject({ status: 400 });
  });

  it("fails closed when secret key is not configured", async () => {
    try {
      await verifyTurnstileToken("any-token", { secretKey: "" });
      expect.unreachable("expected missing secret to throw");
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
      expect((error as ApiError).status).toBe(503);
    }
  });
});
