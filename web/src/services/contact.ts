import { cache } from "react";

import { sanityTags } from "@/lib/sanity/cache-tags";
import { sanityFetch } from "@/lib/sanity/fetch";
import { applySiteOfficeToContactPage } from "@/mappers/apply-site-office";
import { mapContactPage } from "@/mappers/contact";
import { contactPageQuery } from "@/queries/contact";
import { singletonDocumentIds } from "@/lib/sanity/singletons";
import { getSiteConfig } from "@/services/site";
import type { SanityContactDocument } from "@/types/sanity/contact";
import type { ContactPageData } from "@/types/contact";

export const getContactPage = cache(async (): Promise<ContactPageData> => {
  const [document, site] = await Promise.all([
    sanityFetch<SanityContactDocument>({
      query: contactPageQuery,
      params: { id: singletonDocumentIds.contactPage },
      tags: [sanityTags.contact],
    }),
    getSiteConfig(),
  ]);

  if (!document) {
    throw new Error("Missing Sanity singleton: contactPage");
  }

  return applySiteOfficeToContactPage(mapContactPage(document), site);
});
