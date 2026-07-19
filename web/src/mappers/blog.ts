import type {
  BlogPageContent,
  CategoryOption,
} from "@/features/blog/types";
import { slugify } from "@/lib/slugify";
import {
  getFeaturedFromPosts,
  getLatestFromPosts,
  mapBlogPostCard,
  type SanityBlogPostCard,
} from "@/mappers/blog-post";
import { mapCtaBanner, mapCtaLink, mapSectionHeader } from "@/mappers/shared";
import type { SanityCtaBanner } from "@/types/sanity/shared";
import { resolveSanityImage } from "@/lib/sanity/utils/image";
import type { BlogPageData } from "@/types/blog";

type SanityBlogPageDocument = {
  hero: {
    badge?: string;
    heading: string;
    description: string;
    cta: { label: string; href: string; external?: boolean };
    image: Parameters<typeof resolveSanityImage>[0];
  };
  featuredPost: { badge?: string; heading: string; description: string };
  latestArticles: { badge?: string; heading: string; description: string };
  guides: {
    header: { badge?: string; heading: string; description: string };
    links: Array<{
      title: string;
      description: string;
      href: string;
      external?: boolean;
    }> | null;
  };
  newsletter: BlogPageContent["newsletter"];
  cta: SanityCtaBanner;
  seo?: {
    title?: string;
    description?: string;
  };
  posts: SanityBlogPostCard[] | null;
  categories: Array<{ slug: string; label: string }> | null;
};

function mapGuideLinks(links: SanityBlogPageDocument["guides"]["links"]) {
  if (!links?.length) {
    return [];
  }

  return links.map((link, index) => ({
    id: slugify(link.title) || `guide-${index}`,
    title: link.title || "",
    description: link.description || "",
    href: link.href || "",
  }));
}

function mapCategoryOptions(
  categories: SanityBlogPageDocument["categories"],
): CategoryOption[] {
  if (!categories?.length) {
    return [];
  }

  return categories.map((category) => ({
    slug: (category.slug || slugify(category.label)) as CategoryOption["slug"],
    label: category.label || "",
  }));
}

export function mapBlogPage(
  document: SanityBlogPageDocument | null | undefined,
): BlogPageData {
  if (!document) {
    throw new Error("Missing Sanity document");
  }

  const posts = document.posts?.map((post) => mapBlogPostCard(post)) ?? [];
  const featuredArticle = getFeaturedFromPosts(posts);
  const latestArticleList = getLatestFromPosts(posts, featuredArticle);

  return {
    hero: {
      badge: document.hero?.badge || "",
      heading: document.hero?.heading || "",
      description: document.hero?.description || "",
      cta: mapCtaLink(document.hero?.cta),
      image: resolveSanityImage(document.hero?.image, { src: "", alt: "" }),
    },
    featuredPost: mapSectionHeader(document.featuredPost),
    latestArticles: mapSectionHeader(document.latestArticles),
    guides: {
      ...mapSectionHeader(document.guides?.header),
      guides: mapGuideLinks(document.guides?.links),
    },
    newsletter: {
      badge: document.newsletter?.badge || "",
      heading: document.newsletter?.heading || "",
      description: document.newsletter?.description || "",
      emailLabel: document.newsletter?.emailLabel || "",
      emailPlaceholder: document.newsletter?.emailPlaceholder || "",
      submitLabel: document.newsletter?.submitLabel || "",
      privacyNote: document.newsletter?.privacyNote || "",
    },
    cta: mapCtaBanner(document.cta),
    featuredArticle,
    latestArticleList,
    categoryOptions: mapCategoryOptions(document.categories),
    seo: document.seo,
  };
}
