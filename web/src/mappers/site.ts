import type { FooterContent } from "@/features/footer/types";
import type { NavCta, NavItem } from "@/types/navigation";
import type { SiteConfig } from "@/types/site";
import {
  buildMapsSearchHref,
  formatOfficeAddress,
  type PrimaryOffice,
} from "@/lib/format-office-address";
import { slugify } from "@/lib/slugify";
import type {
  SanityCtaLink,
  SanityFooter,
  SanityImageWithAlt,
  SanityNavigation,
  SanityPrimaryOffice,
  SanitySiteSettings,
  SanitySocialLink,
} from "@/types/sanity/global";

const EMPTY_LOGO: SiteConfig["logo"] = {
  src: "",
  srcLight: "",
  alt: "",
  width: 0,
  height: 0,
};

const EMPTY_SOCIAL: SiteConfig["social"] = {
  twitter: "",
  linkedin: "",
  instagram: "",
  facebook: "",
};

const EMPTY_OFFICE: PrimaryOffice = {
  building: "",
  floor: "",
  suite: "",
  street: "",
  area: "",
  city: "",
  country: "",
};

const EMPTY_NEWSLETTER: FooterContent["newsletter"] = {
  heading: "",
  description: "",
  emailLabel: "",
  emailPlaceholder: "",
  submitLabel: "",
};

const EMPTY_BOTTOM_BAR: FooterContent["bottomBar"] = {
  builtWithLabel: "",
  builtWithHref: "",
  legalLinks: [],
};

function mapPrimaryOffice(
  office: SanityPrimaryOffice | null | undefined,
): PrimaryOffice {
  return {
    building: office?.building || "",
    floor: office?.floor || "",
    suite: office?.suite || "",
    street: office?.street || "",
    area: office?.area || "",
    city: office?.city || "",
    country: office?.country || "",
  };
}

function mapImageWithAlt(
  image: SanityImageWithAlt | null | undefined,
): SiteConfig["logo"] {
  const url = image?.asset?.url;

  if (!url) {
    return { ...EMPTY_LOGO };
  }

  return {
    src: url,
    srcLight: url,
    alt: image.alt || "",
    width: image.asset?.metadata?.dimensions?.width ?? 0,
    height: image.asset?.metadata?.dimensions?.height ?? 0,
  };
}

function mapSocialLinks(
  links: SanitySocialLink[] | null | undefined,
): SiteConfig["social"] {
  const social = { ...EMPTY_SOCIAL };

  for (const link of links ?? []) {
    if (link.icon in social) {
      social[link.icon as keyof typeof social] = link.href;
    }
  }

  return social;
}

function mapCtaLink(link: SanityCtaLink): { label: string; href: string; external?: boolean } {
  return {
    label: link.label || "",
    href: link.href || "",
    external: link.external ?? false,
  };
}

export function mapSiteSettings(document: SanitySiteSettings): SiteConfig {
  const primaryLogo = mapImageWithAlt(document.logo);
  const lightLogo = document.logoLight ? mapImageWithAlt(document.logoLight) : null;

  const office = mapPrimaryOffice(document.primaryOffice);
  const address = formatOfficeAddress(office);
  const mapsHref =
    document.contact?.mapsHref?.trim() || buildMapsSearchHref(office);

  return {
    name: document.name || "",
    tagline: document.tagline || "",
    description: document.description || "",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? document.url ?? "",
    ogImage: "",
    logo: {
      ...primaryLogo,
      srcLight: lightLogo?.src ?? primaryLogo.srcLight,
    },
    faviconUrl: document.faviconUrl?.trim() || primaryLogo.src || "",
    keywords: document.keywords?.length ? document.keywords : [],
    authors: [{ name: document.name || "" }],
    office: Object.values(office).some(Boolean) ? office : EMPTY_OFFICE,
    contact: {
      email: document.contact?.email || "",
      phone: document.contact?.phone || "",
      address,
      mapsHref,
    },
    social: mapSocialLinks(document.social),
  };
}

export function mapNavigation(
  document: SanityNavigation,
): { items: NavItem[]; cta: NavCta } {
  const items = (document.items ?? [])
    .filter((item) => !item.disabled)
    .sort((a, b) => a.order - b.order)
    .map((item) => ({
      title: item.title,
      href: item.href,
      disabled: item.disabled,
    }));

  const cta: NavCta = document.cta
    ? {
        label: document.cta.label || "",
        href: document.cta.href || "",
        external: document.cta.external,
      }
    : { label: "", href: "" };

  return { items, cta };
}

export function mapFooter(document: SanityFooter): FooterContent {
  return {
    brand: {
      name: document.brand?.name || "",
      href: document.brand?.href || "",
      description: document.brand?.description || "",
    },
    social: (document.social ?? []).map((link) => ({
      label: link.label || "",
      href: link.href || "",
      icon: link.icon,
    })),
    navGroups: (document.navGroups ?? []).map((group) => ({
      id: slugify(group.title),
      title: group.title || "",
      links: group.links.map((link) => mapCtaLink(link)),
    })),
    contact: {
      title: document.contact?.title || "",
      items: (document.contact?.items ?? []).map((item) => ({
        id: slugify(item.label),
        label: item.label || "",
        value: item.value || "",
        href: item.href,
        external: item.external,
      })),
    },
    newsletter: document.newsletter ?? EMPTY_NEWSLETTER,
    bottomBar: document.bottomBar
      ? {
          builtWithLabel: document.bottomBar.builtWithLabel || "",
          builtWithHref: document.bottomBar.builtWithHref || "",
          legalLinks: document.bottomBar.legalLinks.map((link) => mapCtaLink(link)),
        }
      : EMPTY_BOTTOM_BAR,
  };
}
