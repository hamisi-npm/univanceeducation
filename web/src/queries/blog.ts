import { defineQuery } from "next-sanity";

import { imageWithAltProjection } from "@/queries/global";

export const blogPostCardProjection = `{
  _id,
  "slug": slug.current,
  title,
  date,
  readTime,
  summary,
  featured,
  coverImage ${imageWithAltProjection},
  "categorySlug": category->slug.current,
  "categoryLabel": category->label,
  "author": author->name
}`;

export const blogPageQuery = defineQuery(`*[_type == "blogPage" && _id == $id][0]{
  hero {
    badge,
    heading,
    description,
    cta {
      label,
      href,
      external
    },
    image ${imageWithAltProjection}
  },
  featuredPost {
    badge,
    heading,
    description
  },
  latestArticles {
    badge,
    heading,
    description
  },
  guides {
    header {
      badge,
      heading,
      description
    },
    links[] {
      title,
      description,
      href,
      external
    }
  },
  newsletter {
    badge,
    heading,
    description,
    emailLabel,
    emailPlaceholder,
    submitLabel,
    privacyNote
  },
  cta {
    badge,
    heading,
    description,
    primaryCta {
      label,
      href,
      external
    },
    secondaryCta {
      label,
      href,
      external
    },
    trustMicrocopy
  },
  seo {
    title,
    description
  },
  "posts": *[_type == "blogPost"] | order(date desc) ${blogPostCardProjection},
  "categories": *[_type == "blogCategory"] | order(label asc) {
    "slug": slug.current,
    label
  }
}`);

export const blogPostSlugsQuery = defineQuery(`*[_type == "blogPost" && defined(slug.current)] | order(date desc) {
  "slug": slug.current
}`);

export const blogPostBySlugQuery = defineQuery(`*[_type == "blogPost" && slug.current == $slug][0]{
  _id,
  "slug": slug.current,
  title,
  date,
  readTime,
  summary,
  featured,
  coverImage ${imageWithAltProjection},
  body,
  "categorySlug": category->slug.current,
  "categoryLabel": category->label,
  author->{
    name,
    bio,
    image ${imageWithAltProjection}
  },
  seo {
    title,
    description
  },
  "relatedPosts": *[
    _type == "blogPost" &&
    slug.current != $slug &&
    category._ref == ^.category._ref
  ] | order(date desc) [0...3] ${blogPostCardProjection}
}`);
