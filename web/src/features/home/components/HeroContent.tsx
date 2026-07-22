import type { HeroContentData } from "@/features/home/types";
import { sectionStyles } from "@/lib/section-styles";
import type { SiteConfig } from "@/types/site";
import { cn } from "@/lib/utils";

type HeroContentProps = {
  content: HeroContentData;
  site: SiteConfig;
  className?: string;
};

export function HeroContent({ content, className }: HeroContentProps) {
  const { badge, headline, subheadline } = content;

  return (
    <div className={cn("space-y-5", className)}>
      <p className={cn(sectionStyles.badgeGold, "tracking-[0.18em]")}>
        {badge.text}
        {badge.suffix ? (
          <>
            <span className="mx-2 opacity-60" aria-hidden="true">
              ·
            </span>
            <span>{badge.suffix}</span>
          </>
        ) : null}
      </p>

      <div className="space-y-4">
        <h1
          id="hero-heading"
          className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          {headline}
        </h1>
        <p className="max-w-xl text-pretty text-base leading-relaxed text-white/85 sm:text-lg">
          {subheadline}
        </p>
      </div>
    </div>
  );
}
