import { Container } from "@/components/layout/container";
import { HeroContent } from "@/features/home/components/HeroContent";
import { HeroCTA } from "@/features/home/components/HeroCTA";
import { HeroImage } from "@/features/home/components/HeroImage";
import { HeroMotionItem } from "@/features/home/components/hero-motion-item";
import { TrustBadges } from "@/features/home/components/TrustBadges";
import type { HeroContentData, HeroTrustStat } from "@/features/home/types";
import type { SiteConfig } from "@/types/site";

type HeroProps = {
  content: HeroContentData;
  trustStats: HeroTrustStat[];
  site: SiteConfig;
};

export function Hero({ content, trustStats, site }: HeroProps) {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative -mt-14 min-h-[85vh] overflow-hidden bg-background pt-14"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_-20%,var(--muted)_0%,transparent_60%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_100%_50%,var(--muted)_0%,transparent_50%)] opacity-60"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background"
        aria-hidden="true"
      />

      <Container className="relative flex min-h-[calc(85vh-3.5rem)] flex-col justify-center py-16 sm:py-20 lg:py-24 xl:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <div className="flex flex-col gap-10">
            <HeroMotionItem index={0}>
              <HeroContent content={content} site={site} />
            </HeroMotionItem>
            <HeroMotionItem index={1}>
              <HeroCTA content={content} />
            </HeroMotionItem>
            <HeroMotionItem index={2}>
              <TrustBadges stats={trustStats} className="border-t border-border/60 pt-8" />
            </HeroMotionItem>
          </div>

          <HeroImage content={content} className="lg:justify-self-end" />
        </div>
      </Container>
    </section>
  );
}
