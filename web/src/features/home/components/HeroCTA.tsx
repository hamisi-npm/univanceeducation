import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { HeroContentData } from "@/features/home/types";
import { buttonStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

type HeroCTAProps = {
  content: HeroContentData;
  className?: string;
};

export function HeroCTA({ content, className }: HeroCTAProps) {
  const { ctas, trustMicrocopy } = content;

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <Button
          asChild
          size="lg"
          className={cn(
            buttonStyles.responsiveLg,
            buttonStyles.gold,
            "h-12 gap-2 px-6 text-sm font-semibold",
          )}
        >
          <Link href={ctas.primary.href}>
            {ctas.primary.label}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Button>
        <Button
          asChild
          size="lg"
          className={cn(
            buttonStyles.responsiveLg,
            buttonStyles.outlineOnHero,
            "h-12 gap-2 px-6 text-sm font-semibold",
          )}
        >
          <Link href={ctas.secondary.href}>
            {ctas.secondary.label}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Button>
      </div>
      {trustMicrocopy ? (
        <p className="text-pretty text-sm leading-relaxed text-white/70">
          {trustMicrocopy}
        </p>
      ) : null}
    </div>
  );
}
