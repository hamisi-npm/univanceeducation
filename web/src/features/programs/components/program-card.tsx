import Image from "next/image";
import Link from "next/link";
import { ArrowRight, GraduationCap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProgramCta } from "@/features/programs/components/program-cta";
import type { ProgramCard as ProgramCardData } from "@/types/programs";
import { buttonStyles, cardStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

type ProgramCardProps = {
  program: ProgramCardData;
  className?: string;
  applyHref?: string;
};

export function ProgramCard({
  program,
  className,
  applyHref = "/contact",
}: ProgramCardProps) {
  const detailsHref = `/programs/${program.slug}`;

  return (
    <article
      className={cn(
        cardStyles.base,
        cardStyles.interactive,
        "group relative flex h-full flex-col overflow-hidden",
        className,
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        {program.image.src ? (
          <Image
            src={program.image.src}
            alt={program.image.alt}
            fill
            quality={80}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={cn(
              "object-cover object-center",
              "motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out",
              "motion-safe:group-hover:scale-[1.03]",
            )}
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-brand-navy/10 text-brand-navy">
            <GraduationCap className="size-10" aria-hidden="true" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
        {program.scholarshipAvailable ? (
          <span className="absolute right-3 top-3 rounded-md bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground">
            Scholarship
          </span>
        ) : null}
        <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-md border border-white/25 bg-background/95 px-2.5 py-1.5 shadow-sm backdrop-blur-sm">
          <span className="text-base leading-none" aria-hidden="true">
            {program.destinationFlag}
          </span>
          <span className="text-sm font-medium text-foreground">
            {program.destinationCountry}
          </span>
        </div>
      </div>

      <div className={cn("flex flex-1 flex-col gap-3", cardStyles.padding)}>
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {program.studyLevelName}
            {program.duration ? ` · ${program.duration}` : ""}
          </p>
          <h3 className={cardStyles.title}>
            <Link
              href={detailsHref}
              className={cn(
                "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
              )}
            >
              {program.title}
            </Link>
          </h3>
          <p className="text-sm text-muted-foreground">{program.universityName}</p>
        </div>

        <p className={cn(cardStyles.body, "line-clamp-2")}>
          {program.shortDescription}
        </p>

        {program.tuitionLabel ? (
          <p className="font-mono text-sm text-muted-foreground">
            {program.tuitionLabel}
            <span className="text-xs"> / year</span>
          </p>
        ) : null}

        <div className="mt-auto flex flex-col gap-2 pt-2 sm:flex-row">
          <Button asChild variant="outline" size="sm" className="flex-1">
            <Link href={detailsHref}>
              View Details
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </Button>
          <ProgramCta
            programSlug={program.slug}
            href={applyHref}
            label="Apply Now"
            size="sm"
            className={cn(buttonStyles.gold, "flex-1")}
          />
        </div>
      </div>
    </article>
  );
}
