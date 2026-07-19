import { defineQuery } from "next-sanity";

export const faqsPageQuery = defineQuery(`*[_type == "faqsPage" && _id == $id][0]{
  hero {
    badge,
    heading,
    description,
    cta {
      label,
      href,
      external
    }
  },
  "categories": categories[]->{
    _id,
    title,
    description,
    items[] {
      question,
      answer
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
  }
}`);
