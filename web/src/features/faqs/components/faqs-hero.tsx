import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import type { FaqsHeroContent } from "@/features/faqs/types";
import { buttonStyles, sectionStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

type FaqsHeroProps = {
  content: FaqsHeroContent;
  className?: string;
};

export function FaqsHero({ content, className }: FaqsHeroProps) {

  return (
    <section
      aria-labelledby="faqs-hero-heading"
      className={cn(
        "relative -mt-14 overflow-hidden bg-background pt-14",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_-20%,var(--muted)_0%,transparent_60%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-background"
        aria-hidden="true"
      />

      <Container className="relative py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className={cn(sectionStyles.header, "items-center")}>
            <span
              className={cn(
                sectionStyles.badge,
                sectionStyles.badgeOnBackground,
              )}
            >
              {content.badge}
            </span>
            <h1
              id="faqs-hero-heading"
              className="text-balance text-3xl font-medium tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            >
              {content.heading}
            </h1>
            <p className={cn(sectionStyles.description, "mx-auto")}>
              {content.description}
            </p>
          </div>

          <div className="mt-8 flex justify-center">
            <Button asChild size="lg" className={buttonStyles.responsiveLg}>
              <Link href={content.cta.href}>{content.cta.label}</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
