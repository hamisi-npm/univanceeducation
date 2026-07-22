import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import type { ProgramsPageData } from "@/types/programs";
import { buttonStyles, sectionStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

type ProgramEmptyStateProps = {
  content: ProgramsPageData["emptyState"];
};

export function ProgramEmptyState({ content }: ProgramEmptyStateProps) {
  return (
    <div className="rounded-xl border border-dashed border-border bg-muted/30 px-6 py-16 text-center">
      <h2 className="text-xl font-semibold text-brand-navy">{content.heading}</h2>
      <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
        {content.description}
      </p>
    </div>
  );
}

type ProgramsCtaBannerProps = {
  content: ProgramsPageData["ctaBanner"];
};

export function ProgramsCtaBanner({ content }: ProgramsCtaBannerProps) {
  const cta = content.cta;

  return (
    <section
      aria-labelledby="programs-cta-heading"
      className={cn(sectionStyles.sectionNavy, sectionStyles.padding)}
    >
      <Container>
        <div className="mx-auto max-w-2xl space-y-6 text-center">
          <h2 id="programs-cta-heading" className={sectionStyles.headingOnDark}>
            {content.heading}
          </h2>
          <p className={cn(sectionStyles.descriptionOnDark, "mx-auto")}>
            {content.description}
          </p>
          <Button asChild size="lg" className={cn(buttonStyles.gold, "mx-auto")}>
            {cta.external ? (
              <a href={cta.href} target="_blank" rel="noopener noreferrer">
                {cta.label}
              </a>
            ) : (
              <Link href={cta.href}>{cta.label}</Link>
            )}
          </Button>
        </div>
      </Container>
    </section>
  );
}
