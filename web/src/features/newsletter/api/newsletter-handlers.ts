import {
  resolveNewsletterConfirmationPage,
  resolveNewsletterUnsubscribePage,
  subscribeNewsletter,
} from "@/features/newsletter/services/newsletter-service";
import { methodNotAllowed } from "@/lib/api/errors";
import { handleRouteError, jsonSuccess } from "@/lib/api/response";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { API_ROUTES } from "@/constants/operational";
import { badRequest } from "@/lib/api/errors";
import {
  assertHoneypotEmpty,
  assertJsonBodyWithinLimit,
  enforceRateLimit,
  rateLimitKeyFromRequest,
} from "@/lib/security/rate-limit";

export function newsletterMethodNotAllowed() {
  return handleRouteError(methodNotAllowed(["POST"]));
}

export function newsletterConfirmMethodNotAllowed() {
  return handleRouteError(methodNotAllowed(["GET"]));
}

export async function handleSubscribeNewsletter(request: NextRequest) {
  try {
    assertJsonBodyWithinLimit(request);
    enforceRateLimit(rateLimitKeyFromRequest(request, "newsletter"), {
      maxRequests: 8,
      windowMs: 60_000,
    });

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return handleRouteError(badRequest("Request body must be valid JSON."));
    }

    assertHoneypotEmpty(body);

    const data = await subscribeNewsletter(body);
    return jsonSuccess(data, data.alreadySubscribed ? 200 : 201);
  } catch (error) {
    return handleRouteError(error);
  }
}

/** Legacy API confirm → branded page (never raw JSON for users). */
export async function handleConfirmNewsletterRedirect(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token") ?? "";
  const url = new URL(API_ROUTES.newsletterConfirmPage, request.nextUrl.origin);
  if (token) {
    url.searchParams.set("token", token);
  }
  return NextResponse.redirect(url, 303);
}

export async function handleUnsubscribeNewsletterRedirect(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token") ?? "";
  const url = new URL(API_ROUTES.newsletterUnsubscribePage, request.nextUrl.origin);
  if (token) {
    url.searchParams.set("token", token);
  }
  return NextResponse.redirect(url, 303);
}

export {
  resolveNewsletterConfirmationPage,
  resolveNewsletterUnsubscribePage,
};
