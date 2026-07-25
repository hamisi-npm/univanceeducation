import { describe, expect, it } from "vitest";

import { ApiError } from "@/lib/api/errors";
import { assertHoneypotEmpty } from "@/lib/security/rate-limit";

describe("assertHoneypotEmpty", () => {
  it("passes when website is an empty string", () => {
    expect(() => assertHoneypotEmpty({ website: "" })).not.toThrow();
  });

  it("passes when website is omitted", () => {
    expect(() => assertHoneypotEmpty({ email: "a@b.co" })).not.toThrow();
  });

  it("rejects a filled website honeypot with BAD_REQUEST", () => {
    try {
      assertHoneypotEmpty({ website: "https://spam.com" });
      expect.unreachable("expected assertHoneypotEmpty to throw");
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
      const apiError = error as ApiError;
      expect(apiError.status).toBe(400);
      expect(apiError.code).toBe("BAD_REQUEST");
      expect(apiError.message).toBe("Invalid request.");
    }
  });

  it("rejects a filled companyWebsite honeypot", () => {
    expect(() =>
      assertHoneypotEmpty({ companyWebsite: "https://spam.com" }),
    ).toThrow(ApiError);
  });
});
