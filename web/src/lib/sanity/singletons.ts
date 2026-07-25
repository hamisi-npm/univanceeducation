/**
 * Fixed document IDs for singleton fetches (must match Studio desk structure).
 */
export const singletonDocumentIds = {
  siteSettings: "siteSettings",
  navigation: "navigation",
  footer: "footer",
  homepage: "homepage",
  aboutPage: "aboutPage",
  contactPage: "contactPage",
  faqsPage: "faqsPage",
  servicesPage: "servicesPage",
  destinationsPage: "destinationsPage",
  universitiesPage: "universitiesPage",
  programsPage: "programsPage",
  blogPage: "blogPage",
  studyGuidesPage: "studyGuidesPage",
  systemMessages: "systemMessages",
  cookiePolicy: "cookiePolicy",
} as const;

/** Fixed IDs for legal singletons (same schema type, unique `kind`). */
export const legalPageDocumentIds = {
  privacy: "legalPage-privacy",
  terms: "legalPage-terms",
} as const;

export const newsletterPageDocumentIds = {
  confirmation: "newsletterPage-confirmation",
  "already-subscribed": "newsletterPage-already-subscribed",
  invalid: "newsletterPage-invalid",
  expired: "newsletterPage-expired",
  unsubscribed: "newsletterPage-unsubscribed",
  "already-unsubscribed": "newsletterPage-already-unsubscribed",
} as const;

export const emailTemplateDocumentIds = {
  "consultation-confirmation": "emailTemplate-consultation-confirmation",
  "consultation-staff": "emailTemplate-consultation-staff",
  "newsletter-confirmation": "emailTemplate-newsletter-confirmation",
  "newsletter-unsubscribed": "emailTemplate-newsletter-unsubscribed",
} as const;

export type SingletonDocumentType = keyof typeof singletonDocumentIds;
export type NewsletterPageKind = keyof typeof newsletterPageDocumentIds;
export type EmailTemplateKind = keyof typeof emailTemplateDocumentIds;
