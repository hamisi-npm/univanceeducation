import type { SanityCtaLink, SanityImageWithAlt } from "@/types/sanity/global";
import type { SanityPortableText, SanitySeo } from "@/types/sanity/shared";

export type SanityProgramTaxonomyRef = {
  name: string;
  slug: string;
};

export type SanityProgramDestinationRef = {
  country: string;
  slug: string;
  flag: string;
};

export type SanityProgramUniversityRef = {
  name: string;
  slug: string;
  destination?: SanityProgramDestinationRef | null;
};

export type SanityProgramCard = {
  _id?: string;
  title: string;
  slug: string;
  featured?: boolean;
  featuredImage: SanityImageWithAlt;
  shortDescription: string;
  duration: string;
  currency: string;
  annualTuition: number;
  scholarshipAvailable?: boolean;
  university?: SanityProgramUniversityRef | null;
  courseCategory?: SanityProgramTaxonomyRef | null;
  studyLevel?: SanityProgramTaxonomyRef | null;
  degreeType?: SanityProgramTaxonomyRef | null;
};

export type SanityProgramUniversityDetail = SanityProgramUniversityRef & {
  _id?: string;
  city?: string;
  type?: string;
  description?: string;
  tuitionRange?: string;
  image?: SanityImageWithAlt | null;
};

export type SanityProgramDetailDocument = SanityProgramCard & {
  gallery?: SanityImageWithAlt[] | null;
  overview?: SanityPortableText;
  highlights?: string[] | null;
  quickFacts?: Array<{ label: string; value: string }> | null;
  credits?: string | null;
  modeOfStudy?: string | null;
  language?: string | null;
  intakeMonths?: string[] | null;
  entryRequirements?: SanityPortableText;
  englishRequirements?: SanityPortableText;
  requiredDocuments?: SanityPortableText;
  applicationDeadline?: string | null;
  applicationFee?: number | null;
  scholarshipDetails?: SanityPortableText;
  careerOpportunities?: SanityPortableText;
  industry?: string | null;
  university?: SanityProgramUniversityDetail | null;
  faculty?: SanityProgramTaxonomyRef | null;
  seo?: SanitySeo;
};

export type SanityProgramsPageDocument = {
  hero: {
    badge?: string;
    heading: string;
    description: string;
    image?: SanityImageWithAlt | null;
  };
  statistics?: Array<{ value: string; label: string }> | null;
  filters: {
    heading?: string;
    description?: string;
    destinationLabel: string;
    universityLabel: string;
    categoryLabel: string;
    levelLabel: string;
    keywordLabel: string;
    keywordPlaceholder: string;
    submitLabel: string;
    clearLabel: string;
  };
  resultsCountLabel: string;
  emptyState: {
    heading: string;
    description: string;
  };
  ctaBanner: {
    heading: string;
    description: string;
    cta: SanityCtaLink;
  };
  seo?: SanitySeo;
};

export type SanityTaxonomyOption = {
  name: string;
  slug: string;
  description?: string | null;
  icon?: string | null;
  featured?: boolean;
};

export type SanityFilterOption = {
  slug: string;
  label: string;
  flag?: string;
  destinationSlug?: string;
};

export type SanityProgramFilterOptions = {
  destinations: SanityFilterOption[];
  universities: SanityFilterOption[];
  categories: SanityFilterOption[];
  levels: SanityFilterOption[];
};
