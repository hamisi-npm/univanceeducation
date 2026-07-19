import Link from "next/link";

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
        <Button asChild size="lg" className={buttonStyles.responsiveLg}>
          <Link href={ctas.primary.href}>{ctas.primary.label}</Link>
        </Button>
        <Button
          asChild
          variant="outline"
          size="lg"
          className={buttonStyles.responsiveOutline}
        >
          <Link href={ctas.secondary.href}>{ctas.secondary.label}</Link>
        </Button>
      </div>
      <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
        {trustMicrocopy}
      </p>
    </div>
  );
}
