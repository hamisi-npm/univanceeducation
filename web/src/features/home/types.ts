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
