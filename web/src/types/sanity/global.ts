import type { FooterSocialIcon } from "@/features/footer/types";

export type SanityImageAsset = {
  _id: string;
  url: string;
  metadata?: {
    dimensions?: {
      width?: number;
      height?: number;
    };
  };
};

export type SanityImageWithAlt = {
  alt: string;
  asset?: SanityImageAsset | null;
};

export type SanitySocialLink = {
  icon: FooterSocialIcon;
  label: string;
  href: string;
};

export type SanityCtaLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type SanityPrimaryOffice = {
  building: string;
  floor?: string;
  suite?: string;
  street: string;
  area?: string;
  city: string;
  country: string;
};

export type SanitySiteSettings = {
  name: string;
  tagline: string;
  description: string;
  url: string;
  logo: SanityImageWithAlt;
  logoLight?: SanityImageWithAlt | null;
  /** Resolved favicon (or logo fallback) CDN URL from GROQ. */
  faviconUrl?: string | null;
  primaryOffice?: SanityPrimaryOffice | null;
  contact: {
    email: string;
    phone: string;
    address: string;
    mapsHref?: string;
  };
  social?: SanitySocialLink[] | null;
  keywords?: string[] | null;
};

export type SanityNavigationItem = {
  title: string;
  href: string;
  external?: boolean;
  openInNewTab?: boolean;
  order: number;
  disabled?: boolean;
};

export type SanityNavigation = {
  items: SanityNavigationItem[];
  cta: SanityCtaLink;
};

export type SanityFooterNavGroup = {
  title: string;
  links: SanityCtaLink[];
};

export type SanityFooterContactItem = {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
};

export type SanityFooter = {
  brand: {
    name: string;
    href: string;
    description: string;
  };
  social?: SanitySocialLink[] | null;
  navGroups: SanityFooterNavGroup[];
  contact: {
    title: string;
    items: SanityFooterContactItem[];
  };
  newsletter: {
    heading: string;
    description: string;
    emailLabel: string;
    emailPlaceholder: string;
    submitLabel: string;
  };
  bottomBar: {
    copyright: string;
    builtWithLabel: string;
    builtWithHref: string;
    legalLinks: SanityCtaLink[];
  };
};
