import type {
  SanityCtaBanner,
  SanityFaqPreview,
  SanityImageWithAlt,
  SanitySectionHeader,
  SanitySeo,
} from "@/types/sanity/shared";

export type SanityServicesHero = {
  badge?: string;
  heading: string;
  description: string;
  cta: { label: string; href: string; external?: boolean };
  image: SanityImageWithAlt;
};

export type SanityServiceDocument = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  benefits?: string[] | null;
  timeline?: string;
  cta?: { label: string; href: string; external?: boolean };
  order?: number;
};

export type SanityProcessStepDocument = {
  _id: string;
  step: number;
  title: string;
  description: string;
  icon: string;
};

export type SanityServicesDocument = {
  hero: SanityServicesHero;
  overview: SanitySectionHeader;
  serviceDetails: {
    header: SanitySectionHeader;
    services: SanityServiceDocument[] | null;
  };
  processOverview: SanitySectionHeader;
  faqPreview: SanityFaqPreview;
  cta: SanityCtaBanner;
  allServices: SanityServiceDocument[] | null;
  processSteps: SanityProcessStepDocument[] | null;
  seo?: SanitySeo;
};
