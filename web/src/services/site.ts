import { cache } from "react";

import type { FooterContent } from "@/features/footer/types";
import type { GlobalLayoutData } from "@/types/global-layout";
import type { NavCta, NavItem } from "@/types/navigation";
import type { SiteConfig } from "@/types/site";
import { sanityTags } from "@/lib/sanity/cache-tags";
import { sanityFetch } from "@/lib/sanity/fetch";
import { applySiteOfficeToFooter } from "@/mappers/apply-site-office";
import {
  mapFooter,
  mapNavigation,
  mapSiteSettings,
} from "@/mappers/site";
import {
  footerQuery,
  navigationQuery,
  siteSettingsQuery,
} from "@/queries/global";
import { singletonDocumentIds } from "@/lib/sanity/singletons";
import type {
  SanityFooter,
  SanityNavigation,
  SanitySiteSettings,
} from "@/types/sanity/global";

export const getSiteConfig = cache(async (): Promise<SiteConfig> => {
  const document = await sanityFetch<SanitySiteSettings>({
    query: siteSettingsQuery,
    params: { id: singletonDocumentIds.siteSettings },
    tags: [sanityTags.siteSettings],
  });

  if (!document) {
    throw new Error("Missing Sanity singleton: siteSettings");
  }

  return mapSiteSettings(document);
});

export const getNavigation = cache(async (): Promise<{
  items: NavItem[];
  cta: NavCta;
}> => {
  const document = await sanityFetch<SanityNavigation>({
    query: navigationQuery,
    params: { id: singletonDocumentIds.navigation },
    tags: [sanityTags.navigation],
  });

  if (!document) {
    throw new Error("Missing Sanity singleton: navigation");
  }

  return mapNavigation(document);
});

export const getFooterContent = cache(async (): Promise<FooterContent> => {
  const [document, site] = await Promise.all([
    sanityFetch<SanityFooter>({
      query: footerQuery,
      params: { id: singletonDocumentIds.footer },
      tags: [sanityTags.footer],
    }),
    getSiteConfig(),
  ]);

  if (!document) {
    throw new Error("Missing Sanity singleton: footer");
  }

  return applySiteOfficeToFooter(mapFooter(document), site);
});

export const getGlobalLayoutData = cache(async (): Promise<GlobalLayoutData> => {
  const [site, navigation, footer] = await Promise.all([
    getSiteConfig(),
    getNavigation(),
    getFooterContent(),
  ]);

  return { site, navigation, footer };
});
