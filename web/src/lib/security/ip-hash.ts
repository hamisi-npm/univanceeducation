import { createHash } from "node:crypto";

import { getAppEnv, getSiteOrigin } from "@/lib/env";

/**
 * One-way hash of a client IP for audit / rate-limit correlation.
 * Never store raw IPs in operational tables.
 */
export function hashIp(ip: string | null | undefined): string | null {
  if (!ip) {
    return null;
  }

  const env = getAppEnv();
  const salt = env.IP_HASH_SALT ?? getSiteOrigin();

  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

export function getRequestIp(headers: Headers): string | null {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) {
      return first;
    }
  }

  return headers.get("x-real-ip")?.trim() || null;
}
