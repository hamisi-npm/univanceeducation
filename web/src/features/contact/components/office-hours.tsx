import { Container } from "@/components/layout/container";
import type { OfficeHoursContent } from "@/features/contact/types";
import { cardStyles, sectionStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

type OfficeHoursProps = {
  content: OfficeHoursContent;
  className?: string;
};

export function OfficeHours({ content, className }: OfficeHoursProps) {

  return (
    <section
      aria-labelledby="office-hours-heading"
      className={cn(sectionStyles.sectionBackground, sectionStyles.padding, className)}
    >
      <Container>
        <div className="mx-auto max-w-2xl">
          <div className={cn(sectionStyles.header, "mb-8 text-center")}>
            <span
              className={cn(
                sectionStyles.badge,
                sectionStyles.badgeOnBackground,
                "mx-auto",
              )}
            >
              {content.badge}
            </span>
            <h2 id="office-hours-heading" className={sectionStyles.heading}>
              {content.heading}
            </h2>
            <p className={cn(sectionStyles.description, "mx-auto")}>
              {content.description}
            </p>
          </div>

          <article className={cn(cardStyles.base, cardStyles.padding)}>
            <dl className="space-y-4">
              {content.entries.map((entry) => (
                <div
                  key={entry.id}
                  className="flex flex-col justify-between gap-1 border-b border-border/80 pb-4 last:border-b-0 last:pb-0 sm:flex-row sm:items-center"
                >
                  <dt className="text-sm font-medium text-foreground">
                    {entry.days}
                  </dt>
                  <dd className="text-sm text-muted-foreground">{entry.hours}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-xs text-muted-foreground">{content.note}</p>
          </article>
        </div>
      </Container>
    </section>
  );
}
