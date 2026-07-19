"use client";

import { useMemo, useState } from "react";

import { Container } from "@/components/layout/container";
import { ArticleCard } from "@/features/blog/components/article-card";
import { CategoryFilter } from "@/features/blog/components/category-filter";
import type { BlogArticle, CategoryOption, LatestArticlesContent } from "@/features/blog/types";
import { sectionStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

type ArticleGridProps = {
  content: LatestArticlesContent;
  articles: BlogArticle[];
  categoryOptions: CategoryOption[];
  className?: string;
};

export function ArticleGrid({
  content,
  articles,
  categoryOptions,
  className,
}: ArticleGridProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredArticles = useMemo(() => {
    if (selectedCategory === "all") {
      return articles;
    }
    return articles.filter((article) => article.category === selectedCategory);
  }, [articles, selectedCategory]);

  const resultsLabel =
    selectedCategory === "all"
      ? `Showing all ${filteredArticles.length} articles`
      : `Showing ${filteredArticles.length} articles in ${
          categoryOptions.find((category) => category.slug === selectedCategory)
            ?.label ?? selectedCategory
        }`;

  return (
    <section
      aria-labelledby="article-grid-heading"
      className={cn(sectionStyles.sectionBackground, sectionStyles.padding, className)}
    >
      <Container>
        <div className={sectionStyles.stack}>
          <div className={sectionStyles.header}>
            <span
              className={cn(
                sectionStyles.badge,
                sectionStyles.badgeOnBackground,
              )}
            >
              {content.badge}
            </span>
            <h2 id="article-grid-heading" className={sectionStyles.heading}>
              {content.heading}
            </h2>
            <p className={sectionStyles.description}>{content.description}</p>
          </div>

          <CategoryFilter
            categories={categoryOptions}
            selectedSlug={selectedCategory}
            onSelect={setSelectedCategory}
          />

          <p className="text-sm text-muted-foreground" aria-live="polite">
            {resultsLabel}
          </p>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article) => (
              <div key={article.id} className="h-full">
                <ArticleCard article={article} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
