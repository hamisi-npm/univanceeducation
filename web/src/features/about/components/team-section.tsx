import Image from "next/image";

import { Container } from "@/components/layout/container";
import type { TeamSectionContent } from "@/features/about/types";
import { cardStyles, sectionStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

type TeamSectionProps = {
  content: TeamSectionContent;
  className?: string;
};

export function TeamSection({ content, className }: TeamSectionProps) {

  return (
    <section
      aria-labelledby="team-section-heading"
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
            <h2 id="team-section-heading" className={sectionStyles.heading}>
              {content.heading}
            </h2>
            <p className={cn(sectionStyles.description, "mx-auto")}>
              {content.description}
            </p>
          </div>

          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {content.members.map((member) => (
              <li key={member.id} className="h-full">
                <article
                  className={cn(
                    cardStyles.base,
                    cardStyles.interactive,
                    "flex h-full flex-col overflow-hidden",
                  )}
                >
                  <div className="relative aspect-[4/3] bg-muted">
                    <Image
                      src={member.image.src}
                      alt={member.image.alt}
                      fill
                      quality={80}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-center"
                    />
                  </div>
                  <div className={cn(cardStyles.padding, "flex flex-1 flex-col gap-2")}>
                    <h3 className={cardStyles.title}>{member.name}</h3>
                    <p className="text-sm font-medium text-primary">
                      {member.position}
                    </p>
                    <p className={cn(cardStyles.body, "flex-1")}>{member.bio}</p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
