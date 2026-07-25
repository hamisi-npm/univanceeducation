import { type NextRequest } from "next/server";

import { CONSULTATION_SOURCES } from "@/constants/operational";
import { badRequest, methodNotAllowed } from "@/lib/api/errors";
import { handleRouteError, jsonSuccess } from "@/lib/api/response";
import { getRequestIp, hashIp } from "@/lib/security/ip-hash";
import {
  assertHoneypotEmpty,
  assertJsonBodyWithinLimit,
  enforceRateLimit,
  rateLimitKeyFromRequest,
} from "@/lib/security/rate-limit";
import { submitConsultation } from "@/features/consultations/services/consultation-service";

export function contactMethodNotAllowed() {
  return handleRouteError(methodNotAllowed(["POST"]));
}

export async function handleCreateConsultation(request: NextRequest) {
  try {
    assertJsonBodyWithinLimit(request);
    enforceRateLimit(rateLimitKeyFromRequest(request, "contact"), {
      maxRequests: 5,
      windowMs: 60_000,
    });

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return handleRouteError(badRequest("Request body must be valid JSON."));
    }

    assertHoneypotEmpty(body);

    const ipHash = hashIp(getRequestIp(request.headers));

    const data = await submitConsultation(body, {
      source: CONSULTATION_SOURCES.contactPage,
      ipHash,
    });

    return jsonSuccess(data, 201);
  } catch (error) {
    return handleRouteError(error);
  }
}
