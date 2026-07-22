import { cache } from "react";

import { sanityTags } from "@/lib/sanity/cache-tags";
import { sanityFetch } from "@/lib/sanity/fetch";
import { singletonDocumentIds } from "@/lib/sanity/singletons";
import { mapProgramCard, mapProgramDetail } from "@/mappers/program";
import {
  mapProgramCards,
  mapProgramFilterOptions,
  mapProgramsPage,
} from "@/mappers/programs";
import {
  courseCategoriesQuery,
  degreeTypesQuery,
  facultiesQuery,
  featuredProgramsQuery,
  programBySlugQuery,
  programFilterOptionsQuery,
  programSlugsQuery,
  programsByDestinationQuery,
  programsByUniversityQuery,
  programsFilteredQuery,
  programsPageQuery,
  relatedProgramsQuery,
  studyLevelsQuery,
} from "@/queries/programs";
import type {
  SanityProgramCard,
  SanityProgramDetailDocument,
  SanityProgramFilterOptions,
  SanityProgramsPageDocument,
  SanityTaxonomyOption,
} from "@/types/sanity/programs";
import type {
  ProgramCard,
  ProgramDetail,
  ProgramFilterOptions,
  ProgramListFilters,
  ProgramListResult,
  ProgramsPageData,
} from "@/types/programs";

export const PROGRAMS_PAGE_SIZE = 12;

function normalizeFilter(value?: string): string {
  return value?.trim() ?? "";
}

function toMatchQuery(q: string): string {
  const trimmed = q.trim();
  if (!trimmed) {
    return "";
  }

  // GROQ match: wrap with wildcards for substring search
  return `*${trimmed}*`;
}

export const getProgramsPage = cache(async (): Promise<ProgramsPageData> => {
  const document = await sanityFetch<SanityProgramsPageDocument>({
    query: programsPageQuery,
    params: { id: singletonDocumentIds.programsPage },
    tags: [sanityTags.programsPage],
  });

  if (!document) {
    throw new Error("Missing Sanity singleton: programsPage");
  }

  return mapProgramsPage(document);
});

export const getProgramFilterOptions = cache(
  async (): Promise<ProgramFilterOptions> => {
    const options = await sanityFetch<SanityProgramFilterOptions>({
      query: programFilterOptionsQuery,
      tags: [
        sanityTags.programs,
        sanityTags.destinations,
        sanityTags.universities,
        sanityTags.courseCategory,
        sanityTags.studyLevel,
      ],
    });

    return mapProgramFilterOptions(options);
  },
);

export async function getPrograms(
  filters: ProgramListFilters = {},
): Promise<ProgramListResult> {
  const page = Math.max(1, filters.page ?? 1);
  const pageSize = PROGRAMS_PAGE_SIZE;
  const offset = (page - 1) * pageSize;
  const end = offset + pageSize;

  const result = await sanityFetch<{
    items: SanityProgramCard[] | null;
    total: number | null;
  }>({
    query: programsFilteredQuery,
    params: {
      destination: normalizeFilter(filters.destination),
      university: normalizeFilter(filters.university),
      category: normalizeFilter(filters.category),
      level: normalizeFilter(filters.level),
      q: toMatchQuery(normalizeFilter(filters.q)),
      offset,
      end,
    },
    tags: [sanityTags.programs, sanityTags.program],
  });

  const total = result?.total ?? 0;

  return {
    items: mapProgramCards(result?.items),
    total,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
  };
}

export const getProgramBySlug = cache(
  async (slug: string): Promise<ProgramDetail | null> => {
    const document = await sanityFetch<SanityProgramDetailDocument>({
      query: programBySlugQuery,
      params: { slug },
      tags: [sanityTags.program, sanityTags.programs],
    });

    if (!document) {
      return null;
    }

    return mapProgramDetail(document);
  },
);

export const getProgramSlugs = cache(async (): Promise<string[]> => {
  const slugs = await sanityFetch<Array<{ slug: string }>>({
    query: programSlugsQuery,
    tags: [sanityTags.program, sanityTags.programs],
  });

  return (slugs ?? []).map((item) => item.slug).filter(Boolean);
});

export const getProgramsByUniversity = cache(
  async (universitySlug: string, limit = 6): Promise<ProgramCard[]> => {
    const items = await sanityFetch<SanityProgramCard[]>({
      query: programsByUniversityQuery,
      params: { universitySlug, limit },
      tags: [sanityTags.programs, sanityTags.program, sanityTags.university],
    });

    return mapProgramCards(items);
  },
);

export const getProgramsByDestination = cache(
  async (destinationSlug: string, limit = 6): Promise<ProgramCard[]> => {
    const items = await sanityFetch<SanityProgramCard[]>({
      query: programsByDestinationQuery,
      params: { destinationSlug, limit },
      tags: [sanityTags.programs, sanityTags.program, sanityTags.destination],
    });

    return mapProgramCards(items);
  },
);

export const getRelatedPrograms = cache(
  async (params: {
    slug: string;
    categorySlug?: string;
    universitySlug?: string;
    limit?: number;
  }): Promise<ProgramCard[]> => {
    const items = await sanityFetch<SanityProgramCard[]>({
      query: relatedProgramsQuery,
      params: {
        slug: params.slug,
        categorySlug: params.categorySlug ?? "",
        universitySlug: params.universitySlug ?? "",
        limit: params.limit ?? 3,
      },
      tags: [sanityTags.programs, sanityTags.program],
    });

    return mapProgramCards(items);
  },
);

export const getFeaturedPrograms = cache(
  async (limit = 6): Promise<ProgramCard[]> => {
    const items = await sanityFetch<SanityProgramCard[]>({
      query: featuredProgramsQuery,
      params: { limit },
      tags: [sanityTags.programs, sanityTags.program],
    });

    return mapProgramCards(items);
  },
);

export const getCourseCategories = cache(async () => {
  return (
    (await sanityFetch<SanityTaxonomyOption[]>({
      query: courseCategoriesQuery,
      tags: [sanityTags.courseCategory],
    })) ?? []
  );
});

export const getStudyLevels = cache(async () => {
  return (
    (await sanityFetch<SanityTaxonomyOption[]>({
      query: studyLevelsQuery,
      tags: [sanityTags.studyLevel],
    })) ?? []
  );
});

export const getFaculties = cache(async () => {
  return (
    (await sanityFetch<SanityTaxonomyOption[]>({
      query: facultiesQuery,
      tags: [sanityTags.faculty],
    })) ?? []
  );
});

export const getDegreeTypes = cache(async () => {
  return (
    (await sanityFetch<SanityTaxonomyOption[]>({
      query: degreeTypesQuery,
      tags: [sanityTags.degreeType],
    })) ?? []
  );
});

/** Helper used when building related-program params from a detail document. */
export function toProgramCards(items: SanityProgramCard[]): ProgramCard[] {
  return items.map(mapProgramCard);
}
