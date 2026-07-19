export type AboutCtaLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type AboutImage = {
  src: string;
  alt: string;
};

export type AboutHeroContent = {
  badge: string;
  heading: string;
  description: string;
  primaryCta: AboutCtaLink;
  secondaryCta: AboutCtaLink;
  image: AboutImage;
};

export type CompanyStoryContent = {
  badge: string;
  heading: string;
  paragraphs: string[];
  image: AboutImage;
};

export type MissionVisionCard = {
  id: string;
  title: string;
  description: string;
};

export type MissionVisionContent = {
  badge: string;
  heading: string;
  description: string;
  cards: MissionVisionCard[];
};

export type WhyChooseUsIconName =
  | "badge-check"
  | "globe"
  | "stamp"
  | "award"
  | "message-circle"
  | "list-checks";

export type WhyChooseUsFeature = {
  id: string;
  title: string;
  description: string;
  icon: WhyChooseUsIconName;
};

export type WhyChooseUsContent = {
  badge: string;
  heading: string;
  description: string;
  features: WhyChooseUsFeature[];
};

export type TeamMember = {
  id: string;
  name: string;
  position: string;
  bio: string;
  image: AboutImage;
};

export type TeamSectionContent = {
  badge: string;
  heading: string;
  description: string;
  members: TeamMember[];
};

export type AboutCtaContent = {
  badge: string;
  heading: string;
  description: string;
  primaryCta: AboutCtaLink;
  secondaryCta: AboutCtaLink;
  trustMicrocopy: string;
};

export type AboutPageContent = {
  hero: AboutHeroContent;
  companyStory: CompanyStoryContent;
  missionVision: MissionVisionContent;
  whyChooseUs: WhyChooseUsContent;
  team: TeamSectionContent;
  cta: AboutCtaContent;
};
