import { Container } from "@/components/layout/container";
import { ServiceGrid } from "@/features/services/components/service-grid";
import type { Service, ServicesSectionContent } from "@/features/services/types";
import { sectionStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

type ServiceSectionProps = {
  section: ServicesSectionContent;
  services: Service[];
  className?: string;
  layout?: "grid" | "row";
};

export function ServiceSection({
  section,
  services,
  className,
  layout = "grid",
}: ServiceSectionProps) {
  return (
    <section
      aria-labelledby="services-section-heading"
      className={cn(
        sectionStyles.sectionBeige,
        layout === "row" ? "pb-16 pt-10 sm:pb-20 sm:pt-12 lg:pb-24 lg:pt-14" : sectionStyles.padding,
        className,
      )}
    >
      <Container className={layout === "row" ? "max-w-7xl" : undefined}>
        <div className={sectionStyles.stack}>
          <div className={sectionStyles.headerCentered}>
            <span className={sectionStyles.badgeGold}>{section.badge}</span>
            <h2
              id="services-section-heading"
              className={sectionStyles.heading}
            >
              {section.heading}
            </h2>
            {section.description ? (
              <p className={cn(sectionStyles.description, "mx-auto")}>
                {section.description}
              </p>
            ) : null}
          </div>

          <ServiceGrid services={services} layout={layout} />
        </div>
      </Container>
    </section>
  );
}
