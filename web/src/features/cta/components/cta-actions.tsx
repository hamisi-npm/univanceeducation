import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { CtaSectionContent } from "@/features/cta/types";
import { buttonStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

type CtaActionsProps = {
  primaryCta: CtaSectionContent["primaryCta"];
  secondaryCta: CtaSectionContent["secondaryCta"];
  trustMicrocopy: CtaSectionContent["trustMicrocopy"];
  className?: string;
  tone?: "default" | "onDark";
};

export function CtaActions({
  primaryCta,
  secondaryCta,
  trustMicrocopy,
  className,
  tone = "default",
}: CtaActionsProps) {
  const showSecondary =
    Boolean(secondaryCta.label) && Boolean(secondaryCta.href);
  const onDark = tone === "onDark";

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-6 text-center",
        className,
      )}
    >
      <div className="flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-4">
        <Button
          asChild
          size="lg"
          className={cn(
            buttonStyles.responsiveLg,
            buttonStyles.gold,
            "h-11 gap-2 font-semibold",
          )}
        >
          <Link href={primaryCta.href}>
            {primaryCta.label}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Button>
        {showSecondary ? (
          <Button
            asChild
            size="lg"
            className={cn(
              buttonStyles.responsiveLg,
              onDark ? buttonStyles.outlineOnDark : buttonStyles.responsiveOutline,
              "h-11 font-semibold",
            )}
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
        ) : null}
      </div>
      {trustMicrocopy ? (
        <p
          className={cn(
            "text-pretty text-sm leading-relaxed",
            onDark ? "text-white/70" : "text-muted-foreground",
          )}
        >
          {trustMicrocopy}
        </p>
      ) : null}
    </div>
  );
}
