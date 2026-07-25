import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { z } from "zod";

import { ApiError } from "@/lib/api/errors";
import { resolveRevalidateTags } from "@/lib/sanity/revalidate-tags";
import {
  MAX_JSON_BODY_BYTES,
  readBodyBytesWithinLimit,
} from "@/lib/security/request-body";

/**
 * Minimal payload contract for tag resolution.
 * Additional projection fields are ignored. Unknown `_type` values still
 * invalidate `sanity:global` via `resolveRevalidateTags()`.
 */
const webhookPayloadSchema = z.object({
  _type: z.string().trim().min(1).max(128),
  _id: z.string().max(256).optional(),
  kind: z.string().trim().max(64).optional(),
  slug: z
    .union([
      z.string().max(256),
      z.object({ current: z.string().max(256).optional() }),
    ])
    .optional(),
});

type WebhookPayload = z.infer<typeof webhookPayloadSchema>;

const isDevelopment = process.env.NODE_ENV === "development";

/** Prevent static optimization of a mutation endpoint. */
export const dynamic = "force-dynamic";

function methodNotAllowedResponse(): NextResponse {
  return NextResponse.json(
    { revalidated: false, message: "Method not allowed." },
    { status: 405, headers: { Allow: "POST" } },
  );
}

function unauthorizedResponse(): NextResponse {
  return NextResponse.json(
    { revalidated: false, message: "Invalid signature." },
    { status: 401 },
  );
}

function badRequestResponse(): NextResponse {
  return NextResponse.json(
    { revalidated: false, message: "Invalid payload." },
    { status: 400 },
  );
}

function payloadTooLargeResponse(): NextResponse {
  return NextResponse.json(
    { revalidated: false, message: "Request body is too large." },
    { status: 413 },
  );
}

function serverErrorResponse(): NextResponse {
  return NextResponse.json(
    { revalidated: false, message: "Unexpected server error." },
    { status: 500 },
  );
}

export function GET() {
  return methodNotAllowedResponse();
}

export function PUT() {
  return methodNotAllowedResponse();
}

export function PATCH() {
  return methodNotAllowedResponse();
}

export function DELETE() {
  return methodNotAllowedResponse();
}

/**
 * Rebuilds a Request with a size-capped body so `parseBody` can verify the
 * Sanity webhook HMAC against the exact bytes we accepted.
 */
function requestWithLimitedBody(
  request: NextRequest,
  body: Uint8Array,
): NextRequest {
  const headers = new Headers(request.headers);
  headers.set("content-length", String(body.byteLength));

  const bodyCopy = new Uint8Array(body.byteLength);
  bodyCopy.set(body);

  return new NextRequest(request.url, {
    method: request.method,
    headers,
    body: new Blob([bodyCopy]),
  });
}

export async function POST(request: NextRequest) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET?.trim();

    if (!secret) {
      if (isDevelopment) {
        console.error("[revalidate] SANITY_REVALIDATE_SECRET is not configured");
      }

      return serverErrorResponse();
    }

    let limitedBody: Uint8Array;
    try {
      limitedBody = await readBodyBytesWithinLimit(
        request,
        MAX_JSON_BODY_BYTES,
      );
    } catch (error) {
      if (error instanceof ApiError && error.status === 413) {
        return payloadTooLargeResponse();
      }
      throw error;
    }

    let isValidSignature: boolean | null;
    let parsed: WebhookPayload | null;

    try {
      // Official helper: raw body read, HMAC verification, JSON parse.
      // `false` preserves immediate revalidation (no Content Lake delay).
      const result = await parseBody<WebhookPayload>(
        requestWithLimitedBody(request, limitedBody),
        secret,
        false,
      );
      isValidSignature = result.isValidSignature;
      parsed = result.body;
    } catch {
      return badRequestResponse();
    }

    if (!isValidSignature) {
      if (isDevelopment) {
        console.warn("[revalidate] webhook signature verification failed");
      }

      return unauthorizedResponse();
    }

    if (!parsed || typeof parsed !== "object") {
      return badRequestResponse();
    }

    const validation = webhookPayloadSchema.safeParse(parsed);

    if (!validation.success) {
      return badRequestResponse();
    }

    const { _type, _id, kind, slug } = validation.data;
    const tags = resolveRevalidateTags({
      _type,
      _id,
      kind: kind === "privacy" || kind === "terms" ? kind : undefined,
      slug,
    });

    for (const tag of tags) {
      revalidateTag(tag, { expire: 0 });
    }

    return NextResponse.json({ revalidated: true });
  } catch (error) {
    if (error instanceof ApiError && error.status === 413) {
      return payloadTooLargeResponse();
    }
    return serverErrorResponse();
  }
}
