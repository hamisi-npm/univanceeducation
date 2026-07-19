import type { StringRule, TextRule, UrlRule } from "@sanity/types";

const URL_PATTERN =
  /^(https?:\/\/)([\w-]+\.)+[\w-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=%]*)?$/i;

const INTERNAL_PATH_PATTERN = /^(\/|#)/;

export const limits = {
  seoTitle: 60,
  seoDescription: 160,
  shortLabel: 80,
  heading: 120,
  badge: 48,
  footnote: 80,
  phoneMin: 8,
  phoneMax: 32,
  slugSegment: 96,
} as const;

export function requiredString(message: string, max?: number) {
  return (rule: StringRule) => {
    let chain = rule.required().error(message);
    if (max !== undefined) {
      chain = chain.max(max);
    }
    return chain;
  };
}

export function requiredText(message: string, max?: number) {
  return (rule: TextRule) => {
    let chain = rule.required().error(message);
    if (max !== undefined) {
      chain = chain.max(max);
    }
    return chain;
  };
}

export function optionalUrl(rule: UrlRule) {
  return rule.custom((value: string | undefined) => {
    if (!value) {
      return true;
    }

    if (URL_PATTERN.test(value)) {
      return true;
    }

    return "Enter a valid absolute URL (https://…)";
  });
}

export function requiredHref(rule: StringRule) {
  return rule
    .required()
    .error("A link destination is required")
    .custom((value: string | undefined) => {
      if (!value) {
        return true;
      }

      if (INTERNAL_PATH_PATTERN.test(value) || URL_PATTERN.test(value)) {
        return true;
      }

      return "Use an internal path (/contact) or absolute URL (https://…)";
    });
}

export function requiredEmail(rule: StringRule) {
  return rule.required().email().error("Enter a valid email address");
}

export function requiredPhone(rule: StringRule) {
  return rule
    .required()
    .min(limits.phoneMin)
    .max(limits.phoneMax)
    .error(`Enter a valid phone number (${limits.phoneMin}–${limits.phoneMax} characters)`);
}

export function requiredUrl(rule: UrlRule) {
  return rule
    .required()
    .uri({ scheme: ["http", "https"] })
    .error("Enter a valid absolute URL (https://…)");
}
