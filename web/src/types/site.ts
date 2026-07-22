import type { PrimaryOffice } from "@/lib/format-office-address";

export type SiteLogo = {
  src: string;
  srcLight: string;
  alt: string;
  width: number;
  height: number;
};

export type SiteConfig = {
  name: string;
  tagline: string;
  description: string;
  url: string;
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
  social: {
    twitter: string;
    linkedin: string;
    instagram: string;
    facebook: string;
  };
};
