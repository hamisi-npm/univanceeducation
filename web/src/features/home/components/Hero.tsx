import Image from "next/image";

import { Container } from "@/components/layout/container";
import { HeroContent } from "@/features/home/components/HeroContent";
import { HeroCTA } from "@/features/home/components/HeroCTA";
import { HeroMotionItem } from "@/features/home/components/hero-motion-item";
import { ProgramFinder } from "@/features/home/components/program-finder";
import { TrustBadges } from "@/features/home/components/TrustBadges";
import type {
  HeroContentData,
  HeroTrustStat,
  ProgramFinderContent,
} from "@/features/home/types";
import type { SiteConfig } from "@/types/site";

const HERO_IMAGE_BLUR =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgEDBAMBAAAAAAAAAAAAAQIDAAQRBRIhMQYTQVFh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQACAwEAAAAAAAAAAAAAAAABAgADESH/2gAMAwEAAhEDEEA/AJOk6jp1/YzWdxG8ci5DKwyCD3FfaYiIiKAP/9k=";

type HeroProps = {
  content: HeroContentData;
  trustStats: HeroTrustStat[];
  programFinder: ProgramFinderContent;
  site: SiteConfig;
};

export function Hero({ content, trustStats, programFinder, site }: HeroProps) {
  return (
    <section aria-labelledby="hero-heading" className="relative bg-brand-beige">
      <div className="relative -mt-16 min-h-[78vh] overflow-hidden bg-foreground pt-16 sm:min-h-[82vh]">
        <div className="absolute inset-0">
          <Image
            src={content.image.src}
            alt={content.image.alt}
            fill
            priority
            quality={85}
            placeholder="blur"
            blurDataURL={HERO_IMAGE_BLUR}
            sizes="100vw"
            className="object-cover object-center"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/65 to-foreground/25"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-foreground/75 via-transparent to-foreground/35"
            aria-hidden="true"
          />
        </div>

        <Container className="relative flex min-h-[calc(78vh-4rem)] flex-col justify-center pb-28 pt-16 sm:min-h-[calc(82vh-4rem)] sm:pb-32 sm:pt-20 lg:pb-36 lg:pt-24">
          <div className="flex max-w-2xl flex-col gap-8 lg:gap-10">
            <HeroMotionItem index={0}>
              <HeroContent content={content} site={site} />
            </HeroMotionItem>
            <HeroMotionItem index={1}>
              <HeroCTA content={content} />
            </HeroMotionItem>
            <HeroMotionItem index={2}>
              <TrustBadges stats={trustStats} />
            </HeroMotionItem>
          </div>
        </Container>
      </div>

      {/* In-flow overlap: half on hero, half above services — no absolute clip. */}
      <div className="relative z-20 -mt-14 px-4 sm:-mt-16 sm:px-6 lg:-mt-20">
        <Container>
          <HeroMotionItem index={3}>
            <ProgramFinder content={programFinder} />
          </HeroMotionItem>
        </Container>
      </div>
    </section>
  );
}
