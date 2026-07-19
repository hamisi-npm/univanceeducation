import {
  Briefcase,
  Cog,
  Cpu,
  FlaskConical,
  HeartPulse,
  Scale,
  type LucideIcon,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import type { PopularProgramsContent } from "@/features/universities/types";
import type { PopularProgramIconName } from "@/features/universities/types";
import { cardStyles, sectionStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

const programIcons: Record<PopularProgramIconName, LucideIcon> = {
  cpu: Cpu,
  briefcase: Briefcase,
  "heart-pulse": HeartPulse,
  cog: Cog,
  scale: Scale,
  flask: FlaskConical,
};

type PopularProgramsProps = {
  content: PopularProgramsContent;
  className?: string;
};

export function PopularPrograms({ content, className }: PopularProgramsProps) {

  return (
    <section
      aria-labelledby="popular-programs-heading"
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
            <h2 id="popular-programs-heading" className={sectionStyles.heading}>
              {content.heading}
            </h2>
            <p className={sectionStyles.description}>{content.description}</p>
          </div>

          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {content.programs.map((program) => {
              const Icon = programIcons[program.icon];

              return (
                <li key={program.id} className="h-full">
                  <article
                    className={cn(
                      cardStyles.base,
                      cardStyles.interactive,
                      cardStyles.padding,
                      "flex h-full flex-col gap-4",
                    )}
                  >
                    <div className={cardStyles.iconBox}>
                      <Icon className={cn(cardStyles.icon, "size-5")} aria-hidden="true" />
                    </div>
                    <div className="space-y-2">
                      <h3 className={cardStyles.title}>{program.title}</h3>
                      <p className={cardStyles.body}>{program.description}</p>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
