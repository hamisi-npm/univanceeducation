import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { TestimonialCard } from "@/features/testimonials/components/testimonial-card";
import { UniversityCard } from "@/features/universities/components/university-card";
import type { DestinationDetail } from "@/types/destinations";
import { buttonStyles, sectionStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

type DestinationDetailViewProps = {
  destination: DestinationDetail;
};

export function DestinationDetailView({ destination }: DestinationDetailViewProps) {
  const featuredTestimonial = destination.testimonials.find((item) => item.featured);
  const supportingTestimonials = destination.testimonials.filter((item) => !item.featured);

  return (
    <>
      <section
        aria-labelledby="destination-hero-heading"
        className="relative -mt-14 overflow-hidden bg-background pt-14"
      >
        <Container className="relative py-16 sm:py-20 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className={sectionStyles.header}>
              <span className={cn(sectionStyles.badge, sectionStyles.badgeOnBackground)}>
                {destination.flag} {destination.country}
              </span>
              <h1
                id="destination-hero-heading"
                className="text-balance text-3xl font-medium tracking-tight text-foreground sm:text-4xl lg:text-5xl"
              >
                Study in {destination.country}
              </h1>
              <p className={sectionStyles.description}>{destination.description}</p>
              <p className="font-mono text-sm text-muted-foreground">{destination.tuitionRange}</p>
              <Button asChild size="lg" className={cn("mt-4", buttonStyles.responsiveLg)}>
                <Link href="/contact">Book Free Consultation</Link>
              </Button>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border/80 bg-muted shadow-sm ring-1 ring-border/40">
              <Image
                src={destination.heroImage.src}
                alt={destination.heroImage.alt}
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

      {destination.overview.length > 0 ? (
        <section
          aria-labelledby="destination-overview-heading"
          className={cn(sectionStyles.sectionMuted, sectionStyles.padding)}
        >
          <Container>
            <div className="mx-auto max-w-3xl space-y-4">
              <h2 id="destination-overview-heading" className={sectionStyles.heading}>
                Overview
              </h2>
              {destination.overview.map((paragraph) => (
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

      {destination.livingCost || destination.duration || destination.workRights ? (
        <section
          aria-labelledby="destination-facts-heading"
          className={cn(sectionStyles.sectionBackground, sectionStyles.padding)}
        >
          <Container>
            <h2 id="destination-facts-heading" className="sr-only">
              Key facts
            </h2>
            <dl className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {destination.livingCost ? (
                <div className="rounded-lg border border-border bg-card p-5">
                  <dt className="text-sm font-medium text-foreground">Living costs</dt>
                  <dd className="mt-2 text-sm text-muted-foreground">{destination.livingCost}</dd>
                </div>
              ) : null}
              {destination.duration ? (
                <div className="rounded-lg border border-border bg-card p-5">
                  <dt className="text-sm font-medium text-foreground">Typical duration</dt>
                  <dd className="mt-2 text-sm text-muted-foreground">{destination.duration}</dd>
                </div>
              ) : null}
              {destination.workRights ? (
                <div className="rounded-lg border border-border bg-card p-5">
                  <dt className="text-sm font-medium text-foreground">Work while studying</dt>
                  <dd className="mt-2 text-sm text-muted-foreground">{destination.workRights}</dd>
                </div>
              ) : null}
            </dl>
          </Container>
        </section>
      ) : null}

      {destination.visaInformation || destination.scholarships ? (
        <section className={cn(sectionStyles.sectionMuted, sectionStyles.padding)}>
          <Container>
            <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
              {destination.visaInformation ? (
                <article className="space-y-3">
                  <h2 className="text-xl font-medium tracking-tight text-foreground">
                    Visa information
                  </h2>
                  <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                    {destination.visaInformation}
                  </p>
                </article>
              ) : null}
              {destination.scholarships ? (
                <article className="space-y-3">
                  <h2 className="text-xl font-medium tracking-tight text-foreground">
                    Scholarships
                  </h2>
                  <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                    {destination.scholarships}
                  </p>
                </article>
              ) : null}
            </div>
          </Container>
        </section>
      ) : null}

      {destination.universities.length > 0 ? (
        <section
          aria-labelledby="destination-universities-heading"
          className={cn(sectionStyles.sectionBackground, sectionStyles.padding)}
        >
          <Container>
            <div className={sectionStyles.stack}>
              <h2 id="destination-universities-heading" className={sectionStyles.heading}>
                Universities in {destination.country}
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {destination.universities.map((university) => (
                  <div key={university.id} className="h-full">
                    <UniversityCard university={university} />
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      {featuredTestimonial ? (
        <section className={cn(sectionStyles.sectionMuted, sectionStyles.padding)}>
          <Container>
            <TestimonialCard testimonial={featuredTestimonial} variant="featured" />
            {supportingTestimonials.length > 0 ? (
              <ul className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {supportingTestimonials.map((testimonial) => (
                  <li key={testimonial.id} className="h-full">
                    <TestimonialCard testimonial={testimonial} variant="standard" />
                  </li>
                ))}
              </ul>
            ) : null}
          </Container>
        </section>
      ) : null}
    </>
  );
}
