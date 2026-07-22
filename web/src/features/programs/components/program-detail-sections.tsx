import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { ProgramCta } from "@/features/programs/components/program-cta";
import { ProgramGrid } from "@/features/programs/components/program-grid";
import type { ProgramCard, ProgramDetail } from "@/types/programs";
import { buttonStyles, sectionStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

function Paragraphs({ paragraphs }: { paragraphs: string[] }) {
  if (paragraphs.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {paragraphs.map((paragraph) => (
        <p
          key={paragraph.slice(0, 48)}
          className="text-pretty text-base leading-relaxed text-muted-foreground"
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
}

type ProgramDetailHeroProps = {
  program: ProgramDetail;
};

export function ProgramDetailHero({ program }: ProgramDetailHeroProps) {
  return (
    <section
      aria-labelledby="program-detail-heading"
      className="relative -mt-14 overflow-hidden bg-background pt-14"
    >
      <Container className="relative py-16 sm:py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className={sectionStyles.header}>
            <span className={cn(sectionStyles.badge, sectionStyles.badgeOnBackground)}>
              {program.destinationFlag} {program.destinationCountry}
            </span>
            <p className="text-sm font-medium text-muted-foreground">
              {program.studyLevelName}
              {program.degreeTypeName ? ` · ${program.degreeTypeName}` : ""}
            </p>
            <h1
              id="program-detail-heading"
              className="text-balance text-3xl font-medium tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            >
              {program.title}
            </h1>
            <p className="text-base text-muted-foreground">{program.universityName}</p>
            <p className={sectionStyles.description}>{program.shortDescription}</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ProgramCta
                programSlug={program.slug}
                label="Apply Now"
                size="lg"
                className={buttonStyles.responsiveLg}
              />
              <Button asChild variant="outline" className={buttonStyles.responsiveOutline}>
                <Link href="/contact">Book Consultation</Link>
              </Button>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border/80 bg-muted shadow-sm ring-1 ring-border/40">
            {program.image.src ? (
              <Image
                src={program.image.src}
                alt={program.image.alt}
                fill
                priority
                quality={85}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}

type QuickFactsProps = {
  facts: ProgramDetail["quickFacts"];
  program: ProgramDetail;
};

export function QuickFacts({ facts, program }: QuickFactsProps) {
  const derived = [
    program.duration ? { label: "Duration", value: program.duration } : null,
    program.modeOfStudy
      ? { label: "Mode of study", value: program.modeOfStudy }
      : null,
    program.language ? { label: "Language", value: program.language } : null,
    program.credits ? { label: "Credits", value: program.credits } : null,
    program.intakeMonths.length
      ? { label: "Intakes", value: program.intakeMonths.join(", ") }
      : null,
    program.tuitionLabel
      ? { label: "Annual tuition", value: program.tuitionLabel }
      : null,
  ].filter(Boolean) as Array<{ label: string; value: string }>;

  const items = facts.length > 0 ? facts : derived;

  if (items.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="program-facts-heading"
      className={cn(sectionStyles.sectionMuted, sectionStyles.paddingCompact)}
    >
      <Container>
        <h2 id="program-facts-heading" className="sr-only">
          Quick facts
        </h2>
        <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {items.map((fact) => (
            <div
              key={`${fact.label}-${fact.value}`}
              className="rounded-lg border border-border/60 bg-card p-4"
            >
              <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {fact.label}
              </dt>
              <dd className="mt-1.5 text-sm font-medium text-foreground">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}

export function ProgramOverview({ program }: { program: ProgramDetail }) {
  if (program.overview.length === 0 && program.highlights.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="program-overview-heading"
      className={cn(sectionStyles.sectionBackground, sectionStyles.padding)}
    >
      <Container>
        <div className="mx-auto grid max-w-4xl gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-4">
            <h2 id="program-overview-heading" className={sectionStyles.heading}>
              Overview
            </h2>
            <Paragraphs paragraphs={program.overview} />
          </div>
          {program.highlights.length > 0 ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-brand-navy">Highlights</h3>
              <ul className="space-y-2">
                {program.highlights.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-border/60 bg-card px-3 py-2 text-sm text-muted-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}

export function ProgramRequirements({ program }: { program: ProgramDetail }) {
  const hasContent =
    program.entryRequirements.length > 0 ||
    program.englishRequirements.length > 0 ||
    program.requiredDocuments.length > 0 ||
    program.applicationDeadline;

  if (!hasContent) {
    return null;
  }

  return (
    <section
      aria-labelledby="program-requirements-heading"
      className={cn(sectionStyles.sectionMuted, sectionStyles.padding)}
    >
      <Container>
        <div className="mx-auto max-w-3xl space-y-8">
          <h2 id="program-requirements-heading" className={sectionStyles.heading}>
            Entry requirements
          </h2>
          <Paragraphs paragraphs={program.entryRequirements} />
          {program.englishRequirements.length > 0 ? (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-brand-navy">
                English requirements
              </h3>
              <Paragraphs paragraphs={program.englishRequirements} />
            </div>
          ) : null}
          {program.requiredDocuments.length > 0 ? (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-brand-navy">
                Required documents
              </h3>
              <Paragraphs paragraphs={program.requiredDocuments} />
            </div>
          ) : null}
          {program.applicationDeadline ? (
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Application deadline: </span>
              {program.applicationDeadline}
            </p>
          ) : null}
        </div>
      </Container>
    </section>
  );
}

export function ProgramFees({ program }: { program: ProgramDetail }) {
  return (
    <section
      aria-labelledby="program-fees-heading"
      className={cn(sectionStyles.sectionBackground, sectionStyles.padding)}
    >
      <Container>
        <div className="mx-auto max-w-3xl space-y-4">
          <h2 id="program-fees-heading" className={sectionStyles.heading}>
            Fees
          </h2>
          <dl className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-5">
              <dt className="text-sm font-medium text-foreground">Annual tuition</dt>
              <dd className="mt-2 font-mono text-lg text-brand-navy">
                {program.tuitionLabel || "Contact us for details"}
              </dd>
            </div>
            {program.applicationFee != null ? (
              <div className="rounded-lg border border-border bg-card p-5">
                <dt className="text-sm font-medium text-foreground">Application fee</dt>
                <dd className="mt-2 font-mono text-lg text-brand-navy">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: program.currency || "USD",
                    maximumFractionDigits: 0,
                  }).format(program.applicationFee)}
                </dd>
              </div>
            ) : null}
          </dl>
        </div>
      </Container>
    </section>
  );
}

export function ProgramScholarships({ program }: { program: ProgramDetail }) {
  if (!program.scholarshipAvailable && program.scholarshipDetails.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="program-scholarships-heading"
      className={cn(sectionStyles.sectionMuted, sectionStyles.padding)}
    >
      <Container>
        <div className="mx-auto max-w-3xl space-y-4">
          <h2 id="program-scholarships-heading" className={sectionStyles.heading}>
            Scholarships
          </h2>
          {program.scholarshipAvailable ? (
            <p className="text-sm font-medium text-brand-navy">
              Scholarships are available for this program.
            </p>
          ) : null}
          <Paragraphs paragraphs={program.scholarshipDetails} />
        </div>
      </Container>
    </section>
  );
}

export function ProgramCareer({ program }: { program: ProgramDetail }) {
  if (program.careerOpportunities.length === 0 && !program.industry) {
    return null;
  }

  return (
    <section
      aria-labelledby="program-career-heading"
      className={cn(sectionStyles.sectionBackground, sectionStyles.padding)}
    >
      <Container>
        <div className="mx-auto max-w-3xl space-y-4">
          <h2 id="program-career-heading" className={sectionStyles.heading}>
            Career opportunities
          </h2>
          {program.industry ? (
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Industry: </span>
              {program.industry}
            </p>
          ) : null}
          <Paragraphs paragraphs={program.careerOpportunities} />
        </div>
      </Container>
    </section>
  );
}

export function ProgramUniversityInfo({ program }: { program: ProgramDetail }) {
  const university = program.university;
  if (!university.slug) {
    return null;
  }

  return (
    <section
      aria-labelledby="program-university-heading"
      className={cn(sectionStyles.sectionMuted, sectionStyles.padding)}
    >
      <Container>
        <div className="mx-auto grid max-w-4xl items-center gap-8 md:grid-cols-[1fr_1.2fr]">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border/80 bg-muted">
            {university.image.src ? (
              <Image
                src={university.image.src}
                alt={university.image.alt}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            ) : null}
          </div>
          <div className="space-y-4">
            <h2 id="program-university-heading" className={sectionStyles.heading}>
              About the university
            </h2>
            <h3 className="text-xl font-semibold text-brand-navy">{university.name}</h3>
            <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="size-3.5" aria-hidden="true" />
              {university.city}
              {university.destinationCountry
                ? `, ${university.destinationCountry}`
                : ""}
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {university.description}
            </p>
            <Button asChild variant="outline" className={buttonStyles.responsiveOutline}>
              <Link href={`/universities/${university.slug}`}>View university</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

type RelatedProgramsProps = {
  programs: ProgramCard[];
};

export function RelatedPrograms({ programs }: RelatedProgramsProps) {
  if (programs.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="related-programs-heading"
      className={cn(sectionStyles.sectionBackground, sectionStyles.padding)}
    >
      <Container>
        <div className={sectionStyles.stack}>
          <h2 id="related-programs-heading" className={sectionStyles.heading}>
            Related programs
          </h2>
          <ProgramGrid programs={programs} />
        </div>
      </Container>
    </section>
  );
}

export function ProgramDetailCta({ program }: { program: ProgramDetail }) {
  return (
    <section
      aria-labelledby="program-detail-cta-heading"
      className={cn(sectionStyles.sectionNavy, sectionStyles.padding)}
    >
      <Container>
        <div className="mx-auto max-w-2xl space-y-6 text-center">
          <h2 id="program-detail-cta-heading" className={sectionStyles.headingOnDark}>
            Ready to apply for {program.title}?
          </h2>
          <p className={cn(sectionStyles.descriptionOnDark, "mx-auto")}>
            Speak with a counsellor or start your application — we will guide you
            through every step.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ProgramCta
              programSlug={program.slug}
              label="Apply Now"
              size="lg"
              className={buttonStyles.responsiveLg}
            />
            <Button asChild size="lg" className={buttonStyles.outlineOnDark}>
              <Link href="/contact">Book Free Consultation</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
