import Image from "next/image";

import { Container } from "@/components/layout/container";
import type { ProgramsPageData } from "@/types/programs";
import { sectionStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

type ProgramHeroProps = {
  content: ProgramsPageData["hero"];
};

export function ProgramHero({ content }: ProgramHeroProps) {
  return (
    <section
      aria-labelledby="programs-hero-heading"
      className="relative -mt-14 overflow-hidden bg-brand-beige pt-14 text-foreground"
    >
      {content.image?.src ? (
        <Image
          src={content.image.src}
          alt=""
          fill
          priority
          quality={80}
          className="object-cover object-center opacity-20"
          sizes="100vw"
        />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-beige/80 to-brand-beige" />
      <Container className="relative py-16 sm:py-20 lg:py-24">
        <div className={sectionStyles.header}>
          {content.badge ? (
            <span className={sectionStyles.badgeGold}>{content.badge}</span>
          ) : null}
          <h1
            id="programs-hero-heading"
            className={sectionStyles.heading}
          >
            {content.heading}
          </h1>
          <p className={sectionStyles.description}>{content.description}</p>
        </div>
      </Container>
    </section>
  );
}

type ProgramStatisticsProps = {
  statistics: ProgramsPageData["statistics"];
};

export function ProgramStatistics({ statistics }: ProgramStatisticsProps) {
  if (statistics.length === 0) {
    return null;
  }

  return (
    <section
      aria-label="Program statistics"
      className={cn(sectionStyles.sectionBeige, "border-b border-border/40")}
    >
      <Container className="py-10 sm:py-12">
        <dl className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {statistics.map((stat) => (
            <div key={`${stat.value}-${stat.label}`} className="space-y-1 text-center">
              <dt className="font-mono text-2xl font-semibold text-primary sm:text-3xl">
                {stat.value}
              </dt>
              <dd className="text-sm text-muted-foreground">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
