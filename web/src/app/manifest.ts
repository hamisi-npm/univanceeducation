import type { MetadataRoute } from "next";

import { brandColors } from "@/config/brand";
import { getSiteConfig } from "@/services/site";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  let name = "Univance Education";
  let description = "Study abroad consultancy";

  try {
    const site = await getSiteConfig();
    name = site.name;
    description = site.description;
  } catch {
    // Dataset may be empty during first deploy — use brand defaults until seeded.
  }

  return {
    name,
    short_name: "Univance",
    description,
    start_url: "/",
    display: "standalone",
    background_color: brandColors.neutral,
    theme_color: brandColors.primary,
    lang: "en",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
