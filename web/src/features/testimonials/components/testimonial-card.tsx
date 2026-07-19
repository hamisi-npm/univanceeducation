import Image from "next/image";
import { Star } from "lucide-react";

import type {
  Testimonial,
  TestimonialCardVariant,
} from "@/features/testimonials/types";
import { cardStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

type TestimonialCardProps = {
  testimonial: Testimonial;
  variant: TestimonialCardVariant;
  className?: string;
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div
      className="flex gap-0.5"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          className={cn(
            "size-4",
            index < rating
              ? "fill-primary text-primary"
              : "text-muted-foreground/25",
          )}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function TestimonialMeta({ testimonial }: { testimonial: Testimonial }) {
  return (
    <dl className="space-y-1 text-sm text-muted-foreground">
      <div>
        <dt className="sr-only">Destination</dt>
        <dd>{testimonial.destination}</dd>
      </div>
      <div>
        <dt className="sr-only">University</dt>
        <dd>{testimonial.university}</dd>
      </div>
      <div>
        <dt className="sr-only">Course</dt>
        <dd>{testimonial.course}</dd>
      </div>
    </dl>
  );
}

export function TestimonialCard({
  testimonial,
  variant,
  className,
}: TestimonialCardProps) {
  const isFeatured = variant === "featured";

  return (
    <article
      className={cn(
        cardStyles.base,
        cardStyles.interactive,
        "group flex h-full flex-col",
        isFeatured && "overflow-hidden lg:flex-row lg:items-stretch",
        className,
      )}
    >
      <div
        className={cn(
          "relative shrink-0 overflow-hidden bg-muted",
          isFeatured
            ? "aspect-[4/3] lg:aspect-[3/4] lg:w-[min(100%,280px)]"
            : "mx-6 mt-6 size-16 shrink-0 rounded-full border border-border",
        )}
      >
        <Image
          src={testimonial.image.src}
          alt={testimonial.image.alt}
          {...(isFeatured
            ? {
                fill: true,
                sizes: "(max-width: 1024px) 100vw, 280px",
              }
            : {
                width: 64,
                height: 64,
              })}
          quality={80}
          className={cn(
            "object-cover object-center",
            !isFeatured && "size-16 rounded-full",
            isFeatured &&
              "motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.03]",
          )}
        />
      </div>

      <div
        className={cn(
          "flex flex-1 flex-col",
          cardStyles.padding,
          isFeatured ? "gap-5 lg:justify-center" : "gap-4 pt-4",
        )}
      >
        <StarRating rating={testimonial.rating} />

        <figure className="flex flex-1 flex-col gap-4">
          <blockquote
            className={cn(
              "text-muted-foreground",
              isFeatured
                ? "text-base leading-relaxed lg:text-lg"
                : cardStyles.body,
            )}
          >
            <p>&ldquo;{testimonial.quote}&rdquo;</p>
          </blockquote>
          <figcaption className="space-y-2">
            <cite className="text-lg font-medium not-italic text-foreground">
              {testimonial.name}
            </cite>
            <TestimonialMeta testimonial={testimonial} />
          </figcaption>
        </figure>
      </div>
    </article>
  );
}
