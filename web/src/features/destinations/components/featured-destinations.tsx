import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { DestinationCard } from "@/features/destinations/components/destination-card";
import type { Destination, FeaturedDestinationsContent } from "@/features/destinations/types";
import { buttonStyles, sectionStyles } from "@/lib/section-styles";
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
  const featured = destinations.filter((d) => d.featured);
  const standard = destinations.filter((d) => !d.featured);

  return (
    <section
      aria-labelledby="featured-destinations-heading"
      className={cn(sectionStyles.sectionMuted, sectionStyles.padding, className)}
    >
      <Container>
        <div className={sectionStyles.stack}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className={sectionStyles.header}>
              <span
                className={cn(
                  sectionStyles.badge,
                  sectionStyles.badgeOnMuted,
                )}
              >
                {section.badge}
              </span>
              <h2 id="featured-destinations-heading" className={sectionStyles.heading}>
                {section.heading}
              </h2>
              <p className={sectionStyles.description}>{section.description}</p>
            </div>

            {showViewAll ? (
              <Button
                asChild
                variant="outline"
                className={cn("shrink-0", buttonStyles.responsiveOutline)}
              >
                <Link href={section.viewAllHref}>
                  {section.viewAllLabel}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
            ) : null}
          </div>

          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {featured.map((destination) => (
                <div key={destination.id} className="h-full">
                  <DestinationCard
                    destination={destination}
                    variant="featured"
                  />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {standard.map((destination) => (
                <div key={destination.id} className="h-full">
                  <DestinationCard
                    destination={destination}
                    variant="standard"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
