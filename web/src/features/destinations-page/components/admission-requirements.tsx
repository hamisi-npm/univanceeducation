import {
  FileText,
  Languages,
  PenLine,
  Stamp,
  Users,
  type LucideIcon,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import type { AdmissionRequirementsContent } from "@/features/destinations-page/types";
import type { AdmissionRequirementIconName } from "@/features/destinations-page/types";
import { cardStyles, sectionStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

const requirementIcons: Record<AdmissionRequirementIconName, LucideIcon> = {
  "file-text": FileText,
  languages: Languages,
  "pen-line": PenLine,
  users: Users,
  stamp: Stamp,
};

type AdmissionRequirementsProps = {
  content: AdmissionRequirementsContent;
  className?: string;
};

export function AdmissionRequirements({ content, className }: AdmissionRequirementsProps) {

  return (
    <section
      aria-labelledby="admission-requirements-heading"
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
              {content.badge}
            </span>
            <h2 id="admission-requirements-heading" className={sectionStyles.heading}>
              {content.heading}
            </h2>
            <p className={sectionStyles.description}>{content.description}</p>
          </div>

          <ol className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {content.requirements.map((requirement, index) => {
              const Icon = requirementIcons[requirement.icon];

              return (
                <li key={requirement.id} className="h-full">
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
                      <h3 className={cardStyles.title}>{requirement.title}</h3>
                      <p className={cardStyles.body}>{requirement.description}</p>
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
