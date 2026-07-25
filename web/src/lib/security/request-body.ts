import { ApiError, badRequest } from "@/lib/api/errors";

/** Maximum JSON request body size for public/mutation APIs (16 KiB). */
export const MAX_JSON_BODY_BYTES = 16_384;

export function payloadTooLarge(
  message = "Request body is too large.",
): ApiError {
  return new ApiError("BAD_REQUEST", message, 413);
}

/**
 * Parses `Content-Length` when it is a non-negative integer string.
 * Returns null when absent or malformed (header is then ignored).
 */
export function parseContentLengthHeader(
  contentLength: string | null,
): number | null {
  if (contentLength === null) {
    return null;
  }

  const trimmed = contentLength.trim();
  if (trimmed === "" || !/^\d+$/.test(trimmed)) {
    return null;
  }

  const size = Number(trimmed);
  if (!Number.isSafeInteger(size) || size < 0) {
    return null;
  }

  return size;
}

/**
 * Fast-path reject when a trustworthy Content-Length exceeds the limit.
 * Malformed / missing headers are ignored — the body stream is measured instead.
 */
export function assertContentLengthWithinLimit(
  request: Request,
  maxBytes: number = MAX_JSON_BODY_BYTES,
): void {
  const size = parseContentLengthHeader(request.headers.get("content-length"));
  if (size !== null && size > maxBytes) {
    throw payloadTooLarge();
  }
}

/**
 * Reads the request body while enforcing `maxBytes`.
 *
 * Stops as soon as the next chunk would exceed the limit (does not buffer
 * unbounded input). Compatible with the Web `Request` / `ReadableStream` API.
 */
export async function readBodyBytesWithinLimit(
  request: Request,
  maxBytes: number = MAX_JSON_BODY_BYTES,
): Promise<Uint8Array> {
  assertContentLengthWithinLimit(request, maxBytes);

  const body = request.body;
  if (!body) {
    return new Uint8Array(0);
  }

  const reader = body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      if (!value || value.byteLength === 0) {
        continue;
      }

      if (total + value.byteLength > maxBytes) {
        await reader.cancel().catch(() => undefined);
        throw payloadTooLarge();
      }

      total += value.byteLength;
      chunks.push(value);
    }
  } finally {
    try {
      reader.releaseLock();
    } catch {
      // Lock may already be released after cancel().
    }
  }

  if (chunks.length === 0) {
    return new Uint8Array(0);
  }
  if (chunks.length === 1) {
    return chunks[0]!;
  }

  const merged = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    merged.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return merged;
}

/**
 * Reads and parses a JSON body, enforcing {@link MAX_JSON_BODY_BYTES}.
 * Replaces Content-Length-only checks + `request.json()` for public APIs.
 */
export async function readJsonBodyWithinLimit(
  request: Request,
  maxBytes: number = MAX_JSON_BODY_BYTES,
): Promise<unknown> {
  const bytes = await readBodyBytesWithinLimit(request, maxBytes);

  if (bytes.byteLength === 0) {
    throw badRequest("Request body must be valid JSON.");
  }

  const text = new TextDecoder("utf-8").decode(bytes);

  try {
    return JSON.parse(text) as unknown;
  } catch {
    throw badRequest("Request body must be valid JSON.");
  }
}

/**
 * @deprecated Use {@link readJsonBodyWithinLimit} — Content-Length-only checks
 * are bypassable when the header is omitted.
 */
export function assertJsonBodyWithinLimit(request: Request): void {
  assertContentLengthWithinLimit(request, MAX_JSON_BODY_BYTES);
}
