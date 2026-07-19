import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

import { Container } from "@/components/layout/container";
import type { BlogArticle, FeaturedPostContent } from "@/features/blog/types";
import { formatArticleDate } from "@/lib/format-article-date";
import { cardStyles, sectionStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

type FeaturedPostProps = {
  content: FeaturedPostContent;
  article: BlogArticle;
  className?: string;
};

export function FeaturedPost({ content, article, className }: FeaturedPostProps) {
  const href = `/blog/${article.slug}`;

  return (
    <section
      aria-labelledby="featured-post-heading"
      className={cn(sectionStyles.sectionMuted, sectionStyles.padding, className)}
    >
      <Container>
        <div className={sectionStyles.stack}>
          <div className={sectionStyles.header}>
            <span
              className={cn(
                sectionStyles.badge,
                sectionStyles.badgeOnMuted,
              )}
            >
              {content.badge}
            </span>
            <h2 id="featured-post-heading" className={sectionStyles.heading}>
              {content.heading}
            </h2>
            <p className={sectionStyles.description}>{content.description}</p>
          </div>

          <article
            className={cn(
              cardStyles.base,
              cardStyles.interactive,
              "group overflow-hidden",
            )}
          >
            <Link
              href={href}
              className={cn(
                "grid lg:grid-cols-2",
                cardStyles.linkFocus,
              )}
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-muted lg:aspect-auto lg:min-h-[320px]">
                <Image
                  src={article.coverImage.src}
                  alt={article.coverImage.alt}
                  fill
                  priority
                  quality={85}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className={cn(
                    "object-cover object-center",
                    "motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out",
                    "motion-safe:group-hover:scale-[1.02] motion-safe:group-focus-within:scale-[1.02]",
                  )}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-black/10" />
              </div>

              <div className="flex flex-col justify-center gap-5 p-6 sm:p-8 lg:p-10">
                <span className="w-fit rounded-md border border-border bg-muted/50 px-2.5 py-1 text-xs font-medium text-foreground">
                  {article.categoryLabel}
                </span>
                <h3 className="text-balance text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
                  {article.title}
                </h3>
                <p className="text-pretty text-base leading-relaxed text-muted-foreground">
                  {article.summary}
                </p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                  <span>{article.author}</span>
                  <span aria-hidden="true">·</span>
                  <time dateTime={article.date}>
                    {formatArticleDate(article.date)}
                  </time>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="size-4" aria-hidden="true" />
                    {article.readTime}
                  </span>
                </div>
                <span className={cn(cardStyles.textLink, "mt-2")}>
                  Read featured article
                  <ArrowRight className="size-4" aria-hidden="true" />
                </span>
              </div>
            </Link>
          </article>
        </div>
      </Container>
    </section>
  );
}
