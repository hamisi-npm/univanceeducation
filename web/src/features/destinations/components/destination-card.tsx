import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type {
  Destination,
  DestinationCardVariant,
} from "@/features/destinations/types";
import { cardStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

type DestinationCardProps = {
  destination: Destination;
  variant: DestinationCardVariant;
  className?: string;
};

export function DestinationCard({
  destination,
  variant,
  className,
}: DestinationCardProps) {
  const href = `/destinations/${destination.slug}`;
  const isFeatured = variant === "featured";

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
        <div
          className={cn(
            "relative overflow-hidden bg-muted",
            isFeatured ? "aspect-[16/9] lg:aspect-[21/9]" : "aspect-[4/3]",
          )}
        >
          <Image
            src={destination.image.src}
            alt={destination.image.alt}
            fill
            quality={80}
            sizes={
              isFeatured
                ? "(max-width: 1024px) 100vw, 50vw"
                : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            }
            className={cn(
              "object-cover object-center",
              "motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out",
              "motion-safe:group-hover:scale-[1.03] motion-safe:group-focus-within:scale-[1.03]",
            )}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-md border border-white/25 bg-background/95 px-2.5 py-1.5 shadow-sm backdrop-blur-sm">
            <span className="text-base leading-none" aria-hidden="true">
              {destination.flag}
            </span>
            <span className="sr-only">{destination.country} flag</span>
            <span className="text-sm font-medium text-foreground">
              {destination.country}
            </span>
          </div>
        </div>

        <div
          className={cn(
            "flex flex-1 flex-col",
            cardStyles.padding,
            isFeatured ? "gap-4 lg:gap-5" : "gap-3",
          )}
        >
          {!isFeatured ? (
            <h3 className={cardStyles.title}>{destination.country}</h3>
          ) : null}

          <p
            className={cn(
              isFeatured
                ? "text-base leading-relaxed text-muted-foreground"
                : cardStyles.body,
            )}
          >
            {destination.description}
          </p>

          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Popular fields
            </p>
            <ul className="flex flex-wrap gap-1.5">
              {destination.studyFields.map((field) => (
                <li
                  key={field}
                  className="rounded-md border border-border bg-muted/50 px-2 py-0.5 text-xs text-foreground"
                >
                  {field}
                </li>
              ))}
            </ul>
          </div>

          <p className="font-mono text-xs text-muted-foreground sm:text-sm">
            {destination.tuitionRange}
          </p>

          <span className={cardStyles.textLink}>
            {destination.ctaLabel}
            <ArrowRight className="size-4" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </article>
  );
}
