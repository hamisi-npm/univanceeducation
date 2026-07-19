import type { SanityPortableText, SanitySeo } from "@/types/sanity/shared";

export type SanityLegalHero = {
  badge?: string;
  heading: string;
  description?: string;
  lastUpdated: string;
};

export type SanityLegalSection = {
  heading: string;
  paragraphs: SanityPortableText;
  listItems?: string[];
};

export type SanityLegalDocument = {
  kind: "privacy" | "terms";
  hero: SanityLegalHero;
  sections: SanityLegalSection[];
  seo?: SanitySeo;
};
