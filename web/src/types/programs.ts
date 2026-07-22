import type { CmsSeo } from "@/types/cms-seo";

export type ProgramCard = {
  id: string;
  slug: string;
  title: string;
  featured: boolean;
  image: { src: string; alt: string };
  shortDescription: string;
  duration: string;
  currency: string;
  annualTuition: number;
  tuitionLabel: string;
  scholarshipAvailable: boolean;
  universityName: string;
  universitySlug: string;
  destinationCountry: string;
  destinationSlug: string;
  destinationFlag: string;
  categoryName: string;
  categorySlug: string;
  studyLevelName: string;
  studyLevelSlug: string;
  degreeTypeName: string;
};

export type ProgramQuickFact = {
  label: string;
  value: string;
};

export type ProgramDetail = ProgramCard & {
  gallery: Array<{ src: string; alt: string }>;
  overview: string[];
  highlights: string[];
  quickFacts: ProgramQuickFact[];
  credits: string;
  modeOfStudy: string;
  language: string;
  intakeMonths: string[];
  entryRequirements: string[];
  englishRequirements: string[];
  requiredDocuments: string[];
  applicationDeadline: string;
  applicationFee: number | null;
  scholarshipDetails: string[];
  careerOpportunities: string[];
  industry: string;
  facultyName: string;
  facultySlug: string;
  university: {
    name: string;
    slug: string;
    city: string;
    type: string;
    description: string;
    tuitionRange: string;
    image: { src: string; alt: string };
    destinationCountry: string;
    destinationSlug: string;
    destinationFlag: string;
  };
  seo?: CmsSeo;
};

export type ProgramFilterOption = {
  slug: string;
  label: string;
  flag?: string;
  destinationSlug?: string;
};

export type ProgramFiltersChrome = {
  heading: string;
  description: string;
  destinationLabel: string;
  universityLabel: string;
  categoryLabel: string;
  levelLabel: string;
  keywordLabel: string;
  keywordPlaceholder: string;
  submitLabel: string;
  clearLabel: string;
};

export type ProgramsPageData = {
  hero: {
    badge: string;
    heading: string;
    description: string;
    image: { src: string; alt: string } | null;
  };
  statistics: Array<{ value: string; label: string }>;
  filters: ProgramFiltersChrome;
  resultsCountLabel: string;
  emptyState: {
    heading: string;
    description: string;
  };
  ctaBanner: {
    heading: string;
    description: string;
    cta: { label: string; href: string; external?: boolean };
  };
  seo?: CmsSeo;
};

export type ProgramListFilters = {
  destination?: string;
  university?: string;
  category?: string;
  level?: string;
  q?: string;
  page?: number;
};

export type ProgramListResult = {
  items: ProgramCard[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export type ProgramFilterOptions = {
  destinations: ProgramFilterOption[];
  universities: ProgramFilterOption[];
  categories: ProgramFilterOption[];
  levels: ProgramFilterOption[];
};
