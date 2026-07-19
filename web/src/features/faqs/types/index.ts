import type { FaqItem } from "@/components/shared/faq-accordion";

export type FaqCategory = {
  id: string;
  title: string;
  description?: string;
  items: FaqItem[];
};

export type FaqsHeroContent = {
  badge: string;
  heading: string;
  description: string;
  cta: {
    label: string;
    href: string;
  };
};

export type FaqsCtaContent = {
  badge: string;
  heading: string;
  description: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
    external?: boolean;
  };
  trustMicrocopy: string;
};

export type FaqsPageContent = {
  hero: FaqsHeroContent;
  categories: FaqCategory[];
  cta: FaqsCtaContent;
};
