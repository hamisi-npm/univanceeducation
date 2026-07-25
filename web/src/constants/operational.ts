/** Sources recorded on operational form submissions. */
export const CONSULTATION_SOURCES = {
  contactPage: "contact-page",
} as const;

export const NEWSLETTER_SOURCES = {
  footer: "footer",
  blog: "blog",
} as const;

export type ConsultationSource =
  (typeof CONSULTATION_SOURCES)[keyof typeof CONSULTATION_SOURCES];

export type NewsletterSource =
  (typeof NEWSLETTER_SOURCES)[keyof typeof NEWSLETTER_SOURCES];

/** Public API and page paths (also used by client forms / emails). */
export const API_ROUTES = {
  contact: "/api/contact",
  newsletter: "/api/newsletter",
  /** Legacy API path — redirects to branded confirm page. */
  newsletterConfirm: "/api/newsletter/confirm",
  newsletterUnsubscribe: "/api/newsletter/unsubscribe",
  newsletterConfirmPage: "/newsletter/confirm",
  newsletterUnsubscribePage: "/newsletter/unsubscribe",
} as const;
