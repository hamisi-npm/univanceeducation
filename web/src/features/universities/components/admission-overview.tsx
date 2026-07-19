import {
  FileText,
  Languages,
  Plane,
  Search,
  Stamp,
  type LucideIcon,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import type { AdmissionOverviewContent } from "@/features/universities/types";
import type { AdmissionStepIconName } from "@/features/universities/types";
import { cardStyles, sectionStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

const stepIcons: Record<AdmissionStepIconName, LucideIcon> = {
  search: Search,
  "file-text": FileText,
  languages: Languages,
  stamp: Stamp,
  plane: Plane,
};

type AdmissionOverviewProps = {
  content: AdmissionOverviewContent;
  className?: string;
};

export function AdmissionOverview({ content, className }: AdmissionOverviewProps) {

  return (
    <section
      aria-labelledby="admission-overview-heading"
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
              {content.badge}
            </span>
            <h2 id="admission-overview-heading" className={sectionStyles.heading}>
              {content.heading}
            </h2>
            <p className={sectionStyles.description}>{content.description}</p>
          </div>

          <ol className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {content.steps.map((step, index) => {
              const Icon = stepIcons[step.icon];

              return (
                <li key={step.id} className="h-full">
                  <article
                    className={cn(
                      cardStyles.base,
                      cardStyles.padding,
                      "flex h-full flex-col gap-4",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs tabular-nums text-muted-foreground">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className={cardStyles.iconBox}>
                        <Icon className={cn(cardStyles.icon, "size-5")} aria-hidden="true" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className={cardStyles.title}>{step.title}</h3>
                      <p className={cardStyles.body}>{step.description}</p>
                    </div>
                  </article>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
