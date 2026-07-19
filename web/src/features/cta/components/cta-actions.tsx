import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { CtaSectionContent } from "@/features/cta/types";
import { buttonStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

type CtaActionsProps = {
  primaryCta: CtaSectionContent["primaryCta"];
  secondaryCta: CtaSectionContent["secondaryCta"];
  trustMicrocopy: CtaSectionContent["trustMicrocopy"];
  className?: string;
};

export function CtaActions({
  primaryCta,
  secondaryCta,
  trustMicrocopy,
  className,
}: CtaActionsProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-6 text-center",
        className,
      )}
    >
      <div className="flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-4">
        <Button asChild size="lg" className={buttonStyles.responsiveLg}>
          <Link href={primaryCta.href}>{primaryCta.label}</Link>
        </Button>
        <Button
          asChild
          variant="outline"
          size="lg"
          className={buttonStyles.responsiveOutline}
        >
          {secondaryCta.external ? (
            <a
              href={secondaryCta.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {secondaryCta.label}
            </a>
          ) : (
            <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
          )}
        </Button>
      </div>
      <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
        {trustMicrocopy}
      </p>
    </div>
  );
}
