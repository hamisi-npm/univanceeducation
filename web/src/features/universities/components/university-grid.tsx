"use client";

import { useMemo, useState } from "react";

import { Container } from "@/components/layout/container";
import { CountryFilter } from "@/features/universities/components/country-filter";
import { UniversityCard } from "@/features/universities/components/university-card";
import type {
  BrowseByCountryContent,
  CountryOption,
  University,
} from "@/features/universities/types";
import { sectionStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

type UniversityGridProps = {
  section: BrowseByCountryContent;
  universities: University[];
  countryOptions: CountryOption[];
  className?: string;
};

export function UniversityGrid({
  section,
  universities,
  countryOptions,
  className,
}: UniversityGridProps) {
  const [selectedCountry, setSelectedCountry] = useState("all");

  const filteredUniversities = useMemo(() => {
    if (selectedCountry === "all") {
      return universities;
    }
    return universities.filter(
      (university) => university.countrySlug === selectedCountry,
    );
  }, [selectedCountry, universities]);

  const resultsLabel =
    selectedCountry === "all"
      ? `Showing all ${filteredUniversities.length} universities`
      : `Showing ${filteredUniversities.length} universities in ${
          countryOptions.find((country) => country.slug === selectedCountry)
            ?.label ?? selectedCountry
        }`;

  return (
    <section
      aria-labelledby="university-grid-heading"
      className={cn(sectionStyles.sectionBackground, sectionStyles.padding, className)}
    >
      <Container>
        <div className={sectionStyles.stack}>
          <div className={sectionStyles.header}>
            <span
              className={cn(
                sectionStyles.badge,
                sectionStyles.badgeOnBackground,
              )}
            >
              {section.badge}
            </span>
            <h2 id="university-grid-heading" className={sectionStyles.heading}>
              {section.heading}
            </h2>
            <p className={sectionStyles.description}>{section.description}</p>
          </div>

          <CountryFilter
            countries={countryOptions}
            selectedSlug={selectedCountry}
            onSelect={setSelectedCountry}
          />

          <p className="text-sm text-muted-foreground" aria-live="polite">
            {resultsLabel}
          </p>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredUniversities.map((university) => (
              <div key={university.id} className="h-full">
                <UniversityCard university={university} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
