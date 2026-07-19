import { defineQuery } from "next-sanity";

import { imageWithAltProjection } from "@/queries/global";

const teamMemberProjection = `{
  _id,
  name,
  position,
  bio,
  order,
  image ${imageWithAltProjection}
}`;

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
  team {
    header {
      badge,
      heading,
      description
    },
    "members": members[]->${teamMemberProjection} | order(order asc)
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
