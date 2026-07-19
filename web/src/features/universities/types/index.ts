export type UniversityImage = {
  src: string;
  alt: string;
};

export type University = {
  id: string;
  slug: string;
  name: string;
  country: string;
  countrySlug: string;
  flag: string;
  city: string;
  type: string;
  description: string;
  programs: string[];
  tuitionRange: string;
  image: UniversityImage;
  featured: boolean;
  ctaLabel: string;
};

export type CountryOption = {
  slug: string;
  label: string;
  flag: string;
};

export type CtaLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type SectionHeaderContent = {
  badge: string;
  heading: string;
  description: string;
};

export type UniversitiesHeroContent = SectionHeaderContent & {
  cta: CtaLink;
  image: UniversityImage;
};

export type FeaturedUniversitiesContent = SectionHeaderContent & {
  slugs: string[];
};

export type BrowseByCountryContent = SectionHeaderContent;

export type PopularProgramIconName =
  | "cpu"
  | "briefcase"
  | "heart-pulse"
  | "cog"
  | "scale"
  | "flask";

export type PopularProgram = {
  id: string;
  title: string;
  description: string;
  icon: PopularProgramIconName;
};

export type PopularProgramsContent = SectionHeaderContent & {
  programs: PopularProgram[];
};

export type AdmissionStepIconName =
  | "search"
  | "file-text"
  | "languages"
  | "stamp"
  | "plane";

export type AdmissionStep = {
  id: string;
  title: string;
  description: string;
  icon: AdmissionStepIconName;
};

export type AdmissionOverviewContent = SectionHeaderContent & {
  steps: AdmissionStep[];
};

export type UniversitiesCtaContent = {
  badge: string;
  heading: string;
  description: string;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
  trustMicrocopy: string;
};

export type UniversitiesPageContent = {
  hero: UniversitiesHeroContent;
  featuredUniversities: FeaturedUniversitiesContent;
  browseByCountry: BrowseByCountryContent;
  popularPrograms: PopularProgramsContent;
  admissionOverview: AdmissionOverviewContent;
  cta: UniversitiesCtaContent;
};
