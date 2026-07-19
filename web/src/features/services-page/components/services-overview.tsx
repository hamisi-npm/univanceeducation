import { Container } from "@/components/layout/container";
import { ServiceGrid } from "@/features/services/components/service-grid";
import type { Service } from "@/features/services/types";
import type { SectionHeaderContent } from "@/features/services-page/types";
import { sectionStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

type ServicesOverviewProps = {
  section: SectionHeaderContent;
  services: Service[];
  className?: string;
};

export function ServicesOverview({ section, services, className }: ServicesOverviewProps) {

  return (
    <section
      aria-labelledby="services-overview-heading"
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
            <h2 id="services-overview-heading" className={sectionStyles.heading}>
              {section.heading}
            </h2>
            <p className={sectionStyles.description}>{section.description}</p>
          </div>

          <ServiceGrid services={services} />
        </div>
      </Container>
    </section>
  );
}
