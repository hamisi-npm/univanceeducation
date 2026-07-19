import { cache } from "react";

import { sanityTags } from "@/lib/sanity/cache-tags";
import { sanityFetch } from "@/lib/sanity/fetch";
import { mapHomepage } from "@/mappers/homepage";
import { homepageQuery } from "@/queries/homepage";
import { singletonDocumentIds } from "@/lib/sanity/singletons";
import type { SanityHomepageDocument } from "@/types/sanity/homepage";
import type { HomepageContent } from "@/types/homepage";

export const getHomepage = cache(async (): Promise<HomepageContent> => {
  const document = await sanityFetch<SanityHomepageDocument>({
    query: homepageQuery,
    params: { id: singletonDocumentIds.homepage },
    tags: [sanityTags.homepage],
  });

  if (!document) {
    throw new Error("Missing Sanity singleton: homepage");
  }

  return mapHomepage(document);
});
