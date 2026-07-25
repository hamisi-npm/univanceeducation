import { cache } from "react";

import {
  defaultEmailTemplates,
  defaultSystemMessages,
  getDefaultNewsletterPage,
} from "@/features/system/defaults";
import { sanityTags } from "@/lib/sanity/cache-tags";
import { sanityFetch } from "@/lib/sanity/fetch";
import {
  emailTemplateDocumentIds,
  newsletterPageDocumentIds,
  singletonDocumentIds,
  type EmailTemplateKind,
  type NewsletterPageKind,
} from "@/lib/sanity/singletons";
import {
  mapCookiePolicy,
  mapEmailTemplate,
  mapNewsletterSystemPage,
  mapSystemMessages,
} from "@/mappers/system";
import {
  cookiePolicyQuery,
  emailTemplateQuery,
  newsletterPageQuery,
  systemMessagesQuery,
} from "@/queries/system";
import type {
  CookiePolicyContent,
  EmailTemplateContent,
  NewsletterSystemPageContent,
  SystemMessagesContent,
} from "@/types/system";

export const getNewsletterSystemPage = cache(
  async (kind: NewsletterPageKind): Promise<NewsletterSystemPageContent> => {
    const document = await sanityFetch({
      query: newsletterPageQuery,
      params: { id: newsletterPageDocumentIds[kind] },
      tags: [sanityTags.newsletterPages],
    });

    return mapNewsletterSystemPage(
      document as Parameters<typeof mapNewsletterSystemPage>[0],
      getDefaultNewsletterPage(kind),
    );
  },
);

export const getEmailTemplate = cache(
  async (kind: EmailTemplateKind): Promise<EmailTemplateContent> => {
    const document = await sanityFetch({
      query: emailTemplateQuery,
      params: { id: emailTemplateDocumentIds[kind] },
      tags: [sanityTags.emailTemplates],
    });

    return mapEmailTemplate(
      document as Parameters<typeof mapEmailTemplate>[0],
      defaultEmailTemplates[kind],
    );
  },
);

export const getSystemMessages = cache(
  async (): Promise<SystemMessagesContent> => {
    const document = await sanityFetch({
      query: systemMessagesQuery,
      params: { id: singletonDocumentIds.systemMessages },
      tags: [sanityTags.systemMessages],
    });

    return mapSystemMessages(
      document as Parameters<typeof mapSystemMessages>[0],
      defaultSystemMessages,
    );
  },
);

export const getCookiePolicy = cache(
  async (): Promise<CookiePolicyContent> => {
    const document = await sanityFetch({
      query: cookiePolicyQuery,
      params: { id: singletonDocumentIds.cookiePolicy },
      tags: [sanityTags.cookiePolicy],
    });

    const mapped = mapCookiePolicy(
      document as Parameters<typeof mapCookiePolicy>[0],
    );

    if (!mapped) {
      throw new Error("Missing Sanity singleton: cookiePolicy");
    }

    return mapped;
  },
);
