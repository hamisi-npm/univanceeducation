import { cache } from "react";

import { sanityTags } from "@/lib/sanity/cache-tags";
import { sanityFetch } from "@/lib/sanity/fetch";
import {
  mapStudyGuideDetail,
  type SanityStudyGuideDetailDocument,
} from "@/mappers/study-guide";
import { mapStudyGuidesPage } from "@/mappers/study-guides";
import {
  studyGuideBySlugQuery,
  studyGuideSlugsQuery,
  studyGuidesPageQuery,
} from "@/queries/study-guides";
import { singletonDocumentIds } from "@/lib/sanity/singletons";
import type { StudyGuideDetail, StudyGuidesPageData } from "@/types/study-guides";

export const getStudyGuidesPage = cache(async (): Promise<StudyGuidesPageData> => {
  const document = await sanityFetch<Parameters<typeof mapStudyGuidesPage>[0]>({
    query: studyGuidesPageQuery,
    params: { id: singletonDocumentIds.studyGuidesPage },
    tags: [sanityTags.studyGuides, sanityTags.studyGuide],
  });

  if (!document) {
    throw new Error("Missing Sanity singleton: studyGuidesPage");
  }

  return mapStudyGuidesPage(document);
});

export const getStudyGuideSlugs = cache(async (): Promise<string[]> => {
  const slugs = await sanityFetch<Array<{ slug: string }>>({
    query: studyGuideSlugsQuery,
    tags: [sanityTags.studyGuide, sanityTags.studyGuides],
  });

  return (slugs ?? []).map((item) => item.slug);
});

export const getStudyGuideBySlug = cache(
  async (slug: string): Promise<StudyGuideDetail | null> => {
    const document = await sanityFetch<SanityStudyGuideDetailDocument>({
      query: studyGuideBySlugQuery,
      params: { slug },
      tags: [sanityTags.studyGuide, sanityTags.studyGuides],
    });

    if (!document) {
      return null;
    }

    return mapStudyGuideDetail(document);
  },
);
