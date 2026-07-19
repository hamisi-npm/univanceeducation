import { cache } from "react";

import { sanityTags } from "@/lib/sanity/cache-tags";
import { sanityFetch } from "@/lib/sanity/fetch";
import { mapPrivacyPolicy, mapTermsPage } from "@/mappers/legal";
import { legalPageQuery } from "@/queries/legal";
import { legalPageDocumentIds } from "@/lib/sanity/singletons";
import type { SanityLegalDocument } from "@/types/sanity/legal";
import type { LegalPageData } from "@/types/legal";

export const getPrivacyPolicy = cache(async (): Promise<LegalPageData> => {
  const document = await sanityFetch<SanityLegalDocument>({
    query: legalPageQuery,
    params: { id: legalPageDocumentIds.privacy },
    tags: [sanityTags.legalPrivacy],
  });

  if (!document) {
    throw new Error("Missing Sanity singleton: legalPage-privacy");
  }

  return mapPrivacyPolicy(document);
});

export const getTermsPage = cache(async (): Promise<LegalPageData> => {
  const document = await sanityFetch<SanityLegalDocument>({
    query: legalPageQuery,
    params: { id: legalPageDocumentIds.terms },
    tags: [sanityTags.legalTerms],
  });

  if (!document) {
    throw new Error("Missing Sanity singleton: legalPage-terms");
  }

  return mapTermsPage(document);
});
