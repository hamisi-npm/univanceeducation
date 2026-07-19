/** Default ISR window for Sanity-backed global content. */
export const SANITY_REVALIDATE_SECONDS = 3600;

/** Tags for `revalidateTag()` — invalidated via `/api/revalidate` Sanity webhooks. */
export const sanityTags = {
  siteSettings: "sanity:siteSettings",
  navigation: "sanity:navigation",
  footer: "sanity:footer",
  homepage: "sanity:homepage",
  about: "sanity:about",
  services: "sanity:services",
  contact: "sanity:contact",
  destinations: "sanity:destinations",
  destination: "sanity:destination",
  universities: "sanity:universities",
  university: "sanity:university",
  blog: "sanity:blog",
  blogPost: "sanity:blog-post",
  studyGuides: "sanity:study-guides",
  studyGuide: "sanity:study-guide",
  faqs: "sanity:faqs",
  legalPrivacy: "sanity:legal-privacy",
  legalTerms: "sanity:legal-terms",
  global: "sanity:global",
} as const;

export type SanityCacheTag = (typeof sanityTags)[keyof typeof sanityTags];
