export const newsletterPageKinds = [
  { title: "Newsletter Confirmation", value: "confirmation" },
  { title: "Already Subscribed", value: "already-subscribed" },
  { title: "Subscription Invalid", value: "invalid" },
  { title: "Subscription Expired", value: "expired" },
  { title: "Unsubscribed", value: "unsubscribed" },
  { title: "Already Unsubscribed", value: "already-unsubscribed" },
] as const;

export const emailTemplateKinds = [
  { title: "Consultation Confirmation", value: "consultation-confirmation" },
  { title: "Consultation Staff Notification", value: "consultation-staff" },
  { title: "Newsletter Confirmation", value: "newsletter-confirmation" },
  { title: "Newsletter Unsubscribed", value: "newsletter-unsubscribed" },
] as const;

export type NewsletterPageKind =
  (typeof newsletterPageKinds)[number]["value"];

export type EmailTemplateKind =
  (typeof emailTemplateKinds)[number]["value"];

/** Fixed document IDs for newsletter system pages. */
export const newsletterPageDocumentIds = {
  confirmation: "newsletterPage-confirmation",
  "already-subscribed": "newsletterPage-already-subscribed",
  invalid: "newsletterPage-invalid",
  expired: "newsletterPage-expired",
  unsubscribed: "newsletterPage-unsubscribed",
  "already-unsubscribed": "newsletterPage-already-unsubscribed",
} as const satisfies Record<NewsletterPageKind, string>;

/** Fixed document IDs for email templates. */
export const emailTemplateDocumentIds = {
  "consultation-confirmation": "emailTemplate-consultation-confirmation",
  "consultation-staff": "emailTemplate-consultation-staff",
  "newsletter-confirmation": "emailTemplate-newsletter-confirmation",
  "newsletter-unsubscribed": "emailTemplate-newsletter-unsubscribed",
} as const satisfies Record<EmailTemplateKind, string>;

export const systemMessagesDocumentId = "systemMessages";

export const cookiePolicyDocumentId = "cookiePolicy";
