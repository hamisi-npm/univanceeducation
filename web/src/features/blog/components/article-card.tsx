import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

import type { BlogArticle } from "@/features/blog/types";
import { formatArticleDate } from "@/lib/format-article-date";
import { cardStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

type ArticleCardProps = {
  article: BlogArticle;
  className?: string;
};

export function ArticleCard({ article, className }: ArticleCardProps) {
  const href = `/blog/${article.slug}`;

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
            src={article.coverImage.src}
            alt={article.coverImage.alt}
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
            {article.categoryLabel}
          </div>
        </div>

        <div className={cn("flex flex-1 flex-col gap-3", cardStyles.padding)}>
          <div className="space-y-2">
            <h3 className={cn(cardStyles.title, "line-clamp-2")}>
              {article.title}
            </h3>
            <p className={cn(cardStyles.body, "line-clamp-3")}>
              {article.summary}
            </p>
          </div>

          <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
            <span>{article.author}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={article.date}>
              {formatArticleDate(article.date)}
            </time>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3.5" aria-hidden="true" />
              {article.readTime}
            </span>
          </div>

          <span className={cardStyles.textLink}>
            Read article
            <ArrowRight className="size-4" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </article>
  );
}
