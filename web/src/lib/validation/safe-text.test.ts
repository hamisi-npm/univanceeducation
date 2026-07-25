import { describe, expect, it } from "vitest";

import {
  containsDisallowedControlChars,
  containsHtmlTags,
  safeText,
} from "@/lib/validation/safe-text";

describe("containsHtmlTags", () => {
  it.each([
    "John Smith",
    "Mary-Jane",
    "O'Connor",
    "Jean Luc",
    "عبدالله",
    "李小龙",
    "Computer Science & AI",
    "BSc (Hons)",
    "3 < 5",
    "C++ Developer",
  ])("allows legitimate text: %s", (value) => {
    expect(containsHtmlTags(value)).toBe(false);
  });

  it.each([
    "<b>John</b>",
    "<script>alert(1)</script>",
    "<img src=x>",
    "<div>Hello</div>",
    "<iframe>",
  ])("rejects HTML tags: %s", (value) => {
    expect(containsHtmlTags(value)).toBe(true);
  });
});

describe("containsDisallowedControlChars", () => {
  it("allows tab, newline, carriage return, and spaces", () => {
    expect(containsDisallowedControlChars("line1\nline2")).toBe(false);
    expect(containsDisallowedControlChars("col1\tcol2")).toBe(false);
    expect(containsDisallowedControlChars("a\r\nb")).toBe(false);
    expect(containsDisallowedControlChars("John Smith")).toBe(false);
  });

  it("rejects embedded C0/C1 control characters", () => {
    expect(containsDisallowedControlChars("John\u0000Smith")).toBe(true);
    expect(containsDisallowedControlChars("bad\u0007bell")).toBe(true);
    expect(containsDisallowedControlChars("x\u001F")).toBe(true);
    expect(containsDisallowedControlChars("y\u007F")).toBe(true);
    expect(containsDisallowedControlChars("z\u0085")).toBe(true);
  });
});

describe("safeText", () => {
  const nameSchema = safeText({
    min: 2,
    max: 120,
    minMessage: "Please enter your full name",
  });

  it.each([
    "John Smith",
    "Mary-Jane",
    "O'Connor",
    "Jean Luc",
    "عبدالله",
    "李小龙",
    "Computer Science & AI",
    "BSc (Hons)",
    "3 < 5",
    "C++ Developer",
  ])("parses legitimate values: %s", (value) => {
    expect(nameSchema.safeParse(value).success).toBe(true);
  });

  it.each([
    "<b>John</b>",
    "<script>alert(1)</script>",
    "<img src=x>",
    "<div>Hello</div>",
    "<iframe>",
  ])("rejects HTML: %s", (value) => {
    const result = nameSchema.safeParse(value);
    expect(result.success).toBe(false);
  });

  it("rejects control characters", () => {
    const result = nameSchema.safeParse("John\u0000Smith");
    expect(result.success).toBe(false);
  });

  it("trims before validating length", () => {
    expect(nameSchema.safeParse("  John Smith  ").success).toBe(true);
    expect(nameSchema.safeParse("  ").success).toBe(false);
  });
});
