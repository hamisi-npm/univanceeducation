import { z } from "zod";

/**
 * Matches HTML tag syntax: optional slash, tag name starting with a letter,
 * optional attributes, closing `>`.
 *
 * Intentionally does not match comparisons like `3 < 5` (no letter after `<`).
 */
const HTML_TAG_PATTERN = /<\/?[a-zA-Z][^>]*>/;

/**
 * C0/C1 controls excluding tab, LF, and CR.
 * Allowed whitespace: space, tab, newline, carriage return.
 */
const DISALLOWED_CONTROL_CHARS =
  /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/;

const DEFAULT_HTML_MESSAGE = "HTML tags are not allowed";
const DEFAULT_CONTROL_MESSAGE = "Invalid characters are not allowed";

export function containsHtmlTags(value: string): boolean {
  return HTML_TAG_PATTERN.test(value);
}

export function containsDisallowedControlChars(value: string): boolean {
  return DISALLOWED_CONTROL_CHARS.test(value);
}

type SafeTextOptions = {
  min: number;
  max: number;
  minMessage?: string;
  maxMessage?: string;
  htmlMessage?: string;
  controlMessage?: string;
};

function withSafeContentChecks(
  schema: z.ZodString,
  htmlMessage: string,
  controlMessage: string,
) {
  return schema
    .refine((value) => !containsHtmlTags(value), { message: htmlMessage })
    .refine((value) => !containsDisallowedControlChars(value), {
      message: controlMessage,
    });
}

/**
 * Trimmed free-text field with length bounds, HTML-tag rejection,
 * and control-character rejection (tab/LF/CR/space allowed).
 */
export function safeText(options: SafeTextOptions) {
  const {
    min,
    max,
    minMessage,
    maxMessage,
    htmlMessage = DEFAULT_HTML_MESSAGE,
    controlMessage = DEFAULT_CONTROL_MESSAGE,
  } = options;

  const base = z.string().trim();
  const withMin = minMessage ? base.min(min, minMessage) : base.min(min);
  const withMax = maxMessage
    ? withMin.max(max, maxMessage)
    : withMin.max(max);

  return withSafeContentChecks(withMax, htmlMessage, controlMessage);
}

/**
 * Same rules as {@link safeText}; use for longer message / textarea fields.
 */
export function safeLongText(options: SafeTextOptions) {
  return safeText(options);
}
