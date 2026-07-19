import { Container } from "@/components/layout/container";
import { ProcessCta } from "@/features/process/components/process-cta";
import { ProcessSteps } from "@/features/process/components/process-steps";
import type { ProcessSectionContent, ProcessStep } from "@/features/process/types";
import { sectionStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

type ProcessSectionProps = {
  section: ProcessSectionContent;
  steps: ProcessStep[];
  className?: string;
};

export function ProcessSection({ section, steps, className }: ProcessSectionProps) {

  return (
    <section
      aria-labelledby="process-section-heading"
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
            <h2 id="process-section-heading" className={sectionStyles.heading}>
              {section.heading}
            </h2>
            <p className={sectionStyles.description}>{section.description}</p>
          </div>

          <ProcessSteps steps={steps} />

          <ProcessCta content={section.cta} />
        </div>
      </Container>
    </section>
  );
}
