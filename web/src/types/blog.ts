import type { BlogPageContent, BlogArticle, CategoryOption } from "@/features/blog/types";
import type { CmsSeo } from "@/types/cms-seo";

export type BlogPageData = BlogPageContent & {
  featuredArticle: BlogArticle;
  latestArticleList: BlogArticle[];
  categoryOptions: CategoryOption[];
  seo?: CmsSeo;
};

export type { BlogPostDetail } from "@/mappers/blog-post";
