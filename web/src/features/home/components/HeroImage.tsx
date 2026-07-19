import Image from "next/image";
import { CheckCircle2, GraduationCap } from "lucide-react";

import type { HeroContentData, HeroFloatingCard } from "@/features/home/types";
import { cardStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

import { HeroMotionItem } from "@/features/home/components/hero-motion-item";

const HERO_IMAGE_BLUR =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgEDBAMBAAAAAAAAAAAAAQIDAAQRBRIhMQYTQVFh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQACAwEAAAAAAAAAAAAAAAABAgADESH/2gAMAwEAAhEDEEA/AJOk6rp1/YzWdxG8ci5DKwyCD3FfaYiIiKAP/9k=";

type HeroImageProps = {
  content: HeroContentData;
  className?: string;
};

function FloatingCard({ card }: { card: HeroFloatingCard }) {
  const Icon = card.icon === "check" ? CheckCircle2 : GraduationCap;

  return (
    <HeroMotionItem
      index={card.position === "bottom-left" ? 6 : 7}
      className={cn(
        cardStyles.base,
        "absolute z-10 w-[220px] border-border/80 bg-card/95 p-4 shadow-sm backdrop-blur-md sm:w-[260px] sm:p-5",
        "motion-safe:transition-[box-shadow,border-color] motion-safe:duration-300 motion-safe:hover:border-foreground/15 motion-safe:hover:shadow-md",
        card.position === "bottom-left" &&
          "bottom-0 left-0 sm:bottom-4 sm:left-4",
        card.position === "top-right" &&
          "right-0 top-0 max-sm:hidden sm:right-4 sm:top-4",
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn(cardStyles.iconBox, "size-9")}>
          <Icon className={cn(cardStyles.icon, "size-4")} aria-hidden="true" />
        </div>
        <div className="min-w-0 space-y-1">
          <p className="text-sm font-medium tracking-tight text-foreground">
            {card.title}
          </p>
          <p className="text-xs leading-relaxed text-muted-foreground">
            {card.subtitle}
          </p>
        </div>
      </div>
    </HeroMotionItem>
  );
}

export function HeroImage({ content, className }: HeroImageProps) {
  const { image, floatingCards } = content;

  return (
    <HeroMotionItem
      index={5}
      className={cn("relative mx-auto w-full max-w-lg lg:max-w-none", className)}
    >
      <div
        className="pointer-events-none absolute -inset-12 -z-10 bg-[radial-gradient(ellipse_at_center,var(--muted)_0%,transparent_72%)] opacity-80"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -inset-8 -z-10 bg-[radial-gradient(ellipse_at_top_right,var(--primary)_0%,transparent_65%)] opacity-[0.05]"
        aria-hidden="true"
      />

      <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border/80 bg-muted shadow-sm ring-1 ring-border/40 sm:aspect-[5/4] lg:aspect-[4/5]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          quality={85}
          placeholder="blur"
          blurDataURL={HERO_IMAGE_BLUR}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 540px"
          className="object-cover object-[center_30%]"
        />
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-foreground/15 via-transparent to-transparent"
          aria-hidden="true"
        />

        {floatingCards.map((card) => (
          <FloatingCard key={card.id} card={card} />
        ))}
      </div>
    </HeroMotionItem>
  );
}
