import type { PrimaryOffice } from "@/lib/format-office-address";

export type SiteLogo = {
  src: string;
  srcLight: string;
  alt: string;
  width: number;
  height: number;
};

export type SiteWhatsApp = {
  number: string;
  message: string;
  label: string;
};

export type SiteConfig = {
  name: string;
  tagline: string;
  description: string;
  url: string;
  /** Absolute Sanity CDN URL for default Open Graph image; empty when unset. */
  ogImage: string;
  logo: SiteLogo;
  /** Absolute URL for browser/tab icons — favicon asset or logo fallback. */
  faviconUrl: string;
  keywords: readonly string[];
  authors: readonly { name: string }[];
  office: PrimaryOffice;
  contact: {
    email: string;
    phone: string;
    address: string;
    mapsHref?: string;
  };
  whatsapp: SiteWhatsApp;
  social: {
    twitter: string;
    linkedin: string;
    instagram: string;
    facebook: string;
  };
};
