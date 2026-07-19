import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Logo } from "@/components/layout/logo";
import type { HeroContentData } from "@/features/home/types";
import { focusRing, linkTransition, sectionStyles } from "@/lib/section-styles";
import type { SiteConfig } from "@/types/site";
import { cn } from "@/lib/utils";

type HeroContentProps = {
  content: HeroContentData;
  site: SiteConfig;
  className?: string;
};

export function HeroContent({ content, site, className }: HeroContentProps) {
  const { badge, headline, subheadline } = content;

  return (
    <div className={cn("space-y-6", className)}>
      <Logo site={site} variant="hero" />

      <Link
        href={badge.href}
        className={cn(
          sectionStyles.badge,
          sectionStyles.badgeOnBackground,
          "group inline-flex items-center gap-2 hover:border-primary/30 hover:bg-muted/80",
          focusRing,
          linkTransition,
        )}
      >
        <span>{badge.text}</span>
        <span className="text-muted-foreground" aria-hidden="true">
          ·
        </span>
        <span className="font-normal text-muted-foreground">{badge.suffix}</span>
        <ArrowRight
          className="size-3.5 shrink-0 text-primary motion-safe:transition-[color,transform] motion-safe:duration-200 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:text-secondary"
          aria-hidden="true"
        />
        <span className="sr-only">Go to contact page</span>
      </Link>

      <div className="space-y-4">
        <h1
          id="hero-heading"
          className="text-balance text-3xl font-medium tracking-tight text-foreground sm:text-4xl lg:text-5xl xl:text-6xl"
        >
          {headline}
        </h1>
        <p className={cn(sectionStyles.description, "max-w-prose")}>
          {subheadline}
        </p>
      </div>
    </div>
  );
}
