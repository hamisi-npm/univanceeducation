import { type NextRequest } from "next/server";

import { CONSULTATION_SOURCES } from "@/constants/operational";
import { methodNotAllowed } from "@/lib/api/errors";
import { handleRouteError, jsonSuccess } from "@/lib/api/response";
import { getRequestIp, hashIp } from "@/lib/security/ip-hash";
import {
  assertHoneypotEmpty,
  enforceRateLimit,
  rateLimitHeaders,
  rateLimitKeyFromRequest,
} from "@/lib/security/rate-limit";
import {
  assertContentLengthWithinLimit,
  readJsonBodyWithinLimit,
} from "@/lib/security/request-body";
import {
  readTurnstileToken,
  verifyTurnstileToken,
} from "@/lib/security/turnstile";
import { submitConsultation } from "@/features/consultations/services/consultation-service";

export function contactMethodNotAllowed() {
  return handleRouteError(methodNotAllowed(["POST"]));
}

export async function handleCreateConsultation(request: NextRequest) {
  try {
    assertContentLengthWithinLimit(request);

    const rate = await enforceRateLimit(
      rateLimitKeyFromRequest(request, "contact"),
      {
        maxRequests: 5,
        windowMs: 60_000,
      },
    );

    const body = await readJsonBodyWithinLimit(request);

    const remoteip = getRequestIp(request.headers);
    await verifyTurnstileToken(readTurnstileToken(body), { remoteip });

    assertHoneypotEmpty(body);

    const ipHash = hashIp(remoteip);

    const data = await submitConsultation(body, {
      source: CONSULTATION_SOURCES.contactPage,
      ipHash,
    });

    return jsonSuccess(data, 201, rateLimitHeaders(rate));
  } catch (error) {
    return handleRouteError(error);
  }
}
