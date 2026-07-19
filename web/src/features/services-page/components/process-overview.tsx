import { Container } from "@/components/layout/container";
import { ProcessSteps } from "@/features/process/components/process-steps";
import type { ProcessStep } from "@/features/process/types";
import type { SectionHeaderContent } from "@/features/services-page/types";
import { sectionStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

type ProcessOverviewProps = {
  section: SectionHeaderContent;
  steps: ProcessStep[];
  className?: string;
};

export function ProcessOverview({ section, steps, className }: ProcessOverviewProps) {

  return (
    <section
      aria-labelledby="process-overview-heading"
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
            <h2 id="process-overview-heading" className={sectionStyles.heading}>
              {section.heading}
            </h2>
            <p className={sectionStyles.description}>{section.description}</p>
          </div>

          <ProcessSteps steps={steps} />
        </div>
      </Container>
    </section>
  );
}
