import type {
  SanityCtaBanner,
  SanityImageWithAlt,
  SanitySectionHeader,
  SanitySeo,
} from "@/types/sanity/shared";

export type SanityAboutHero = {
  header: SanitySectionHeader;
  primaryCta: { label: string; href: string; external?: boolean };
  secondaryCta: { label: string; href: string; external?: boolean };
  image: SanityImageWithAlt;
};

export type SanityAboutCompanyStory = {
  badge?: string;
  heading: string;
  paragraphs: Array<{
    _type?: string;
    children?: Array<{ text?: string }>;
  }> | null;
  image: SanityImageWithAlt;
};

export type SanityMissionVisionCard = {
  title: string;
  description: string;
};

export type SanityWhyChooseUsFeature = {
  title: string;
  description: string;
  icon: string;
};

export type SanityTeamMember = {
  _id: string;
  name: string;
  position: string;
  bio: string;
  image: SanityImageWithAlt;
  order?: number;
};

export type SanityAboutDocument = {
  hero: SanityAboutHero;
  companyStory: SanityAboutCompanyStory;
  missionVision: {
    header: SanitySectionHeader;
    cards: SanityMissionVisionCard[] | null;
  };
  whyChooseUs: {
    header: SanitySectionHeader;
    features: SanityWhyChooseUsFeature[] | null;
  };
  team: {
    header: SanitySectionHeader;
    members: SanityTeamMember[] | null;
  };
  cta: SanityCtaBanner;
  seo?: SanitySeo;
};
