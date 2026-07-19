import { cache } from "react";

import { sanityTags } from "@/lib/sanity/cache-tags";
import { sanityFetch } from "@/lib/sanity/fetch";
import {
  mapUniversityDetail,
  type SanityUniversityDetailDocument,
} from "@/mappers/university";
import { mapUniversitiesPage } from "@/mappers/universities";
import {
  universitiesPageQuery,
  universityBySlugQuery,
  universitySlugsQuery,
} from "@/queries/universities";
import { singletonDocumentIds } from "@/lib/sanity/singletons";
import type { UniversitiesPageData, UniversityDetail } from "@/types/universities";

export const getUniversitiesPage = cache(async (): Promise<UniversitiesPageData> => {
  const document = await sanityFetch<Parameters<typeof mapUniversitiesPage>[0]>({
    query: universitiesPageQuery,
    params: { id: singletonDocumentIds.universitiesPage },
    tags: [sanityTags.universities],
  });

  if (!document) {
    throw new Error("Missing Sanity singleton: universitiesPage");
  }

  return mapUniversitiesPage(document);
});

export const getUniversitySlugs = cache(async (): Promise<string[]> => {
  const slugs = await sanityFetch<Array<{ slug: string }>>({
    query: universitySlugsQuery,
    tags: [sanityTags.university, sanityTags.universities],
  });

  return (slugs ?? []).map((item) => item.slug);
});

export const getUniversityBySlug = cache(
  async (slug: string): Promise<UniversityDetail | null> => {
    const document = await sanityFetch<SanityUniversityDetailDocument>({
      query: universityBySlugQuery,
      params: { slug },
      tags: [sanityTags.university, sanityTags.universities],
    });

    if (!document) {
      return null;
    }

    return mapUniversityDetail(document);
  },
);
