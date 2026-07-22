import Link from "next/link";
import { ArrowRight, Headset } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { CtaActions } from "@/features/cta/components/cta-actions";
import type { CtaSectionContent } from "@/features/cta/types";
import { buttonStyles, cardStyles, sectionStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

type CtaSectionProps = {
  content: CtaSectionContent;
  className?: string;
  /** `banner` = horizontal navy bar (homepage mid CTA). `default` = centered block. */
  variant?: "default" | "banner";
  headingId?: string;
};

export function CtaSection({
  content,
  className,
  variant = "default",
  headingId = "cta-section-heading",
}: CtaSectionProps) {
  if (variant === "banner") {
    const showSecondary =
      Boolean(content.secondaryCta.label) && Boolean(content.secondaryCta.href);

    return (
      <section
        aria-labelledby={headingId}
        className={cn(sectionStyles.sectionNavy, "py-10 sm:py-12", className)}
      >
        <Container>
          <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            <div className="flex min-w-0 items-start gap-4 sm:items-center">
              <div className={cn(cardStyles.iconCircle, "bg-brand-gold/15 text-brand-gold")}>
                <Headset className="size-6" aria-hidden="true" />
              </div>
              <div className="space-y-1">
                {content.badge ? (
                  <p className="text-sm font-semibold text-brand-gold">
                    {content.badge}
                  </p>
                ) : null}
                <h2
                  id={headingId}
                  className="text-balance text-xl font-semibold tracking-tight text-white sm:text-2xl"
                >
                  {content.heading}
                </h2>
              </div>
            </div>

            <p className="max-w-md text-pretty text-sm leading-relaxed text-white/80 lg:text-base">
              {content.description}
            </p>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button
                asChild
                size="lg"
                className={cn(
                  buttonStyles.gold,
                  "h-11 w-full gap-2 px-6 text-sm font-semibold sm:w-auto",
                )}
              >
                <Link href={content.primaryCta.href}>
                  {content.primaryCta.label}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
              {showSecondary ? (
                <Button
                  asChild
                  size="lg"
                  className={cn(
                    buttonStyles.outlineOnDark,
                    "h-11 w-full px-6 text-sm font-semibold sm:w-auto",
                  )}
                >
                  <Link href={content.secondaryCta.href}>
                    {content.secondaryCta.label}
                  </Link>
                </Button>
              ) : null}
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section
      aria-labelledby={headingId}
      className={cn(
        "relative overflow-hidden",
        sectionStyles.sectionNavy,
        "py-20 sm:py-24 lg:py-28",
        className,
      )}
    >
      <Container className="relative">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-10 text-center sm:gap-12">
          <div className="space-y-5">
            {content.badge ? (
              <span className={sectionStyles.badgeGold}>{content.badge}</span>
            ) : null}
            <h2
              id={headingId}
              className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              {content.heading}
            </h2>
            <p className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-white/80">
              {content.description}
            </p>
          </div>

          <CtaActions
            primaryCta={content.primaryCta}
            secondaryCta={content.secondaryCta}
            trustMicrocopy={content.trustMicrocopy}
            tone="onDark"
          />
        </div>
      </Container>
    </section>
  );
}
