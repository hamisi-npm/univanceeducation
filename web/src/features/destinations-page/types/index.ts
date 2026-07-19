export type DestinationsCtaLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type DestinationsImage = {
  src: string;
  alt: string;
};

export type DestinationsHeroContent = {
  badge: string;
  heading: string;
  description: string;
  cta: DestinationsCtaLink;
  image: DestinationsImage;
};

export type SectionHeaderContent = {
  badge: string;
  heading: string;
  description: string;
};

export type CostComparisonRow = {
  id: string;
  country: string;
  tuition: string;
  livingCosts: string;
  duration: string;
  workWhileStudying: string;
};

export type CostComparisonContent = SectionHeaderContent & {
  columns: {
    country: string;
    tuition: string;
    livingCosts: string;
    duration: string;
    workWhileStudying: string;
  };
  rows: CostComparisonRow[];
  caption: string;
};

export type PopularCourseIconName =
  | "cog"
  | "briefcase"
  | "cpu"
  | "heart-pulse"
  | "utensils-crossed"
  | "palette";

export type PopularCourse = {
  id: string;
  title: string;
  description: string;
  icon: PopularCourseIconName;
};

export type PopularCoursesContent = SectionHeaderContent & {
  courses: PopularCourse[];
};

export type AdmissionRequirementIconName =
  | "file-text"
  | "languages"
  | "pen-line"
  | "users"
  | "stamp";

export type AdmissionRequirement = {
  id: string;
  title: string;
  description: string;
  icon: AdmissionRequirementIconName;
};

export type AdmissionRequirementsContent = SectionHeaderContent & {
  requirements: AdmissionRequirement[];
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

export type DestinationsCtaContent = {
  badge: string;
  heading: string;
  description: string;
  primaryCta: DestinationsCtaLink;
  secondaryCta: DestinationsCtaLink;
  trustMicrocopy: string;
};

export type DestinationsPageContent = {
  hero: DestinationsHeroContent;
  featuredCountries: SectionHeaderContent & {
    slugs: string[];
  };
  countryGrid: SectionHeaderContent & {
    slugs: string[];
  };
  costComparison: CostComparisonContent;
  popularCourses: PopularCoursesContent;
  admissionRequirements: AdmissionRequirementsContent;
  faqPreview: FaqPreviewContent;
  cta: DestinationsCtaContent;
};
