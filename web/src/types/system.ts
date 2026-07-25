import type { CmsSeo } from "@/types/cms-seo";

export type CtaContent = {
  label: string;
  href: string;
  external?: boolean;
};

export type NewsletterSystemPageContent = {
  kind: string;
  badge: string;
  heading: string;
  description: string;
  bodyParagraphs: string[];
  illustration: {
    src: string;
    alt: string;
  } | null;
  primaryCta: CtaContent;
  secondaryCta: CtaContent | null;
  seo?: CmsSeo;
};

export type EmailTemplateContent = {
  kind: string;
  subject: string;
  heading: string;
  greeting: string;
  introduction: string;
  buttonLabel: string;
  buttonUrlPlaceholder: string;
  nextSteps: string;
  footerMessage: string;
  supportMessage: string;
  legalNote: string;
  signature: string;
};

export type SystemMessagesContent = {
  genericError: string;
  unexpectedError: string;
  maintenance: string;
  successGeneric: string;
  newsletterSubscribeSuccess: string;
  newsletterAlreadySubscribed: string;
  validationGeneric: string;
  globalNotice: string;
};

export type CookieCategoryContent = {
  title: string;
  description: string;
  examples: string[];
  retention: string;
};

export type CookiePolicyContent = {
  title: string;
  lastUpdated: string;
  lastUpdatedIso: string;
  introductionParagraphs: string[];
  necessary: CookieCategoryContent;
  functional: CookieCategoryContent;
  analytics: CookieCategoryContent;
  marketing: CookieCategoryContent;
  retentionSummary: string;
  thirdPartyServices: Array<{
    name: string;
    purpose: string;
    privacyUrl: string;
  }>;
  seo?: CmsSeo;
};
