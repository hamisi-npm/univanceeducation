import { Container } from "@/components/layout/container";
import { DestinationCard } from "@/features/destinations/components/destination-card";
import type { Destination } from "@/features/destinations/types";
import type { SectionHeaderContent } from "@/features/destinations-page/types";
import { sectionStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

type FeaturedCountriesProps = {
  section: SectionHeaderContent;
  destinations: Destination[];
  className?: string;
};

export function FeaturedCountries({ section, destinations, className }: FeaturedCountriesProps) {

  return (
    <section
      aria-labelledby="featured-countries-heading"
      className={cn(sectionStyles.sectionMuted, sectionStyles.padding, className)}
    >
      <Container>
        <div className={sectionStyles.stack}>
          <div className={sectionStyles.header}>
            <span
              className={cn(
                sectionStyles.badge,
                sectionStyles.badgeOnMuted,
              )}
            >
              {section.badge}
            </span>
            <h2 id="featured-countries-heading" className={sectionStyles.heading}>
              {section.heading}
            </h2>
            <p className={sectionStyles.description}>{section.description}</p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {destinations.map((destination) => (
              <div key={destination.id} className="h-full">
                <DestinationCard destination={destination} variant="standard" />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
