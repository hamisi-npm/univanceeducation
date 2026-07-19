import { cache } from "react";

import type { FaqsPageContent } from "@/features/faqs/types";
import { sanityTags } from "@/lib/sanity/cache-tags";
import { sanityFetch } from "@/lib/sanity/fetch";
import { mapFaqsPage } from "@/mappers/faqs";
import { faqsPageQuery } from "@/queries/faqs";
import { singletonDocumentIds } from "@/lib/sanity/singletons";

export const getFaqPage = cache(async (): Promise<FaqsPageContent> => {
  const document = await sanityFetch<Parameters<typeof mapFaqsPage>[0]>({
    query: faqsPageQuery,
    params: { id: singletonDocumentIds.faqsPage },
    tags: [sanityTags.faqs],
  });

  if (!document) {
    throw new Error("Missing Sanity singleton: faqsPage");
  }

  return mapFaqsPage(document);
});
