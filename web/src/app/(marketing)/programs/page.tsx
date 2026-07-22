import { PageJsonLd } from "@/components/seo/page-json-ld";
import { ProgramsListingView } from "@/features/programs";
import { createCmsPageMetadata } from "@/lib/metadata";
import {
  getProgramFilterOptions,
  getPrograms,
  getProgramsPage,
} from "@/services/programs";
import type { ProgramListFilters } from "@/types/programs";

type ProgramsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function firstParam(
  value: string | string[] | undefined,
): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
}

function parseFilters(
  params: Record<string, string | string[] | undefined>,
): ProgramListFilters {
  const pageRaw = firstParam(params.page);
  const page = pageRaw ? Number.parseInt(pageRaw, 10) : 1;

  return {
    destination: firstParam(params.destination) || undefined,
    university: firstParam(params.university) || undefined,
    category: firstParam(params.category) || undefined,
    level: firstParam(params.level) || undefined,
    q: firstParam(params.q) || undefined,
    page: Number.isFinite(page) && page > 0 ? page : 1,
  };
}

export async function generateMetadata() {
  const page = await getProgramsPage();
  return createCmsPageMetadata("/programs", page.seo);
}

export default async function ProgramsPage({ searchParams }: ProgramsPageProps) {
  const params = await searchParams;
  const filters = parseFilters(params);

  const [page, list, filterOptions] = await Promise.all([
    getProgramsPage(),
    getPrograms(filters),
    getProgramFilterOptions(),
  ]);

  return (
    <main id="main-content">
      <PageJsonLd path="/programs" />
      <ProgramsListingView
        page={page}
        list={list}
        filterOptions={filterOptions}
        filters={filters}
      />
    </main>
  );
}
