import type {
  SanityCtaLink,
  SanityImageWithAlt,
} from "@/types/sanity/global";
import type { SanitySeo } from "@/types/sanity/shared";

export type SanityHeroBadge = {
  text: string;
  suffix?: string;
  href: string;
};

export type SanityStatistic = {
  value: string;
  label: string;
  footnote?: string;
};

export type SanitySectionHeader = {
  badge: string;
  heading: string;
  description: string;
};

export type SanityHeroFloatingCard = {
  title: string;
  subtitle?: string;
  icon: "check" | "offer";
  position: "bottom-left" | "top-right";
};

export type SanityHomepageHero = {
  badge: SanityHeroBadge;
  headline: string;
  subheadline: string;
  trustMicrocopy?: string;
  ctas: {
    primary: SanityCtaLink;
    secondary: SanityCtaLink;
  };
  image: SanityImageWithAlt;
  floatingCards?: SanityHeroFloatingCard[] | null;
};

export type SanityHomepageService = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  ctaLabel: string;
};

export type SanityHomepageDestination = {
  _id: string;
  slug: string;
  country: string;
  flag: string;
  description: string;
  studyFields: string[];
  tuitionRange: string;
  image: SanityImageWithAlt;
  featured: boolean;
  ctaLabel: string;
};

export type SanityHomepageProcessStep = {
  _id: string;
  step: number;
  title: string;
  description: string;
  icon: string;
};

export type SanityHomepageTestimonial = {
  _id: string;
  name: string;
  destination: string;
  university: string;
  course: string;
  rating: number;
  quote: string;
  featured: boolean;
  image: SanityImageWithAlt;
};

export type SanityCtaBanner = {
  badge?: string;
  heading: string;
  description: string;
  primaryCta: SanityCtaLink;
  secondaryCta: SanityCtaLink;
  trustMicrocopy?: string;
};

export type SanityHomepageDocument = {
  hero: SanityHomepageHero;
  trustStats: SanityStatistic[];
  trustedUniversities: {
    heading: string;
    partners: { name: string }[] | null;
  };
  servicesPreview: {
    header: SanitySectionHeader;
    services: SanityHomepageService[] | null;
  };
  featuredDestinations: {
    header: SanitySectionHeader;
    viewAll: SanityCtaLink;
    destinations: SanityHomepageDestination[] | null;
  };
  processPreview: {
    header: SanitySectionHeader;
    steps: SanityHomepageProcessStep[] | null;
    cta: {
      label: string;
      href: string;
      supportingText?: string;
    };
  };
  testimonialsPreview: {
    header: SanitySectionHeader;
    testimonials: SanityHomepageTestimonial[] | null;
  };
  ctaBanner: SanityCtaBanner;
  seo?: SanitySeo;
};
