export type ServicesCtaLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type ServicesImage = {
  src: string;
  alt: string;
};

export type ServicesHeroContent = {
  badge: string;
  heading: string;
  description: string;
  cta: ServicesCtaLink;
  image: ServicesImage;
};

export type SectionHeaderContent = {
  badge: string;
  heading: string;
  description: string;
};

export type ServiceDetail = {
  slug: string;
  description: string;
  benefits: string[];
  timeline: string;
  cta: ServicesCtaLink;
};

export type ServiceDetailsContent = SectionHeaderContent & {
  details: ServiceDetail[];
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type FaqPreviewContent = SectionHeaderContent & {
  items: FaqItem[];
  viewAllLabel: string;
  viewAllHref: string;
};

export type ServicesCtaContent = {
  badge: string;
  heading: string;
  description: string;
  primaryCta: ServicesCtaLink;
  secondaryCta: ServicesCtaLink;
  trustMicrocopy: string;
};

export type ServicesPageContent = {
  hero: ServicesHeroContent;
  overview: SectionHeaderContent;
  serviceDetails: ServiceDetailsContent;
  processOverview: SectionHeaderContent;
  faqPreview: FaqPreviewContent;
  cta: ServicesCtaContent;
};
