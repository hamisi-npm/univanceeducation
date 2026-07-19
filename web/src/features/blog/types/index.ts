export type BlogCoverImage = {
  src: string;
  alt: string;
};

export type BlogCategorySlug =
  | "admissions"
  | "visas"
  | "scholarships"
  | "destinations"
  | "student-life";

export type BlogArticle = {
  id: string;
  slug: string;
  title: string;
  category: BlogCategorySlug;
  categoryLabel: string;
  author: string;
  date: string;
  readTime: string;
  coverImage: BlogCoverImage;
  summary: string;
  featured?: boolean;
};

export type CategoryOption = {
  slug: BlogCategorySlug;
  label: string;
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

export type BlogHeroContent = SectionHeaderContent & {
  cta: CtaLink;
  image: BlogCoverImage;
};

export type FeaturedPostContent = SectionHeaderContent;

export type LatestArticlesContent = SectionHeaderContent;

export type GuideItem = {
  id: string;
  title: string;
  description: string;
  href: string;
};

export type GuidesSectionContent = SectionHeaderContent & {
  guides: GuideItem[];
};

export type NewsletterContent = {
  badge: string;
  heading: string;
  description: string;
  emailLabel: string;
  emailPlaceholder: string;
  submitLabel: string;
  privacyNote: string;
};

export type BlogCtaContent = {
  badge: string;
  heading: string;
  description: string;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
  trustMicrocopy: string;
};

export type BlogPageContent = {
  hero: BlogHeroContent;
  featuredPost: FeaturedPostContent;
  latestArticles: LatestArticlesContent;
  guides: GuidesSectionContent;
  newsletter: NewsletterContent;
  cta: BlogCtaContent;
};
