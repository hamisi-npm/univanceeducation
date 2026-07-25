import { defineQuery } from "next-sanity";

import { imageWithAltProjection } from "@/queries/global";

export const newsletterPageQuery = defineQuery(`*[_type == "newsletterPage" && _id == $id][0]{
  kind,
  hero {
    badge,
    heading,
    description
  },
  illustration ${imageWithAltProjection},
  body,
  primaryCta {
    label,
    href,
    external
  },
  secondaryCta {
    label,
    href,
    external
  },
  seo {
    title,
    description
  }
}`);

export const emailTemplateQuery = defineQuery(`*[_type == "emailTemplate" && _id == $id][0]{
  kind,
  subject,
  heading,
  greeting,
  introduction,
  buttonLabel,
  buttonUrlPlaceholder,
  nextSteps,
  footerMessage,
  supportMessage,
  legalNote,
  signature
}`);

export const systemMessagesQuery = defineQuery(`*[_type == "systemMessages" && _id == $id][0]{
  genericError,
  unexpectedError,
  maintenance,
  successGeneric,
  newsletterSubscribeSuccess,
  newsletterAlreadySubscribed,
  validationGeneric,
  globalNotice
}`);

export const cookiePolicyQuery = defineQuery(`*[_type == "cookiePolicy" && _id == $id][0]{
  title,
  lastUpdated,
  introduction,
  necessary {
    title,
    description,
    examples,
    retention
  },
  functional {
    title,
    description,
    examples,
    retention
  },
  analytics {
    title,
    description,
    examples,
    retention
  },
  marketing {
    title,
    description,
    examples,
    retention
  },
  retentionSummary,
  thirdPartyServices[] {
    name,
    purpose,
    privacyUrl
  },
  seo {
    title,
    description
  }
}`);
