import { defineQuery } from "next-sanity";

import { imageWithAltProjection } from "@/queries/global";

export const contactPageQuery = defineQuery(`*[_type == "contactPage" && _id == $id][0]{
  hero {
    header {
      badge,
      heading,
      description
    },
    cta {
      label,
      href,
      external
    },
    image ${imageWithAltProjection}
  },
  contactMethods {
    header {
      badge,
      heading,
      description
    },
    methods[] {
      title,
      description,
      value,
      href,
      external,
      icon
    }
  },
  consultationForm {
    header {
      badge,
      heading,
      description
    },
    fields {
      fullName {
        label,
        placeholder
      },
      email {
        label,
        placeholder
      },
      phone {
        label,
        placeholder
      },
      preferredDestination {
        label,
        placeholder
      },
      preferredIntake {
        label,
        placeholder
      },
      studyLevel {
        label,
        placeholder
      },
      message {
        label,
        placeholder
      }
    },
    destinationOptions[] {
      value,
      label
    },
    intakeOptions[] {
      value,
      label
    },
    studyLevelOptions[] {
      value,
      label
    },
    submitLabel,
    successTitle,
    successMessage
  },
  officeLocation {
    header {
      badge,
      heading,
      description
    },
    address,
    mapImage ${imageWithAltProjection},
    openInMapsLabel,
    mapsHref
  },
  officeHours {
    header {
      badge,
      heading,
      description
    },
    entries[] {
      days,
      hours
    },
    note
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
