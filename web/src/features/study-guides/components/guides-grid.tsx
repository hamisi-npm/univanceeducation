import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { GuideCard } from "@/features/study-guides/components/guide-card";
import type { StudyGuidesPageData } from "@/types/study-guides";
import { cardStyles, focusRing, sectionStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

type GuidesGridProps = {
  page: StudyGuidesPageData;
  className?: string;
};

export function GuidesGrid({ page, className }: GuidesGridProps) {
  const featured = page.featuredGuides;
  const categories = page.guideCategories;
  const checklist = page.studyChecklist;
  const resources = page.resources;

  return (
    <>
      <section
        aria-labelledby="featured-guides-heading"
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
                {featured.badge}
              </span>
              <h2 id="featured-guides-heading" className={sectionStyles.heading}>
                {featured.heading}
              </h2>
              <p className={sectionStyles.description}>{featured.description}</p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {page.guides.map((guide) => (
                <div key={guide.id} className="h-full">
                  <GuideCard guide={guide} />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="guide-categories-heading"
        className={cn(sectionStyles.sectionBackground, sectionStyles.padding)}
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
                {categories.badge}
              </span>
              <h2 id="guide-categories-heading" className={sectionStyles.heading}>
                {categories.heading}
              </h2>
              <p className={sectionStyles.description}>{categories.description}</p>
            </div>

            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categories.categories.map((category) => (
                <li key={category.id} className="h-full">
                  <article
                    className={cn(
                      cardStyles.base,
                      cardStyles.padding,
                      "flex h-full flex-col gap-2",
                    )}
                  >
                    <h3 className={cardStyles.title}>{category.label}</h3>
                    <p className={cardStyles.body}>{category.description}</p>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="study-checklist-heading"
        className={cn(sectionStyles.sectionMuted, sectionStyles.padding)}
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
                {checklist.badge}
              </span>
              <h2 id="study-checklist-heading" className={sectionStyles.heading}>
                {checklist.heading}
              </h2>
              <p className={sectionStyles.description}>{checklist.description}</p>
            </div>

            <ol className="mx-auto w-full max-w-2xl space-y-4">
              {checklist.items.map((item, index) => (
                <li
                  key={item.id}
                  className={cn(
                    cardStyles.base,
                    cardStyles.padding,
                    "flex gap-4",
                  )}
                >
                  <span
                    className="flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-muted/50 font-mono text-xs font-medium text-foreground"
                    aria-hidden="true"
                  >
                    {index + 1}
                  </span>
                  <div className="space-y-1">
                    <h3 className="text-base font-medium text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="study-guides-resources-heading"
        className={cn(sectionStyles.sectionBackground, sectionStyles.padding)}
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
                {resources.badge}
              </span>
              <h2
                id="study-guides-resources-heading"
                className={sectionStyles.heading}
              >
                {resources.heading}
              </h2>
              <p className={sectionStyles.description}>{resources.description}</p>
            </div>

            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {resources.links.map((link) => (
                <li key={link.id} className="h-full">
                  <article
                    className={cn(
                      cardStyles.base,
                      cardStyles.interactive,
                      cardStyles.padding,
                      "group flex h-full flex-col gap-3",
                    )}
                  >
                    <h3 className={cardStyles.title}>{link.title}</h3>
                    <p className={cn(cardStyles.body, "flex-1")}>
                      {link.description}
                    </p>
                    <Link
                      href={link.href}
                      className={cn(cardStyles.textLink, focusRing)}
                    >
                      Visit
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
    </>
  );
}
