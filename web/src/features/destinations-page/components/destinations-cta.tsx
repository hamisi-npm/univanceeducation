import { Container } from "@/components/layout/container";
import { CtaActions } from "@/features/cta/components/cta-actions";
import type { DestinationsCtaContent } from "@/features/destinations-page/types";
import { sectionStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

type DestinationsCtaProps = {
  content: DestinationsCtaContent;
  className?: string;
};

export function DestinationsCta({ content, className }: DestinationsCtaProps) {

  return (
    <section
      aria-labelledby="destinations-cta-heading"
      className={cn(
        "relative overflow-hidden",
        sectionStyles.sectionMuted,
        "py-20 sm:py-24 lg:py-28 xl:py-32",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,var(--muted)_0%,transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_100%,var(--primary)_0%,transparent_70%)] opacity-[0.05]"
      />

      <Container className="relative">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-10 text-center sm:gap-12">
          <div className="space-y-5">
            <span
              className={cn(
                sectionStyles.badge,
                sectionStyles.badgeOnMuted,
              )}
            >
              {content.badge}
            </span>
            <h2
              id="destinations-cta-heading"
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
