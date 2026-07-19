import { defineQuery } from "next-sanity";

import { imageWithAltProjection, universityCardProjection } from "@/queries/global";

export const universitiesPageQuery = defineQuery(`*[_type == "universitiesPage" && _id == $id][0]{
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
  featuredUniversities {
    header {
      badge,
      heading,
      description
    },
    "universities": universities[]->${universityCardProjection}
  },
  browseByCountry {
    badge,
    heading,
    description
  },
  popularPrograms {
    header {
      badge,
      heading,
      description
    },
    programs[] {
      title,
      description,
      icon
    }
  },
  admissionOverview {
    header {
      badge,
      heading,
      description
    },
    steps[] {
      title,
      description,
      icon
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
  "allUniversities": *[_type == "university"] | order(order asc) ${universityCardProjection}
}`);

export const universitySlugsQuery = defineQuery(`*[_type == "university" && defined(slug.current)] | order(order asc) {
  "slug": slug.current
}`);

export const universityBySlugQuery = defineQuery(`*[_type == "university" && slug.current == $slug][0]{
  _id,
  name,
  "slug": slug.current,
  city,
  type,
  description,
  programs,
  tuitionRange,
  image ${imageWithAltProjection},
  featured,
  ctaLabel,
  ranking,
  scholarships,
  destination->{
    country,
    "slug": slug.current,
    flag
  },
  seo {
    title,
    description
  }
}`);
