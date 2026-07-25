import { formatArticleDate } from "@/lib/format-article-date";
import { blocksToParagraphs } from "@/lib/sanity/utils/portable-text";
import { resolveSanityImage } from "@/lib/sanity/utils/image";
import type {
  CookieCategoryContent,
  CookiePolicyContent,
  EmailTemplateContent,
  NewsletterSystemPageContent,
  SystemMessagesContent,
} from "@/types/system";

type SanityCta = {
  label?: string | null;
  href?: string | null;
  external?: boolean | null;
} | null;

type SanityNewsletterPage = {
  kind?: string | null;
  hero?: {
    badge?: string | null;
    heading?: string | null;
    description?: string | null;
  } | null;
  illustration?: Parameters<typeof resolveSanityImage>[0];
  body?: Parameters<typeof blocksToParagraphs>[0];
  primaryCta?: SanityCta;
  secondaryCta?: SanityCta;
  seo?: NewsletterSystemPageContent["seo"];
};

type SanityEmailTemplate = {
  kind?: string | null;
  subject?: string | null;
  heading?: string | null;
  greeting?: string | null;
  introduction?: string | null;
  buttonLabel?: string | null;
  buttonUrlPlaceholder?: string | null;
  nextSteps?: string | null;
  footerMessage?: string | null;
  supportMessage?: string | null;
  legalNote?: string | null;
  signature?: string | null;
};

type SanitySystemMessages = {
  genericError?: string | null;
  unexpectedError?: string | null;
  maintenance?: string | null;
  successGeneric?: string | null;
  newsletterSubscribeSuccess?: string | null;
  newsletterAlreadySubscribed?: string | null;
  validationGeneric?: string | null;
  globalNotice?: string | null;
};

type SanityCookieCategory = {
  title?: string | null;
  description?: string | null;
  examples?: string[] | null;
  retention?: string | null;
};

type SanityCookiePolicy = {
  title?: string | null;
  lastUpdated?: string | null;
  introduction?: Parameters<typeof blocksToParagraphs>[0];
  necessary?: SanityCookieCategory | null;
  functional?: SanityCookieCategory | null;
  analytics?: SanityCookieCategory | null;
  marketing?: SanityCookieCategory | null;
  retentionSummary?: string | null;
  thirdPartyServices?: Array<{
    name?: string | null;
    purpose?: string | null;
    privacyUrl?: string | null;
  }> | null;
  seo?: CookiePolicyContent["seo"];
};

function mapCta(
  cta: SanityCta | undefined,
  fallback: { label: string; href: string },
) {
  return {
    label: cta?.label?.trim() || fallback.label,
    href: cta?.href?.trim() || fallback.href,
    external: Boolean(cta?.external),
  };
}

function mapCookieCategory(
  category: SanityCookieCategory | null | undefined,
  fallbackTitle: string,
): CookieCategoryContent {
  return {
    title: category?.title?.trim() || fallbackTitle,
    description: category?.description?.trim() || "",
    examples: category?.examples?.filter(Boolean) ?? [],
    retention: category?.retention?.trim() || "",
  };
}

export function mapNewsletterSystemPage(
  document: SanityNewsletterPage | null | undefined,
  fallback: NewsletterSystemPageContent,
): NewsletterSystemPageContent {
  if (!document) {
    return fallback;
  }

  return {
    kind: document.kind || fallback.kind,
    badge: document.hero?.badge?.trim() || fallback.badge,
    heading: document.hero?.heading?.trim() || fallback.heading,
    description: document.hero?.description?.trim() || fallback.description,
    bodyParagraphs: blocksToParagraphs(document.body).length
      ? blocksToParagraphs(document.body)
      : fallback.bodyParagraphs,
    illustration: resolveSanityImage(document.illustration),
    primaryCta: mapCta(document.primaryCta, fallback.primaryCta),
    secondaryCta: document.secondaryCta?.label
      ? mapCta(document.secondaryCta, {
          label: document.secondaryCta.label,
          href: document.secondaryCta.href || "/",
        })
      : fallback.secondaryCta,
    seo: document.seo ?? fallback.seo,
  };
}

export function mapEmailTemplate(
  document: SanityEmailTemplate | null | undefined,
  fallback: EmailTemplateContent,
): EmailTemplateContent {
  if (!document) {
    return fallback;
  }

  return {
    kind: document.kind || fallback.kind,
    subject: document.subject?.trim() || fallback.subject,
    heading: document.heading?.trim() || fallback.heading,
    greeting: document.greeting?.trim() || fallback.greeting,
    introduction: document.introduction?.trim() || fallback.introduction,
    buttonLabel: document.buttonLabel?.trim() || fallback.buttonLabel,
    buttonUrlPlaceholder:
      document.buttonUrlPlaceholder?.trim() || fallback.buttonUrlPlaceholder,
    nextSteps: document.nextSteps?.trim() || fallback.nextSteps,
    footerMessage: document.footerMessage?.trim() || fallback.footerMessage,
    supportMessage: document.supportMessage?.trim() || fallback.supportMessage,
    legalNote: document.legalNote?.trim() || fallback.legalNote,
    signature: document.signature?.trim() || fallback.signature,
  };
}

export function mapSystemMessages(
  document: SanitySystemMessages | null | undefined,
  fallback: SystemMessagesContent,
): SystemMessagesContent {
  if (!document) {
    return fallback;
  }

  return {
    genericError: document.genericError?.trim() || fallback.genericError,
    unexpectedError: document.unexpectedError?.trim() || fallback.unexpectedError,
    maintenance: document.maintenance?.trim() || fallback.maintenance,
    successGeneric: document.successGeneric?.trim() || fallback.successGeneric,
    newsletterSubscribeSuccess:
      document.newsletterSubscribeSuccess?.trim() ||
      fallback.newsletterSubscribeSuccess,
    newsletterAlreadySubscribed:
      document.newsletterAlreadySubscribed?.trim() ||
      fallback.newsletterAlreadySubscribed,
    validationGeneric:
      document.validationGeneric?.trim() || fallback.validationGeneric,
    globalNotice: document.globalNotice?.trim() || fallback.globalNotice,
  };
}

export function mapCookiePolicy(
  document: SanityCookiePolicy | null | undefined,
): CookiePolicyContent | null {
  if (!document) {
    return null;
  }

  const lastUpdatedIso = document.lastUpdated || "";

  return {
    title: document.title?.trim() || "Cookie Policy",
    lastUpdated: lastUpdatedIso ? formatArticleDate(lastUpdatedIso) : "",
    lastUpdatedIso,
    introductionParagraphs: blocksToParagraphs(document.introduction),
    necessary: mapCookieCategory(document.necessary, "Necessary"),
    functional: mapCookieCategory(document.functional, "Functional"),
    analytics: mapCookieCategory(document.analytics, "Analytics"),
    marketing: mapCookieCategory(document.marketing, "Marketing"),
    retentionSummary: document.retentionSummary?.trim() || "",
    thirdPartyServices:
      document.thirdPartyServices?.map((service) => ({
        name: service.name?.trim() || "",
        purpose: service.purpose?.trim() || "",
        privacyUrl: service.privacyUrl?.trim() || "",
      })) ?? [],
    seo: document.seo,
  };
}
