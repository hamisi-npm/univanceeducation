import { cache } from "react";

import { sanityTags } from "@/lib/sanity/cache-tags";
import { sanityFetch } from "@/lib/sanity/fetch";
import { singletonDocumentIds } from "@/lib/sanity/singletons";
import { mapHomepage } from "@/mappers/homepage";
import { homepageQuery } from "@/queries/homepage";
import { getProgramFilterOptions } from "@/services/programs";
import type { SanityHomepageDocument } from "@/types/sanity/homepage";
import type { HomepageContent } from "@/types/homepage";

export const getHomepage = cache(async (): Promise<HomepageContent> => {
  const [document, filterOptions] = await Promise.all([
    sanityFetch<SanityHomepageDocument>({
      query: homepageQuery,
      params: { id: singletonDocumentIds.homepage },
      tags: [sanityTags.homepage],
    }),
    getProgramFilterOptions(),
  ]);

  if (!document) {
    throw new Error("Missing Sanity singleton: homepage");
  }

  return mapHomepage(document, {
    destinations: filterOptions.destinations.map((item) => ({
      value: item.slug,
      label: item.flag ? `${item.flag} ${item.label}` : item.label,
    })),
    categories: filterOptions.categories.map((item) => ({
      value: item.slug,
      label: item.label,
    })),
    levels: filterOptions.levels.map((item) => ({
      value: item.slug,
      label: item.label,
    })),
  });
});
