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
    image ${imageWithAltProjection}
  },
  trustStats[] {
    value,
    label,
    footnote
  },
  programFinder {
    heading,
    title,
    description,
    destinationLabel,
    destinationPlaceholder,
    courseLabel,
    coursePlaceholder,
    studyLevelLabel,
    studyLevelPlaceholder,
    backgroundTheme,
    showDestination,
    showCourse,
    showStudyLevel,
    cta {
      label,
      href,
      external
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
  whyChooseUs {
    header {
      badge,
      heading,
      description
    },
    features[] {
      title,
      description,
      icon
    },
    cta {
      label,
      href,
      external
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
