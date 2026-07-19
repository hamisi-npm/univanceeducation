export type GuideCoverImage = {
  src: string;
  alt: string;
};

export type GuideCategorySlug =
  | "countries"
  | "admissions"
  | "scholarships"
  | "student-life"
  | "visa"
  | "career";

export type StudyGuide = {
  id: string;
  slug: string;
  title: string;
  category: GuideCategorySlug;
  categoryLabel: string;
  readTime: string;
  description: string;
  coverImage: GuideCoverImage;
  ctaLabel: string;
};

export type GuideCategory = {
  id: GuideCategorySlug;
  label: string;
  description: string;
};

export type ChecklistItem = {
  id: string;
  title: string;
  description: string;
};

export type ResourceLink = {
  id: string;
  title: string;
  description: string;
  href: string;
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

export type StudyGuidesHeroContent = SectionHeaderContent & {
  cta: CtaLink;
  image: GuideCoverImage;
};

export type StudyGuidesCtaContent = {
  badge: string;
  heading: string;
  description: string;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
  trustMicrocopy: string;
};

export type StudyGuidesPageContent = {
  hero: StudyGuidesHeroContent;
  featuredGuides: SectionHeaderContent;
  guideCategories: SectionHeaderContent & { categories: GuideCategory[] };
  studyChecklist: SectionHeaderContent & { items: ChecklistItem[] };
  resources: SectionHeaderContent & { links: ResourceLink[] };
  cta: StudyGuidesCtaContent;
};
