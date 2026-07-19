import { Container } from "@/components/layout/container";
import { ServiceGrid } from "@/features/services/components/service-grid";
import type { Service, ServicesSectionContent } from "@/features/services/types";
import { sectionStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

type ServiceSectionProps = {
  section: ServicesSectionContent;
  services: Service[];
  className?: string;
};

export function ServiceSection({ section, services, className }: ServiceSectionProps) {

  return (
    <section
      aria-labelledby="services-section-heading"
      className={cn(sectionStyles.sectionBackground, sectionStyles.padding, className)}
    >
      <Container>
        <div className={sectionStyles.stack}>
          <div className={sectionStyles.header}>
            <span
              className={cn(
                sectionStyles.badge,
                sectionStyles.badgeOnBackground,
              )}
            >
              {section.badge}
            </span>
            <h2 id="services-section-heading" className={sectionStyles.heading}>
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
