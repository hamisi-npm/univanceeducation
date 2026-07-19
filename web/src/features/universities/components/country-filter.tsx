"use client";

import { Button } from "@/components/ui/button";
import type { CountryOption } from "@/features/universities/types";
import { focusRing } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

type CountryFilterProps = {
  countries: CountryOption[];
  selectedSlug: string;
  onSelect: (slug: string) => void;
  className?: string;
};

export function CountryFilter({
  countries,
  selectedSlug,
  onSelect,
  className,
}: CountryFilterProps) {
  return (
    <div
      role="tablist"
      aria-label="Filter universities by country"
      className={cn("flex flex-wrap justify-center gap-2 sm:justify-start", className)}
    >
      <Button
        type="button"
        role="tab"
        aria-selected={selectedSlug === "all"}
        variant={selectedSlug === "all" ? "default" : "outline"}
        size="sm"
        className={cn("h-9 px-4", focusRing)}
        onClick={() => onSelect("all")}
      >
        All countries
      </Button>
      {countries.map((country) => (
        <Button
          key={country.slug}
          type="button"
          role="tab"
          aria-selected={selectedSlug === country.slug}
          variant={selectedSlug === country.slug ? "default" : "outline"}
          size="sm"
          className={cn("h-9 gap-1.5 px-4", focusRing)}
          onClick={() => onSelect(country.slug)}
        >
          <span aria-hidden="true">{country.flag}</span>
          {country.label}
        </Button>
      ))}
    </div>
  );
}
