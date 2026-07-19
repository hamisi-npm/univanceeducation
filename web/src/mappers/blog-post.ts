import type { BlogArticle, BlogCategorySlug } from "@/features/blog/types";
import { slugify } from "@/lib/slugify";
import type { SanityImageWithAlt } from "@/types/sanity/global";
import type { SanityPortableText } from "@/types/sanity/shared";
import { blocksToParagraphs } from "@/lib/sanity/utils/portable-text";
import { resolveSanityImage } from "@/lib/sanity/utils/image";

export type SanityBlogPostCard = {
  _id?: string;
  slug: string;
  title: string;
  date: string;
  readTime: string;
  summary: string;
  featured?: boolean;
  coverImage: SanityImageWithAlt;
  categorySlug?: string;
  categoryLabel?: string;
  author?: string;
};

export type SanityBlogPostDetailDocument = Omit<SanityBlogPostCard, "author"> & {
  author?: {
    name: string;
    bio?: string;
    image?: SanityImageWithAlt;
  };
  body?: SanityPortableText;
  seo?: {
    title?: string;
    description?: string;
  };
  relatedPosts?: SanityBlogPostCard[] | null;
};

export type BlogPostDetail = BlogArticle & {
  body: string[];
  seo?: {
    title?: string;
    description?: string;
  };
  relatedPosts: BlogArticle[];
};

const EMPTY_ARTICLE: BlogArticle = {
  id: "",
  slug: "",
  title: "",
  category: "" as BlogCategorySlug,
  categoryLabel: "",
  author: "",
  date: "",
  readTime: "",
  coverImage: { src: "", alt: "" },
  summary: "",
};

function normalizeDate(date: string | undefined): string {
  if (!date) {
    return "";
  }

  return date.slice(0, 10);
}

export function mapBlogPostCard(post: SanityBlogPostCard): BlogArticle {
  return {
    id: post.slug || slugify(post.title),
    slug: post.slug || slugify(post.title),
    title: post.title || "",
    category: (post.categorySlug || "") as BlogCategorySlug,
    categoryLabel: post.categoryLabel || "",
    author: post.author || "",
    date: normalizeDate(post.date),
    readTime: post.readTime || "",
    coverImage: resolveSanityImage(post.coverImage, {
      src: "",
      alt: post.title || "",
    }),
    summary: post.summary || "",
    featured: post.featured ?? false,
  };
}

export function mapBlogPostDetail(
  document: SanityBlogPostDetailDocument,
): BlogPostDetail {
  const card = mapBlogPostCard({
    ...document,
    author: document.author?.name,
  });

  const body = document.body?.length
    ? blocksToParagraphs(document.body)
    : card.summary
      ? [card.summary]
      : [];

  const relatedPosts =
    document.relatedPosts?.map((post) => mapBlogPostCard(post)) ?? [];

  return {
    ...card,
    body,
    seo: document.seo,
    relatedPosts,
  };
}

export function getFeaturedFromPosts(posts: BlogArticle[]): BlogArticle {
  const featured = posts.find((post) => post.featured);
  return featured ?? posts[0] ?? EMPTY_ARTICLE;
}

export function getLatestFromPosts(posts: BlogArticle[], featured: BlogArticle): BlogArticle[] {
  return posts
    .filter((post) => post.id !== featured.id)
    .sort((a, b) => b.date.localeCompare(a.date));
}
