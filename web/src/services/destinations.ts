import { cache } from "react";

import { sanityTags } from "@/lib/sanity/cache-tags";
import { sanityFetch } from "@/lib/sanity/fetch";
import {
  mapDestinationDetail,
  type SanityDestinationDetailDocument,
} from "@/mappers/destination";
import { mapDestinationsPage } from "@/mappers/destinations";
import {
  destinationBySlugQuery,
  destinationSlugsQuery,
  destinationsPageQuery,
} from "@/queries/destinations";
import { singletonDocumentIds } from "@/lib/sanity/singletons";
import type { DestinationDetail } from "@/types/destinations";
import type { DestinationsPageData } from "@/types/destinations";

export const getDestinationsPage = cache(async (): Promise<DestinationsPageData> => {
  const document = await sanityFetch<Parameters<typeof mapDestinationsPage>[0]>({
    query: destinationsPageQuery,
    params: { id: singletonDocumentIds.destinationsPage },
    tags: [sanityTags.destinations],
  });

  if (!document) {
    throw new Error("Missing Sanity singleton: destinationsPage");
  }

  return mapDestinationsPage(document);
});

export const getDestinationSlugs = cache(async (): Promise<string[]> => {
  const slugs = await sanityFetch<Array<{ slug: string }>>({
    query: destinationSlugsQuery,
    tags: [sanityTags.destination, sanityTags.destinations],
  });

  return (slugs ?? []).map((item) => item.slug);
});

export const getDestinationBySlug = cache(
  async (slug: string): Promise<DestinationDetail | null> => {
    const document = await sanityFetch<SanityDestinationDetailDocument>({
      query: destinationBySlugQuery,
      params: { slug },
      tags: [sanityTags.destination, sanityTags.destinations],
    });

    if (!document) {
      return null;
    }

    return mapDestinationDetail(document);
  },
);
