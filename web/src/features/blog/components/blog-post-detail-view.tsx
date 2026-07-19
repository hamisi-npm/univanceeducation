import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";

import { Container } from "@/components/layout/container";
import { ArticleCard } from "@/features/blog/components/article-card";
import { formatArticleDate } from "@/lib/format-article-date";
import type { BlogPostDetail } from "@/types/blog";
import { buttonStyles, sectionStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type BlogPostDetailViewProps = {
  post: BlogPostDetail;
};

export function BlogPostDetailView({ post }: BlogPostDetailViewProps) {
  return (
    <>
      <section
        aria-labelledby="blog-post-heading"
        className="relative -mt-14 overflow-hidden bg-background pt-14"
      >
        <Container className="relative py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-3xl space-y-8">
            <Button asChild variant="ghost" size="sm" className={buttonStyles.responsiveOutline}>
              <Link href="/blog">
                <ArrowLeft className="size-4" aria-hidden="true" />
                Back to blog
              </Link>
            </Button>

            <div className={cn(sectionStyles.header, "items-start text-left")}>
              <span className={cn(sectionStyles.badge, sectionStyles.badgeOnBackground)}>
                {post.categoryLabel}
              </span>
              <h1
                id="blog-post-heading"
                className="text-balance text-3xl font-medium tracking-tight text-foreground sm:text-4xl lg:text-5xl"
              >
                {post.title}
              </h1>
              <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
                {post.summary}
              </p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                <span>{post.author}</span>
                <span aria-hidden="true">·</span>
                <time dateTime={post.date}>{formatArticleDate(post.date)}</time>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="size-4" aria-hidden="true" />
                  {post.readTime}
                </span>
              </div>
            </div>
          </div>

          <div className="relative mx-auto mt-10 aspect-[16/9] max-w-4xl overflow-hidden rounded-lg border border-border/80 bg-muted shadow-sm ring-1 ring-border/40">
            <Image
              src={post.coverImage.src}
              alt={post.coverImage.alt}
              fill
              priority
              quality={85}
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover object-center"
            />
          </div>
        </Container>
      </section>

      {post.body.length > 0 ? (
        <section className={cn(sectionStyles.sectionMuted, sectionStyles.padding)}>
          <Container>
            <div className="prose prose-neutral mx-auto max-w-prose dark:prose-invert">
              {post.body.map((paragraph) => (
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

      {post.relatedPosts.length > 0 ? (
        <section
          aria-labelledby="related-posts-heading"
          className={cn(sectionStyles.sectionBackground, sectionStyles.padding)}
        >
          <Container>
            <div className={sectionStyles.stack}>
              <h2 id="related-posts-heading" className={sectionStyles.heading}>
                Related articles
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {post.relatedPosts.map((article) => (
                  <div key={article.id} className="h-full">
                    <ArticleCard article={article} />
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
