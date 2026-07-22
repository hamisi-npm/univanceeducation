import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { ProgramGrid } from "@/features/programs";
import type { ProgramCard } from "@/types/programs";
import { buttonStyles, sectionStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

type RelatedProgramsSectionProps = {
  heading: string;
  programs: ProgramCard[];
  viewAllHref: string;
  viewAllLabel?: string;
  muted?: boolean;
};

export function RelatedProgramsSection({
  heading,
  programs,
  viewAllHref,
  viewAllLabel = "View all programs",
  muted = false,
}: RelatedProgramsSectionProps) {
  if (programs.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="related-programs-section-heading"
      className={cn(
        muted ? sectionStyles.sectionMuted : sectionStyles.sectionBackground,
        sectionStyles.padding,
      )}
    >
      <Container>
        <div className={sectionStyles.stack}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2
              id="related-programs-section-heading"
              className={sectionStyles.heading}
            >
              {heading}
            </h2>
            <Button asChild variant="outline" className={buttonStyles.responsiveOutline}>
              <Link href={viewAllHref}>
                {viewAllLabel}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
          <ProgramGrid programs={programs} />
        </div>
      </Container>
    </section>
  );
}
