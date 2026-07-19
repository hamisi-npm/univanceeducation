import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

import type { StudyGuide } from "@/features/study-guides/types";
import { cardStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

type GuideCardProps = {
  guide: StudyGuide;
  className?: string;
};

export function GuideCard({ guide, className }: GuideCardProps) {
  const href = `/study-guides/${guide.slug}`;

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
            src={guide.coverImage.src}
            alt={guide.coverImage.alt}
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
          <div className="absolute bottom-3 left-3 rounded-md border border-white/25 bg-background/95 px-2.5 py-1.5 text-xs font-medium text-foreground shadow-sm backdrop-blur-sm">
            {guide.categoryLabel}
          </div>
        </div>

        <div className={cn("flex flex-1 flex-col gap-3", cardStyles.padding)}>
          <div className="space-y-2">
            <h3 className={cn(cardStyles.title, "line-clamp-2")}>
              {guide.title}
            </h3>
            <p className={cn(cardStyles.body, "line-clamp-3")}>
              {guide.description}
            </p>
          </div>

          <div className="mt-auto flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="size-3.5" aria-hidden="true" />
            {guide.readTime}
          </div>

          <span className={cardStyles.textLink}>
            {guide.ctaLabel}
            <ArrowRight className="size-4" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </article>
  );
}
