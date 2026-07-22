import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { RelatedProgramsSection } from "@/features/programs";
import type { ProgramCard } from "@/types/programs";
import type { UniversityDetail } from "@/types/universities";
import { buttonStyles, sectionStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

type UniversityDetailViewProps = {
  university: UniversityDetail;
  programs?: ProgramCard[];
};

export function UniversityDetailView({
  university,
  programs = [],
}: UniversityDetailViewProps) {
  return (
    <>
      <section
        aria-labelledby="university-hero-heading"
        className="relative -mt-14 overflow-hidden bg-background pt-14"
      >
        <Container className="relative py-16 sm:py-20 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className={sectionStyles.header}>
              <span className={cn(sectionStyles.badge, sectionStyles.badgeOnBackground)}>
                {university.flag} {university.country}
              </span>
              <h1
                id="university-hero-heading"
                className="text-balance text-3xl font-medium tracking-tight text-foreground sm:text-4xl lg:text-5xl"
              >
                {university.name}
              </h1>
              <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
                {university.city}
              </p>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {university.type}
              </p>
              <p className={sectionStyles.description}>{university.description}</p>
              {university.ranking ? (
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Ranking: </span>
                  {university.ranking}
                </p>
              ) : null}
              <p className="font-mono text-sm text-muted-foreground">{university.tuitionRange}</p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className={buttonStyles.responsiveLg}>
                  <Link href="/contact">Book Free Consultation</Link>
                </Button>
                <Button asChild variant="outline" className={buttonStyles.responsiveOutline}>
                  <Link href={`/destinations/${university.countrySlug}`}>
                    Explore {university.country}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border/80 bg-muted shadow-sm ring-1 ring-border/40">
              <Image
                src={university.image.src}
                alt={university.image.alt}
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

      <RelatedProgramsSection
        heading="Programs offered"
        programs={programs}
        viewAllHref={`/programs?university=${encodeURIComponent(university.slug)}`}
        viewAllLabel="View all programs"
        muted
      />

      {university.programs.length > 0 && programs.length === 0 ? (
        <section className={cn(sectionStyles.sectionMuted, sectionStyles.padding)}>
          <Container>
            <div className="mx-auto max-w-3xl space-y-3">
              <h2 className={sectionStyles.heading}>Popular programs</h2>
              <ul className="flex flex-wrap gap-2">
                {university.programs.map((program) => (
                  <li
                    key={program}
                    className="rounded-md border border-border bg-card px-3 py-1.5 text-sm text-foreground"
                  >
                    {program}
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>
      ) : null}

      {university.scholarships ? (
        <section className={cn(sectionStyles.sectionBackground, sectionStyles.padding)}>
          <Container>
            <div className="mx-auto max-w-3xl space-y-3">
              <h2 className={sectionStyles.heading}>Scholarships</h2>
              <p className="text-pretty text-base leading-relaxed text-muted-foreground">
                {university.scholarships}
              </p>
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
