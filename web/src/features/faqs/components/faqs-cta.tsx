import { Container } from "@/components/layout/container";
import { CtaActions } from "@/features/cta/components/cta-actions";
import type { FaqsCtaContent } from "@/features/faqs/types";
import { sectionStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

type FaqsCtaProps = {
  content: FaqsCtaContent;
  className?: string;
};

export function FaqsCta({ content, className }: FaqsCtaProps) {

  return (
    <section
      aria-labelledby="faqs-cta-heading"
      className={cn(
        "relative overflow-hidden",
        sectionStyles.sectionBackground,
        "py-20 sm:py-24 lg:py-28 xl:py-32",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,var(--muted)_0%,transparent_60%)]"
      />

      <Container className="relative">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-10 text-center sm:gap-12">
          <div className="space-y-5">
            <span
              className={cn(
                sectionStyles.badge,
                sectionStyles.badgeOnBackground,
              )}
            >
              {content.badge}
            </span>
            <h2
              id="faqs-cta-heading"
              className="text-balance text-3xl font-medium tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            >
              {content.heading}
            </h2>
            <p className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              {content.description}
            </p>
          </div>

          <CtaActions
            primaryCta={content.primaryCta}
            secondaryCta={content.secondaryCta}
            trustMicrocopy={content.trustMicrocopy}
          />
        </div>
      </Container>
    </section>
  );
}
