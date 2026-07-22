import type { TrustStat } from "@/types/trust-stats";

export type HeroCta = {
  label: string;
  href: string;
};

export type HeroTrustStat = TrustStat;

export type HeroFloatingCard = {
  id: string;
  title: string;
  subtitle: string;
  icon: "check" | "offer";
  position: "bottom-left" | "top-right";
};

export type HeroContentData = {
  badge: {
    text: string;
    suffix: string;
    href: string;
  };
  headline: string;
  subheadline: string;
  trustMicrocopy: string;
  ctas: {
    primary: HeroCta;
    secondary: HeroCta;
  };
  stats: HeroTrustStat[];
  floatingCards: HeroFloatingCard[];
  image: {
    src: string;
    alt: string;
  };
};

export type ProgramFinderOption = {
  value: string;
  label: string;
};

export type ProgramFinderContent = {
  heading: string;
  description: string;
  destinationLabel: string;
  destinationPlaceholder: string;
  courseLabel: string;
  coursePlaceholder: string;
  studyLevelLabel: string;
  studyLevelPlaceholder: string;
  backgroundTheme: "light" | "navy" | "beige";
  showDestination: boolean;
  showCourse: boolean;
  showStudyLevel: boolean;
  destinations: ProgramFinderOption[];
  categories: ProgramFinderOption[];
  levels: ProgramFinderOption[];
  cta: {
    label: string;
    href: string;
    external?: boolean;
  };
};
