import { defineQuery } from "next-sanity";

import { imageWithAltProjection } from "@/queries/global";

export const studyGuideCardProjection = `{
  _id,
  "slug": slug.current,
  title,
  readTime,
  description,
  coverImage ${imageWithAltProjection},
  ctaLabel,
  "categorySlug": category->slug.current,
  "categoryLabel": category->label
}`;

export const studyGuidesPageQuery = defineQuery(`*[_type == "studyGuidesPage" && _id == $id][0]{
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
  featuredGuides {
    badge,
    heading,
    description
  },
  guideCategories {
    header {
      badge,
      heading,
      description
    },
    "categories": categories[]->{
      _id,
      label,
      "slug": slug.current,
      description
    }
  },
  studyChecklist {
    header {
      badge,
      heading,
      description
    },
    items[] {
      title,
      description
    }
  },
  resources {
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
  "guides": *[_type == "studyGuide"] | order(title asc) ${studyGuideCardProjection}
}`);

export const studyGuideSlugsQuery = defineQuery(`*[_type == "studyGuide" && defined(slug.current)] | order(title asc) {
  "slug": slug.current
}`);

export const studyGuideBySlugQuery = defineQuery(`*[_type == "studyGuide" && slug.current == $slug][0]{
  _id,
  "slug": slug.current,
  title,
  readTime,
  description,
  coverImage ${imageWithAltProjection},
  ctaLabel,
  body,
  "categorySlug": category->slug.current,
  "categoryLabel": category->label,
  seo {
    title,
    description
  },
  "relatedGuides": *[
    _type == "studyGuide" &&
    slug.current != $slug &&
    category._ref == ^.category._ref
  ] | order(title asc) [0...3] ${studyGuideCardProjection}
}`);
