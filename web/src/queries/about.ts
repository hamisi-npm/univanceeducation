import { defineQuery } from "next-sanity";

import { imageWithAltProjection } from "@/queries/global";

export const aboutPageQuery = defineQuery(`*[_type == "aboutPage" && _id == $id][0]{
  hero {
    header {
      badge,
      heading,
      description
    },
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
    image ${imageWithAltProjection}
  },
  companyStory {
    badge,
    heading,
    paragraphs,
    image ${imageWithAltProjection}
  },
  missionVision {
    header {
      badge,
      heading,
      description
    },
    cards[] {
      title,
      description
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
