import { Container } from "@/components/layout/container";
import { ProgramFilters } from "@/features/programs/components/program-filters";
import { ProgramGrid } from "@/features/programs/components/program-grid";
import {
  ProgramHero,
  ProgramStatistics,
} from "@/features/programs/components/program-hero";
import {
  ProgramEmptyState,
  ProgramsCtaBanner,
} from "@/features/programs/components/program-listing-chrome";
import { ProgramPagination } from "@/features/programs/components/program-pagination";
import type {
  ProgramFilterOptions,
  ProgramListFilters,
  ProgramListResult,
  ProgramsPageData,
} from "@/types/programs";
import { sectionStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

type ProgramsListingViewProps = {
  page: ProgramsPageData;
  list: ProgramListResult;
  filterOptions: ProgramFilterOptions;
  filters: ProgramListFilters;
};

export function ProgramsListingView({
  page,
  list,
  filterOptions,
  filters,
}: ProgramsListingViewProps) {
  const resultsLabel = page.resultsCountLabel.replace(
    "{count}",
    String(list.total),
  );

  return (
    <>
      <ProgramHero content={page.hero} />
      <ProgramStatistics statistics={page.statistics} />
      <ProgramFilters
        chrome={page.filters}
        options={filterOptions}
        current={filters}
      />

      <section
        aria-labelledby="programs-results-heading"
        className={cn(sectionStyles.sectionBackground, sectionStyles.padding)}
      >
        <Container>
          <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h2
              id="programs-results-heading"
              className="text-lg font-semibold text-foreground"
            >
              {resultsLabel}
            </h2>
          </div>

          {list.items.length > 0 ? (
            <div className="space-y-10">
              <ProgramGrid programs={list.items} />
              <ProgramPagination
                page={list.page}
                totalPages={list.totalPages}
                filters={filters}
              />
            </div>
          ) : (
            <ProgramEmptyState content={page.emptyState} />
          )}
        </Container>
      </section>

      <ProgramsCtaBanner content={page.ctaBanner} />
    </>
  );
}
