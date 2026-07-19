import { defineQuery } from "next-sanity";

import { imageWithAltProjection, universityCardProjection } from "@/queries/global";

const destinationCardProjection = `{
  _id,
  country,
  "slug": slug.current,
  flag,
  description,
  studyFields,
  tuitionRange,
  image ${imageWithAltProjection},
  featured,
  ctaLabel
}`;

export const destinationsPageQuery = defineQuery(`*[_type == "destinationsPage" && _id == $id][0]{
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
  featuredCountries {
    header {
      badge,
      heading,
      description
    },
    "destinations": destinations[]->${destinationCardProjection}
  },
  countryGrid {
    header {
      badge,
      heading,
      description
    },
    "destinations": destinations[]->${destinationCardProjection}
  },
  costComparison {
    header {
      badge,
      heading,
      description
    },
    columns {
      country,
      tuition,
      livingCosts,
      duration,
      workWhileStudying
    },
    rows[] {
      country,
      tuition,
      livingCosts,
      duration,
      workWhileStudying
    },
    caption
  },
  popularCourses {
    header {
      badge,
      heading,
      description
    },
    courses[] {
      title,
      description,
      icon
    }
  },
  admissionRequirements {
    header {
      badge,
      heading,
      description
    },
    requirements[] {
      title,
      description,
      icon
    }
  },
  faqPreview {
    header {
      badge,
      heading,
      description
    },
    items[] {
      question,
      answer
    },
    viewAll {
      label,
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
  }
}`);

export const destinationSlugsQuery = defineQuery(`*[_type == "destination" && defined(slug.current)] | order(order asc) {
  "slug": slug.current
}`);

export const destinationBySlugQuery = defineQuery(`*[_type == "destination" && slug.current == $slug][0]{
  _id,
  country,
  "slug": slug.current,
  flag,
  description,
  studyFields,
  tuitionRange,
  image ${imageWithAltProjection},
  featured,
  ctaLabel,
  heroImage ${imageWithAltProjection},
  gallery[] ${imageWithAltProjection},
  overview,
  livingCost,
  duration,
  workRights,
  visaInformation,
  scholarships,
  "universities": universities[]->${universityCardProjection},
  "testimonials": testimonials[]->{
    _id,
    name,
    course,
    rating,
    quote,
    featured,
    image ${imageWithAltProjection},
    "destination": destination->country,
    "university": university->name
  },
  seo {
    title,
    description
  }
}`);
