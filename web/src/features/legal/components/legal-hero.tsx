import { Container } from "@/components/layout/container";
import type { LegalHeroContent } from "@/features/legal/types";
import { sectionStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

type LegalHeroProps = {
  content: LegalHeroContent;
  className?: string;
};

export function LegalHero({ content, className }: LegalHeroProps) {
  return (
    <section
      aria-labelledby="legal-hero-heading"
      className={cn(
        "relative -mt-14 overflow-hidden bg-background pt-14",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_-20%,var(--muted)_0%,transparent_60%)]"
        aria-hidden="true"
      />

      <Container className="relative py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className={cn(sectionStyles.header, "items-center")}>
            <span
              className={cn(
                sectionStyles.badge,
                sectionStyles.badgeOnBackground,
                "mx-auto",
              )}
            >
              {content.badge}
            </span>
            <h1
              id="legal-hero-heading"
              className="text-balance text-3xl font-medium tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            >
              {content.heading}
            </h1>
            <p className={cn(sectionStyles.description, "mx-auto")}>
              {content.description}
            </p>
            <p className="text-sm text-muted-foreground">
              Last updated:{" "}
              <time dateTime={content.lastUpdatedIso}>{content.lastUpdated}</time>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
