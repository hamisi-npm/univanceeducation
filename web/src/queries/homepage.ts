import { defineQuery } from "next-sanity";

import { imageWithAltProjection } from "@/queries/global";

export const homepageQuery = defineQuery(`*[_type == "homepage" && _id == $id][0]{
  hero {
    badge {
      text,
      suffix,
      href
    },
    headline,
    subheadline,
    trustMicrocopy,
    ctas {
      primary {
        label,
        href,
        external
      },
      secondary {
        label,
        href,
        external
      }
    },
    image ${imageWithAltProjection},
    floatingCards[] {
      title,
      subtitle,
      icon,
      position
    }
  },
  trustStats[] {
    value,
    label,
    footnote
  },
  trustedUniversities {
    heading,
    partners[]->{
      name
    }
  },
  servicesPreview {
    header {
      badge,
      heading,
      description
    },
    services[]->{
      _id,
      title,
      "slug": slug.current,
      description,
      icon,
      "ctaLabel": coalesce(cta.label, "Learn More")
    }
  },
  featuredDestinations {
    header {
      badge,
      heading,
      description
    },
    viewAll {
      label,
      href,
      external
    },
    destinations[]->{
      _id,
      "slug": slug.current,
      country,
      flag,
      description,
      studyFields,
      tuitionRange,
      image ${imageWithAltProjection},
      featured,
      ctaLabel
    }
  },
  processPreview {
    header {
      badge,
      heading,
      description
    },
    steps[]->{
      _id,
      step,
      title,
      description,
      icon
    },
    cta {
      label,
      href,
      supportingText
    }
  },
  testimonialsPreview {
    header {
      badge,
      heading,
      description
    },
    testimonials[]->{
      _id,
      name,
      course,
      rating,
      quote,
      featured,
      image ${imageWithAltProjection},
      "destination": destination->country,
      "university": university->name
    }
  },
  ctaBanner {
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
