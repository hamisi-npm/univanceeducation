export type CtaLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type CtaSectionContent = {
  badge: string;
  heading: string;
  description: string;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
  trustMicrocopy: string;
};
