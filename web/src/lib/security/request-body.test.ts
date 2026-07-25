import { describe, expect, it } from "vitest";

import { ApiError } from "@/lib/api/errors";
import {
  MAX_JSON_BODY_BYTES,
  parseContentLengthHeader,
  readBodyBytesWithinLimit,
  readJsonBodyWithinLimit,
} from "@/lib/security/request-body";

function streamRequest(
  body: string,
  headers?: HeadersInit,
): Request {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(body);
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(bytes);
      controller.close();
    },
  });

  return new Request("http://localhost/api/test", {
    method: "POST",
    headers,
    body: stream,
    duplex: "half",
  } as RequestInit);
}

describe("parseContentLengthHeader", () => {
  it("returns null when Content-Length is missing", () => {
    expect(parseContentLengthHeader(null)).toBeNull();
  });

  it("parses a valid Content-Length", () => {
    expect(parseContentLengthHeader("128")).toBe(128);
    expect(parseContentLengthHeader(" 16384 ")).toBe(16_384);
  });

  it("returns null for invalid Content-Length values", () => {
    expect(parseContentLengthHeader("")).toBeNull();
    expect(parseContentLengthHeader("abc")).toBeNull();
    expect(parseContentLengthHeader("12.5")).toBeNull();
    expect(parseContentLengthHeader("-1")).toBeNull();
    expect(parseContentLengthHeader("1e3")).toBeNull();
  });

  it("returns null for malformed Content-Length values", () => {
    expect(parseContentLengthHeader("16_384")).toBeNull();
    expect(parseContentLengthHeader("100; charset=utf-8")).toBeNull();
    expect(parseContentLengthHeader("0x10")).toBeNull();
  });
});

describe("readBodyBytesWithinLimit", () => {
  it("accepts a request under 16 KB", async () => {
    const body = "x".repeat(100);
    const bytes = await readBodyBytesWithinLimit(streamRequest(body));
    expect(bytes.byteLength).toBe(100);
  });

  it("accepts a request exactly 16 KB", async () => {
    const body = "a".repeat(MAX_JSON_BODY_BYTES);
    const bytes = await readBodyBytesWithinLimit(streamRequest(body));
    expect(bytes.byteLength).toBe(MAX_JSON_BODY_BYTES);
  });

  it("rejects a request over 16 KB with HTTP 413", async () => {
    const body = "a".repeat(MAX_JSON_BODY_BYTES + 1);
    try {
      await readBodyBytesWithinLimit(streamRequest(body));
      expect.unreachable("expected oversize body to throw");
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
      const apiError = error as ApiError;
      expect(apiError.status).toBe(413);
      expect(apiError.code).toBe("BAD_REQUEST");
      expect(apiError.message).toBe("Request body is too large.");
    }
  });

  it("enforces the limit when Content-Length is missing", async () => {
    const body = "b".repeat(MAX_JSON_BODY_BYTES + 50);
    // streamRequest does not set Content-Length
    await expect(readBodyBytesWithinLimit(streamRequest(body))).rejects.toMatchObject({
      status: 413,
    });
  });

  it("rejects early when Content-Length exceeds the limit", async () => {
    const request = streamRequest("ok", {
      "content-length": String(MAX_JSON_BODY_BYTES + 1),
    });
    await expect(readBodyBytesWithinLimit(request)).rejects.toMatchObject({
      status: 413,
    });
  });

  it("ignores invalid Content-Length and measures the body", async () => {
    const body = JSON.stringify({ ok: true });
    const bytes = await readBodyBytesWithinLimit(
      streamRequest(body, { "content-length": "not-a-number" }),
    );
    expect(bytes.byteLength).toBe(new TextEncoder().encode(body).byteLength);
  });

  it("ignores malformed Content-Length and measures the body", async () => {
    const body = "hello";
    const bytes = await readBodyBytesWithinLimit(
      streamRequest(body, { "content-length": "12.5" }),
    );
    expect(new TextDecoder().decode(bytes)).toBe("hello");
  });
});

describe("readJsonBodyWithinLimit", () => {
  it("parses valid JSON under the limit", async () => {
    const payload = { email: "a@b.co", website: "" };
    const result = await readJsonBodyWithinLimit(
      streamRequest(JSON.stringify(payload)),
    );
    expect(result).toEqual(payload);
  });

  it("rejects oversized JSON with HTTP 413", async () => {
    const payload = { message: "m".repeat(MAX_JSON_BODY_BYTES) };
    await expect(
      readJsonBodyWithinLimit(streamRequest(JSON.stringify(payload))),
    ).rejects.toMatchObject({ status: 413 });
  });

  it("rejects invalid JSON under the size limit", async () => {
    await expect(
      readJsonBodyWithinLimit(streamRequest("{not-json")),
    ).rejects.toMatchObject({ status: 400 });
  });
});
