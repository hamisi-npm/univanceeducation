import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

import type { University } from "@/features/universities/types";
import { cardStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

type UniversityCardProps = {
  university: University;
  className?: string;
};

export function UniversityCard({ university, className }: UniversityCardProps) {
  const href = `/universities/${university.slug}`;

  return (
    <article
      className={cn(
        cardStyles.base,
        cardStyles.interactive,
        "group relative flex h-full flex-col overflow-hidden",
        className,
      )}
    >
      <Link
        href={href}
        className={cn("flex h-full flex-col", cardStyles.linkFocus)}
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          <Image
            src={university.image.src}
            alt={university.image.alt}
            fill
            quality={80}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={cn(
              "object-cover object-center",
              "motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out",
              "motion-safe:group-hover:scale-[1.03] motion-safe:group-focus-within:scale-[1.03]",
            )}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-md border border-white/25 bg-background/95 px-2.5 py-1.5 shadow-sm backdrop-blur-sm">
            <span className="text-base leading-none" aria-hidden="true">
              {university.flag}
            </span>
            <span className="sr-only">{university.country} flag</span>
            <span className="text-sm font-medium text-foreground">
              {university.country}
            </span>
          </div>
        </div>

        <div className={cn("flex flex-1 flex-col gap-3", cardStyles.padding)}>
          <div className="space-y-1">
            <h3 className={cardStyles.title}>{university.name}</h3>
            <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
              {university.city}
            </p>
          </div>

          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {university.type}
          </p>

          <p className={cn(cardStyles.body, "line-clamp-2")}>
            {university.description}
          </p>

          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Popular programs
            </p>
            <ul className="flex flex-wrap gap-1.5">
              {university.programs.map((program) => (
                <li
                  key={program}
                  className="rounded-md border border-border bg-muted/50 px-2 py-0.5 text-xs text-foreground"
                >
                  {program}
                </li>
              ))}
            </ul>
          </div>

          <p className="font-mono text-xs text-muted-foreground sm:text-sm">
            {university.tuitionRange}
          </p>

          <span className={cardStyles.textLink}>
            {university.ctaLabel}
            <ArrowRight className="size-4" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </article>
  );
}
