import { Container } from "@/components/layout/container";
import type { MissionVisionContent } from "@/features/about/types";
import { cardStyles, sectionStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

type MissionVisionProps = {
  content: MissionVisionContent;
  className?: string;
};

export function MissionVision({ content, className }: MissionVisionProps) {

  return (
    <section
      aria-labelledby="mission-vision-heading"
      className={cn(sectionStyles.sectionBackground, sectionStyles.padding, className)}
    >
      <Container>
        <div className={sectionStyles.stack}>
          <div className={cn(sectionStyles.header, "mx-auto text-center")}>
            <span
              className={cn(
                sectionStyles.badge,
                sectionStyles.badgeOnBackground,
                "mx-auto",
              )}
            >
              {content.badge}
            </span>
            <h2 id="mission-vision-heading" className={sectionStyles.heading}>
              {content.heading}
            </h2>
            <p className={cn(sectionStyles.description, "mx-auto")}>
              {content.description}
            </p>
          </div>

          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {content.cards.map((card) => (
              <li key={card.id} className="h-full">
                <article
                  className={cn(
                    cardStyles.base,
                    cardStyles.padding,
                    "flex h-full flex-col gap-4",
                  )}
                >
                  <h3 className="text-xl font-medium tracking-tight text-foreground">
                    {card.title}
                  </h3>
                  <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                    {card.description}
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
