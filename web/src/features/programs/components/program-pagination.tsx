import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import type { ProgramListFilters } from "@/types/programs";

type ProgramPaginationProps = {
  page: number;
  totalPages: number;
  filters: ProgramListFilters;
  className?: string;
};

function buildPageHref(page: number, filters: ProgramListFilters): string {
  const params = new URLSearchParams();

  if (filters.destination) params.set("destination", filters.destination);
  if (filters.university) params.set("university", filters.university);
  if (filters.category) params.set("category", filters.category);
  if (filters.level) params.set("level", filters.level);
  if (filters.q) params.set("q", filters.q);
  if (page > 1) params.set("page", String(page));

  const query = params.toString();
  return query ? `/programs?${query}` : "/programs";
}

export function ProgramPagination({
  page,
  totalPages,
  filters,
  className,
}: ProgramPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const prevPage = page > 1 ? page - 1 : null;
  const nextPage = page < totalPages ? page + 1 : null;

  return (
    <nav
      aria-label="Programs pagination"
      className={cn("flex items-center justify-center gap-4", className)}
    >
      {prevPage ? (
        <Link
          href={buildPageHref(prevPage, filters)}
          className="inline-flex items-center gap-1 text-sm font-medium text-brand-navy hover:text-brand-gold"
          rel="prev"
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
          Previous
        </Link>
      ) : (
        <span className="inline-flex items-center gap-1 text-sm text-muted-foreground/50">
          <ChevronLeft className="size-4" aria-hidden="true" />
          Previous
        </span>
      )}

      <p className="text-sm text-muted-foreground" aria-current="page">
        Page {page} of {totalPages}
      </p>

      {nextPage ? (
        <Link
          href={buildPageHref(nextPage, filters)}
          className="inline-flex items-center gap-1 text-sm font-medium text-brand-navy hover:text-brand-gold"
          rel="next"
        >
          Next
          <ChevronRight className="size-4" aria-hidden="true" />
        </Link>
      ) : (
        <span className="inline-flex items-center gap-1 text-sm text-muted-foreground/50">
          Next
          <ChevronRight className="size-4" aria-hidden="true" />
        </span>
      )}
    </nav>
  );
}
