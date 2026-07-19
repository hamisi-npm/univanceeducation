import { cache } from "react";

import { sanityTags } from "@/lib/sanity/cache-tags";
import { sanityFetch } from "@/lib/sanity/fetch";
import { mapBlogPage } from "@/mappers/blog";
import {
  mapBlogPostDetail,
  type SanityBlogPostDetailDocument,
} from "@/mappers/blog-post";
import {
  blogPageQuery,
  blogPostBySlugQuery,
  blogPostSlugsQuery,
} from "@/queries/blog";
import { singletonDocumentIds } from "@/lib/sanity/singletons";
import type { BlogPageData, BlogPostDetail } from "@/types/blog";

export const getBlogPage = cache(async (): Promise<BlogPageData> => {
  const document = await sanityFetch<Parameters<typeof mapBlogPage>[0]>({
    query: blogPageQuery,
    params: { id: singletonDocumentIds.blogPage },
    tags: [sanityTags.blog, sanityTags.blogPost],
  });

  if (!document) {
    throw new Error("Missing Sanity singleton: blogPage");
  }

  return mapBlogPage(document);
});

export const getBlogSlugs = cache(async (): Promise<string[]> => {
  const slugs = await sanityFetch<Array<{ slug: string }>>({
    query: blogPostSlugsQuery,
    tags: [sanityTags.blogPost, sanityTags.blog],
  });

  return (slugs ?? []).map((item) => item.slug);
});

export const getBlogPostBySlug = cache(
  async (slug: string): Promise<BlogPostDetail | null> => {
    const document = await sanityFetch<SanityBlogPostDetailDocument>({
      query: blogPostBySlugQuery,
      params: { slug },
      tags: [sanityTags.blogPost, sanityTags.blog],
    });

    if (!document) {
      return null;
    }

    return mapBlogPostDetail(document);
  },
);
