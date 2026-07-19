import type { MetadataRoute } from "next";

import { marketingRoutes } from "@/lib/seo/routes";
import { getSiteConfig } from "@/services/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "http://localhost:3000";

  let baseUrl = siteUrl;

  try {
    const site = await getSiteConfig();
    baseUrl = site.url.replace(/\/$/, "") || siteUrl;
  } catch {
    // Use env URL when CMS is not yet seeded.
  }

  const lastModified = new Date();

  return marketingRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
