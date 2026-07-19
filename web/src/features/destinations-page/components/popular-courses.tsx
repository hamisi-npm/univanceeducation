import {
  Briefcase,
  Cpu,
  Cog,
  HeartPulse,
  Palette,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import type { PopularCoursesContent } from "@/features/destinations-page/types";
import type { PopularCourseIconName } from "@/features/destinations-page/types";
import { cardStyles, sectionStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

const courseIcons: Record<PopularCourseIconName, LucideIcon> = {
  cog: Cog,
  briefcase: Briefcase,
  cpu: Cpu,
  "heart-pulse": HeartPulse,
  "utensils-crossed": UtensilsCrossed,
  palette: Palette,
};

type PopularCoursesProps = {
  content: PopularCoursesContent;
  className?: string;
};

export function PopularCourses({ content, className }: PopularCoursesProps) {

  return (
    <section
      aria-labelledby="popular-courses-heading"
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
            <h2 id="popular-courses-heading" className={sectionStyles.heading}>
              {content.heading}
            </h2>
            <p className={sectionStyles.description}>{content.description}</p>
          </div>

          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {content.courses.map((course) => {
              const Icon = courseIcons[course.icon];

              return (
                <li key={course.id} className="h-full">
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
                      <h3 className={cardStyles.title}>{course.title}</h3>
                      <p className={cardStyles.body}>{course.description}</p>
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
