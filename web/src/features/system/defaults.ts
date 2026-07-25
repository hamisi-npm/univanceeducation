import type {
  EmailTemplateContent,
  NewsletterSystemPageContent,
  SystemMessagesContent,
} from "@/types/system";
import type { NewsletterPageKind } from "@/lib/sanity/singletons";

export const defaultSystemMessages: SystemMessagesContent = {
  genericError: "Something went wrong. Please try again.",
  unexpectedError: "An unexpected server error occurred. Please try again later.",
  maintenance: "We are performing scheduled maintenance. Please check back soon.",
  successGeneric: "Success.",
  newsletterSubscribeSuccess: "Check your email to confirm your subscription.",
  newsletterAlreadySubscribed: "You are already subscribed.",
  validationGeneric: "Please check the highlighted fields and try again.",
  globalNotice: "",
};

const newsletterPageDefaults: Record<
  NewsletterPageKind,
  NewsletterSystemPageContent
> = {
  confirmation: {
    kind: "confirmation",
    badge: "Newsletter",
    heading: "Subscription confirmed",
    description:
      "Thank you for confirming. You are now subscribed to Univance Education updates.",
    bodyParagraphs: [
      "You will receive study-abroad tips, destination guides, and application deadlines when we publish them.",
    ],
    illustration: null,
    primaryCta: { label: "Explore programs", href: "/programs" },
    secondaryCta: { label: "Back to home", href: "/" },
    seo: {
      title: "Subscription confirmed",
      description: "Your Univance Education newsletter subscription is confirmed.",
    },
  },
  "already-subscribed": {
    kind: "already-subscribed",
    badge: "Newsletter",
    heading: "You are already subscribed",
    description: "This email address is already confirmed on our newsletter list.",
    bodyParagraphs: [],
    illustration: null,
    primaryCta: { label: "Explore programs", href: "/programs" },
    secondaryCta: { label: "Back to home", href: "/" },
    seo: {
      title: "Already subscribed",
      description: "You are already subscribed to the Univance Education newsletter.",
    },
  },
  invalid: {
    kind: "invalid",
    badge: "Newsletter",
    heading: "Link is invalid",
    description: "This newsletter link is invalid or incomplete.",
    bodyParagraphs: [
      "Request a new confirmation or unsubscribe link from the newsletter form on our website.",
    ],
    illustration: null,
    primaryCta: { label: "Go to contact", href: "/contact" },
    secondaryCta: { label: "Back to home", href: "/" },
    seo: {
      title: "Invalid newsletter link",
      description: "This newsletter confirmation or unsubscribe link is invalid.",
    },
  },
  expired: {
    kind: "expired",
    badge: "Newsletter",
    heading: "Link has expired",
    description: "This confirmation link is no longer valid.",
    bodyParagraphs: [
      "Subscribe again from our website to receive a fresh confirmation email.",
    ],
    illustration: null,
    primaryCta: { label: "Back to home", href: "/" },
    secondaryCta: { label: "Contact us", href: "/contact" },
    seo: {
      title: "Newsletter link expired",
      description: "This newsletter confirmation link has expired.",
    },
  },
  unsubscribed: {
    kind: "unsubscribed",
    badge: "Newsletter",
    heading: "You have been unsubscribed",
    description: "You will no longer receive newsletter emails from Univance Education.",
    bodyParagraphs: [
      "You can subscribe again at any time from our website footer or blog.",
    ],
    illustration: null,
    primaryCta: { label: "Back to home", href: "/" },
    secondaryCta: { label: "Explore programs", href: "/programs" },
    seo: {
      title: "Unsubscribed",
      description: "You have been unsubscribed from the Univance Education newsletter.",
    },
  },
  "already-unsubscribed": {
    kind: "already-unsubscribed",
    badge: "Newsletter",
    heading: "Already unsubscribed",
    description: "This email address is already unsubscribed from our newsletter.",
    bodyParagraphs: [],
    illustration: null,
    primaryCta: { label: "Back to home", href: "/" },
    secondaryCta: { label: "Contact us", href: "/contact" },
    seo: {
      title: "Already unsubscribed",
      description: "You are already unsubscribed from the Univance Education newsletter.",
    },
  },
};

export function getDefaultNewsletterPage(
  kind: NewsletterPageKind,
): NewsletterSystemPageContent {
  return newsletterPageDefaults[kind];
}

export const defaultEmailTemplates: Record<string, EmailTemplateContent> = {
  "consultation-confirmation": {
    kind: "consultation-confirmation",
    subject: "We received your consultation request — Univance Education",
    heading: "Consultation request received",
    greeting: "Hi {{fullName}},",
    introduction:
      "Thank you for contacting Univance Education. We received your consultation request and will follow up shortly.",
    buttonLabel: "Visit our website",
    buttonUrlPlaceholder: "{{siteUrl}}",
    nextSteps:
      "An advisor will review your preferred destination, intake, and study level, then contact you using the details you provided.",
    footerMessage: "You received this email because you submitted a consultation form.",
    supportMessage: "Need to update your details? Reply to this email.",
    legalNote: "Univance Education · Study abroad consultancy",
    signature: "— Univance Education",
  },
  "consultation-staff": {
    kind: "consultation-staff",
    subject: "New consultation request — {{fullName}}",
    heading: "New consultation request",
    greeting: "Hello team,",
    introduction: "A new consultation request was submitted on the website.",
    buttonLabel: "",
    buttonUrlPlaceholder: "",
    nextSteps: "Review the summary below and follow up with the applicant.",
    footerMessage: "Operational notification from univanceeducation.com",
    supportMessage: "",
    legalNote: "Internal use only",
    signature: "— Univance Education system",
  },
  "newsletter-confirmation": {
    kind: "newsletter-confirmation",
    subject: "Confirm your Univance Education newsletter subscription",
    heading: "Confirm your subscription",
    greeting: "Hello,",
    introduction:
      "Thanks for signing up for Univance Education updates. Confirm your email to start receiving our newsletter.",
    buttonLabel: "Confirm subscription",
    buttonUrlPlaceholder: "{{confirmUrl}}",
    nextSteps: "If you did not request this, you can ignore this email.",
    footerMessage: "You received this email because someone subscribed this address.",
    supportMessage: "Questions? Contact us via our website.",
    legalNote: "Univance Education · Study abroad consultancy",
    signature: "— Univance Education",
  },
  "newsletter-unsubscribed": {
    kind: "newsletter-unsubscribed",
    subject: "You have been unsubscribed — Univance Education",
    heading: "Unsubscription confirmed",
    greeting: "Hello,",
    introduction:
      "You have been removed from the Univance Education newsletter list. You will not receive further newsletter emails.",
    buttonLabel: "Visit our website",
    buttonUrlPlaceholder: "{{siteUrl}}",
    nextSteps: "You can subscribe again at any time from our website.",
    footerMessage: "This confirmation was sent after an unsubscribe request.",
    supportMessage: "If this was a mistake, subscribe again from our footer or blog.",
    legalNote: "Univance Education · Study abroad consultancy",
    signature: "— Univance Education",
  },
};
