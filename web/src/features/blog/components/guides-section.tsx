import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

import { Container } from "@/components/layout/container";
import type { GuidesSectionContent } from "@/features/blog/types";
import { cardStyles, focusRing, sectionStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

type GuidesSectionProps = {
  content: GuidesSectionContent;
  className?: string;
};

export function GuidesSection({ content, className }: GuidesSectionProps) {

  return (
    <section
      aria-labelledby="guides-section-heading"
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
            <h2 id="guides-section-heading" className={sectionStyles.heading}>
              {content.heading}
            </h2>
            <p className={sectionStyles.description}>{content.description}</p>
          </div>

          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {content.guides.map((guide) => (
              <li key={guide.id} className="h-full">
                <article
                  className={cn(
                    cardStyles.base,
                    cardStyles.interactive,
                    cardStyles.padding,
                    "group flex h-full flex-col gap-4",
                  )}
                >
                  <div className={cardStyles.iconBox}>
                    <BookOpen className={cn(cardStyles.icon, "size-5")} aria-hidden="true" />
                  </div>
                  <div className="flex flex-1 flex-col gap-2">
                    <h3 className={cardStyles.title}>{guide.title}</h3>
                    <p className={cardStyles.body}>{guide.description}</p>
                  </div>
                  <Link
                    href={guide.href}
                    className={cn(
                      cardStyles.textLink,
                      "mt-auto",
                      focusRing,
                    )}
                  >
                    Read guide
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
