import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import type {
  ProgramFilterOptions,
  ProgramFiltersChrome,
  ProgramListFilters,
} from "@/types/programs";
import { buttonStyles, focusRing, sectionStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

type ProgramFiltersProps = {
  chrome: ProgramFiltersChrome;
  options: ProgramFilterOptions;
  current: ProgramListFilters;
};

function buildClearHref(): string {
  return "/programs";
}

export function ProgramFilters({ chrome, options, current }: ProgramFiltersProps) {
  return (
    <section
      aria-labelledby="programs-filters-heading"
      className={cn(sectionStyles.sectionBackground, "border-b border-border/50")}
    >
      <Container className="py-8 sm:py-10">
        <div className="mb-6 space-y-2">
          {chrome.heading ? (
            <h2
              id="programs-filters-heading"
              className="text-lg font-semibold tracking-tight text-brand-navy"
            >
              {chrome.heading}
            </h2>
          ) : (
            <h2 id="programs-filters-heading" className="sr-only">
              Filter programs
            </h2>
          )}
          {chrome.description ? (
            <p className="text-sm text-muted-foreground">{chrome.description}</p>
          ) : null}
        </div>

        <form method="get" action="/programs" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <FilterSelect
              id="filter-destination"
              name="destination"
              label={chrome.destinationLabel}
              value={current.destination ?? ""}
              options={options.destinations.map((item) => ({
                value: item.slug,
                label: item.flag ? `${item.flag} ${item.label}` : item.label,
              }))}
            />
            <FilterSelect
              id="filter-university"
              name="university"
              label={chrome.universityLabel}
              value={current.university ?? ""}
              options={options.universities
                .filter(
                  (item) =>
                    !current.destination ||
                    item.destinationSlug === current.destination,
                )
                .map((item) => ({
                  value: item.slug,
                  label: item.label,
                }))}
            />
            <FilterSelect
              id="filter-category"
              name="category"
              label={chrome.categoryLabel}
              value={current.category ?? ""}
              options={options.categories.map((item) => ({
                value: item.slug,
                label: item.label,
              }))}
            />
            <FilterSelect
              id="filter-level"
              name="level"
              label={chrome.levelLabel}
              value={current.level ?? ""}
              options={options.levels.map((item) => ({
                value: item.slug,
                label: item.label,
              }))}
            />
            <div className="space-y-1.5">
              <label
                htmlFor="filter-q"
                className="block text-xs font-medium text-muted-foreground"
              >
                {chrome.keywordLabel}
              </label>
              <input
                id="filter-q"
                name="q"
                type="search"
                defaultValue={current.q ?? ""}
                placeholder={chrome.keywordPlaceholder}
                className={cn(
                  "h-11 w-full rounded-lg border border-border bg-card px-3 text-sm text-foreground outline-none",
                  "hover:border-brand-navy/30 focus:border-brand-navy focus:ring-1 focus:ring-brand-navy/30",
                  focusRing,
                )}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button type="submit" className={cn(buttonStyles.gold, "sm:w-auto")}>
              {chrome.submitLabel}
            </Button>
            <Button asChild variant="ghost" className="sm:w-auto">
              <Link href={buildClearHref()}>{chrome.clearLabel}</Link>
            </Button>
          </div>
        </form>
      </Container>
    </section>
  );
}

type FilterSelectProps = {
  id: string;
  name: string;
  label: string;
  value: string;
  options: Array<{ value: string; label: string }>;
};

function FilterSelect({ id, name, label, value, options }: FilterSelectProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-xs font-medium text-muted-foreground">
        {label}
      </label>
      <select
        id={id}
        name={name}
        defaultValue={value}
        className={cn(
          "h-11 w-full rounded-lg border border-border bg-card px-3 text-sm text-foreground outline-none",
          "hover:border-brand-navy/30 focus:border-brand-navy focus:ring-1 focus:ring-brand-navy/30",
          focusRing,
        )}
      >
        <option value="">All</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
