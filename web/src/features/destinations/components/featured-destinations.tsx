"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import type {
  Destination,
  FeaturedDestinationsContent,
} from "@/features/destinations/types";
import { buttonStyles, cardStyles, focusRing, sectionStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

type FeaturedDestinationsProps = {
  section: FeaturedDestinationsContent;
  destinations: Destination[];
  className?: string;
  showViewAll?: boolean;
};

export function FeaturedDestinations({
  section,
  destinations,
  className,
  showViewAll = true,
}: FeaturedDestinationsProps) {
  const scrollerRef = useRef<HTMLUListElement>(null);

  function scrollByAmount(direction: "prev" | "next") {
    const node = scrollerRef.current;
    if (!node) return;
    const amount = Math.min(node.clientWidth * 0.8, 360);
    node.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    });
  }

  return (
    <section
      aria-labelledby="featured-destinations-heading"
      className={cn(sectionStyles.sectionBeige, sectionStyles.padding, className)}
    >
      <Container>
        <div className={sectionStyles.stack}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-4">
              <span className={sectionStyles.badgeGold}>{section.badge}</span>
              <h2
                id="featured-destinations-heading"
                className={sectionStyles.heading}
              >
                {section.heading}
              </h2>
              {section.description ? (
                <p className={sectionStyles.description}>
                  {section.description}
                </p>
              ) : null}
            </div>

            {showViewAll ? (
              <Button
                asChild
                className={cn("shrink-0", buttonStyles.responsiveOutline)}
              >
                <Link href={section.viewAllHref}>
                  {section.viewAllLabel}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
            ) : null}
          </div>

          <div className="relative">
            <ul
              ref={scrollerRef}
              className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {destinations.map((destination) => (
                <li
                  key={destination.id}
                  className="w-[260px] shrink-0 snap-start sm:w-[280px]"
                >
                  <DestinationCarouselCard destination={destination} />
                </li>
              ))}
            </ul>

            {destinations.length > 1 ? (
              <>
                <Button
                  type="button"
                  size="icon"
                  aria-label="Scroll destinations left"
                  onClick={() => scrollByAmount("prev")}
                  className={cn(
                    "absolute -left-2 top-1/2 z-10 hidden size-11 -translate-y-1/2 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 sm:inline-flex",
                    focusRing,
                  )}
                >
                  <ArrowLeft className="size-5" aria-hidden="true" />
                </Button>
                <Button
                  type="button"
                  size="icon"
                  aria-label="Scroll destinations right"
                  onClick={() => scrollByAmount("next")}
                  className={cn(
                    "absolute -right-2 top-1/2 z-10 hidden size-11 -translate-y-1/2 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 sm:inline-flex",
                    focusRing,
                  )}
                >
                  <ArrowRight className="size-5" aria-hidden="true" />
                </Button>
              </>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}

function DestinationCarouselCard({ destination }: { destination: Destination }) {
  const href = `/destinations/${destination.slug}`;

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl bg-card shadow-lg",
        cardStyles.interactive,
      )}
    >
      <Link href={href} className={cn("flex h-full flex-col", cardStyles.linkFocus)}>
        <div className="relative aspect-[3/4] overflow-hidden bg-brand-beige">
          <Image
            src={destination.image.src}
            alt={destination.image.alt}
            fill
            quality={80}
            sizes="(max-width: 640px) 80vw, 280px"
            className={cn(
              "object-cover object-center",
              "motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out",
              "motion-safe:group-hover:scale-[1.04] motion-safe:group-focus-within:scale-[1.04]",
            )}
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-brand-navy/50 via-transparent to-transparent"
            aria-hidden="true"
          />
        </div>

        <div className="flex items-center gap-3 bg-card px-4 py-4">
          <span className="text-xl leading-none" aria-hidden="true">
            {destination.flag}
          </span>
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold text-foreground">
              {destination.country}
            </h3>
            <p className="truncate text-xs text-muted-foreground">
              {destination.ctaLabel || destination.description}
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
}
