import Image from "next/image";

import { Container } from "@/components/layout/container";
import type { CompanyStoryContent } from "@/features/about/types";
import { sectionStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

type CompanyStoryProps = {
  content: CompanyStoryContent;
  className?: string;
};

export function CompanyStory({ content, className }: CompanyStoryProps) {

  return (
    <section
      aria-labelledby="company-story-heading"
      className={cn(sectionStyles.sectionMuted, sectionStyles.padding, className)}
    >
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className={sectionStyles.header}>
            <span
              className={cn(
                sectionStyles.badge,
                sectionStyles.badgeOnMuted,
              )}
            >
              {content.badge}
            </span>
            <h2 id="company-story-heading" className={sectionStyles.heading}>
              {content.heading}
            </h2>
            <div className="space-y-4">
              {content.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className="text-pretty text-base leading-relaxed text-muted-foreground"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border/80 bg-muted shadow-sm ring-1 ring-border/40">
              <Image
                src={content.image.src}
                alt={content.image.alt}
                fill
                quality={80}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
