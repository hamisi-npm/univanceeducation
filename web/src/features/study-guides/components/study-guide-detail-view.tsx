import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { GuideCard } from "@/features/study-guides/components/guide-card";
import type { StudyGuideDetail } from "@/types/study-guides";
import { buttonStyles, sectionStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

type StudyGuideDetailViewProps = {
  guide: StudyGuideDetail;
};

export function StudyGuideDetailView({ guide }: StudyGuideDetailViewProps) {
  return (
    <>
      <section
        aria-labelledby="study-guide-heading"
        className="relative -mt-14 overflow-hidden bg-background pt-14"
      >
        <Container className="relative py-16 sm:py-20 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-8">
              <Button asChild variant="ghost" size="sm" className={buttonStyles.responsiveOutline}>
                <Link href="/study-guides">
                  <ArrowLeft className="size-4" aria-hidden="true" />
                  Back to guides
                </Link>
              </Button>

              <div className={sectionStyles.header}>
                <span className={cn(sectionStyles.badge, sectionStyles.badgeOnBackground)}>
                  {guide.categoryLabel}
                </span>
                <h1
                  id="study-guide-heading"
                  className="text-balance text-3xl font-medium tracking-tight text-foreground sm:text-4xl lg:text-5xl"
                >
                  {guide.title}
                </h1>
                <p className={sectionStyles.description}>{guide.description}</p>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Clock className="size-4" aria-hidden="true" />
                  {guide.readTime}
                </div>
                <Button asChild size="lg" className={buttonStyles.responsiveLg}>
                  <Link href="/contact">Book Free Consultation</Link>
                </Button>
              </div>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border/80 bg-muted shadow-sm ring-1 ring-border/40">
              <Image
                src={guide.coverImage.src}
                alt={guide.coverImage.alt}
                fill
                priority
                quality={85}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </Container>
      </section>

      {guide.body.length > 0 ? (
        <section className={cn(sectionStyles.sectionMuted, sectionStyles.padding)}>
          <Container>
            <div className="prose prose-neutral mx-auto max-w-prose dark:prose-invert">
              {guide.body.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className="text-pretty text-base leading-relaxed text-muted-foreground"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {guide.relatedGuides.length > 0 ? (
        <section
          aria-labelledby="related-guides-heading"
          className={cn(sectionStyles.sectionBackground, sectionStyles.padding)}
        >
          <Container>
            <div className={sectionStyles.stack}>
              <h2 id="related-guides-heading" className={sectionStyles.heading}>
                Related guides
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {guide.relatedGuides.map((item) => (
                  <div key={item.id} className="h-full">
                    <GuideCard guide={item} />
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
