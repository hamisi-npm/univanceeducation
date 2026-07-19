import type { MetadataRoute } from "next";

import { getSiteConfig } from "@/services/site";

export default async function robots(): Promise<MetadataRoute.Robots> {
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

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
