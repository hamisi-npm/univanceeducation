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
};

export type SanityProgramFinder = {
  heading?: string;
  /** @deprecated Legacy field — prefer `heading`. */
  title?: string;
  description?: string;
  destinationLabel?: string;
  destinationPlaceholder?: string;
  courseLabel?: string;
  coursePlaceholder?: string;
  studyLevelLabel?: string;
  studyLevelPlaceholder?: string;
  backgroundTheme?: "light" | "navy" | "beige";
  showDestination?: boolean;
  showCourse?: boolean;
  showStudyLevel?: boolean;
  cta: SanityCtaLink;
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

export type SanityWhyChooseUsFeature = {
  title: string;
  description: string;
  icon: string;
};

export type SanityHomepageWhyChooseUs = {
  header: SanitySectionHeader;
  features: SanityWhyChooseUsFeature[] | null;
  cta: SanityCtaLink;
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
  programFinder: SanityProgramFinder;
  servicesPreview: {
    header: SanitySectionHeader;
    services: SanityHomepageService[] | null;
  };
  featuredDestinations: {
    header: SanitySectionHeader;
    viewAll: SanityCtaLink;
    destinations: SanityHomepageDestination[] | null;
  };
  whyChooseUs: SanityHomepageWhyChooseUs;
  ctaBanner: SanityCtaBanner;
  seo?: SanitySeo;
};
