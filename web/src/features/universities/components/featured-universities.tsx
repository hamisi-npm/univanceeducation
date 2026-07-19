import { Container } from "@/components/layout/container";
import { UniversityCard } from "@/features/universities/components/university-card";
import type { SectionHeaderContent, University } from "@/features/universities/types";
import { sectionStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

type FeaturedUniversitiesProps = {
  section: SectionHeaderContent;
  universities: University[];
  className?: string;
};

export function FeaturedUniversities({
  section,
  universities,
  className,
}: FeaturedUniversitiesProps) {
  return (
    <section
      aria-labelledby="featured-universities-heading"
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
            <h2
              id="featured-universities-heading"
              className={sectionStyles.heading}
            >
              {section.heading}
            </h2>
            <p className={sectionStyles.description}>{section.description}</p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {universities.map((university) => (
              <div key={university.id} className="h-full">
                <UniversityCard university={university} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
