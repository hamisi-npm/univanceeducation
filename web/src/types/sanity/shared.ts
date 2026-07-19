import type { SanityCtaLink, SanityImageWithAlt } from "@/types/sanity/global";

export type SanitySectionHeader = {
  badge?: string;
  heading: string;
  description?: string;
};

export type SanityCtaBanner = {
  badge?: string;
  heading: string;
  description: string;
  primaryCta: SanityCtaLink;
  secondaryCta: SanityCtaLink;
  trustMicrocopy?: string;
};

export type SanityPortableText = Array<{
  _type?: string;
  children?: Array<{ text?: string }>;
}> | null;

export type SanitySeo = {
  title?: string;
  description?: string;
};

export type SanityFaqItem = {
  question: string;
  answer: SanityPortableText;
};

export type SanityFaqPreview = {
  header: SanitySectionHeader;
  items: SanityFaqItem[] | null;
  viewAll: SanityCtaLink;
};

export type { SanityImageWithAlt };
