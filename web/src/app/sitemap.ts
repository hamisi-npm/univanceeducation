import type { MetadataRoute } from "next";

import { marketingRoutes } from "@/lib/seo/routes";
import { getDestinationSlugs } from "@/services/destinations";
import { getProgramSlugs } from "@/services/programs";
import { getSiteConfig } from "@/services/site";
import { getUniversitySlugs } from "@/services/universities";
import { getBlogSlugs } from "@/services/blog";
import { getStudyGuideSlugs } from "@/services/study-guides";

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

  const staticEntries: MetadataRoute.Sitemap = marketingRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const [programSlugs, universitySlugs, destinationSlugs, blogSlugs, guideSlugs] =
    await Promise.all([
      getProgramSlugs().catch(() => [] as string[]),
      getUniversitySlugs().catch(() => [] as string[]),
      getDestinationSlugs().catch(() => [] as string[]),
      getBlogSlugs().catch(() => [] as string[]),
      getStudyGuideSlugs().catch(() => [] as string[]),
    ]);

  const dynamicEntries: MetadataRoute.Sitemap = [
    ...programSlugs.map((slug) => ({
      url: `${baseUrl}/programs/${slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...universitySlugs.map((slug) => ({
      url: `${baseUrl}/universities/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...destinationSlugs.map((slug) => ({
      url: `${baseUrl}/destinations/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...blogSlugs.map((slug) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...guideSlugs.map((slug) => ({
      url: `${baseUrl}/study-guides/${slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];

  return [...staticEntries, ...dynamicEntries];
}
