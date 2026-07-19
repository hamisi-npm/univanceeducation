import { defineQuery } from "next-sanity";

import { imageWithAltProjection } from "@/queries/global";

const serviceProjection = `{
  _id,
  title,
  "slug": slug.current,
  description,
  icon,
  benefits,
  timeline,
  cta {
    label,
    href,
    external
  },
  order
}`;

const processStepProjection = `{
  _id,
  step,
  title,
  description,
  icon
}`;

export const servicesPageQuery = defineQuery(`*[_type == "servicesPage" && _id == $id][0]{
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
  overview {
    badge,
    heading,
    description
  },
  serviceDetails {
    header {
      badge,
      heading,
      description
    },
    "services": services[]->${serviceProjection}
  },
  processOverview {
    badge,
    heading,
    description
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
  "allServices": *[_type == "service"] | order(order asc) ${serviceProjection},
  "processSteps": *[_type == "processStep"] | order(step asc) ${processStepProjection},
  seo {
    title,
    description
  }
}`);
