import type { Metadata } from "next";

import type { CmsSeo } from "@/types/cms-seo";
import type { SiteConfig } from "@/types/site";
import { formatOfficeAddressInline } from "@/lib/format-office-address";
import {
  getAbsoluteUrl,
  pageSeo,
  type PageSeoPath,
} from "@/lib/seo/routes";
import { getSiteConfig } from "@/services/site";

function resolveTitleString(
  title: Metadata["title"] | undefined,
  site: SiteConfig,
): string {
  if (!title) {
    return site.name;
  }
  if (typeof title === "string") {
    return title;
  }
  if ("absolute" in title && title.absolute) {
    return title.absolute;
  }
  if ("default" in title && title.default) {
    return title.default;
  }
  return site.name;
}

type CreateMetadataOptions = Metadata & {
  path?: string;
};

export function createMetadata(
  overrides: CreateMetadataOptions | undefined,
  site: SiteConfig,
): Metadata {
  const {
    path,
    title,
    description,
    openGraph,
    twitter,
    alternates,
    icons,
    ...rest
  } = overrides ?? {};

  const titleString = resolveTitleString(title, site);
  const resolvedDescription =
    typeof description === "string" ? description : site.description;
  const canonicalPath = path ?? "/";
  const canonicalUrl = getAbsoluteUrl(canonicalPath, site.url);
  const ogImage = site.ogImage;
  const officeLine = formatOfficeAddressInline(site.office);

  const baseOpenGraph = {
    type: "website" as const,
    locale: "en_US",
    siteName: site.name,
    title: titleString,
    description: resolvedDescription,
    url: canonicalUrl,
    images: [{ url: ogImage, width: 1200, height: 630, alt: site.name }],
  };

  const baseTwitter = {
    card: "summary_large_image" as const,
    title: titleString,
    description: resolvedDescription,
    images: [ogImage],
  };

  return {
    metadataBase: new URL(site.url),
    title: title ?? {
      default: `${site.name} — ${site.tagline}`,
      template: `%s | ${site.name}`,
    },
    description: resolvedDescription,
    keywords: [...site.keywords],
    authors: [...site.authors],
    alternates: {
      canonical: canonicalPath,
      ...alternates,
    },
    openGraph: {
      ...baseOpenGraph,
      ...openGraph,
      title:
        (typeof openGraph?.title === "string" ? openGraph.title : undefined) ??
        titleString,
      description: openGraph?.description ?? resolvedDescription,
      url: openGraph?.url ?? canonicalUrl,
      images: openGraph?.images ?? baseOpenGraph.images,
    },
    twitter: {
      ...baseTwitter,
      ...twitter,
      title:
        (typeof twitter?.title === "string" ? twitter.title : undefined) ??
        titleString,
      description: twitter?.description ?? resolvedDescription,
      images: twitter?.images ?? baseTwitter.images,
    },
    icons: icons ?? {
      icon: [{ url: "/icon", type: "image/png", sizes: "32x32" }],
      apple: [{ url: "/apple-icon", type: "image/png", sizes: "180x180" }],
    },
    manifest: "/manifest.webmanifest",
    other: {
      "business:contact_data:street_address": officeLine,
      "business:contact_data:locality": site.office.city,
      "business:contact_data:country_name": site.office.country,
    },
    ...rest,
  };
}

export async function createPageMetadata(
  path: PageSeoPath,
  overrides?: Omit<CreateMetadataOptions, "path" | "title" | "description">,
): Promise<Metadata> {
  const site = await getSiteConfig();
  const page = pageSeo[path];

  return createMetadata(
    {
      title: page.title,
      description: page.description,
      path,
      ...overrides,
    },
    site,
  );
}

/** Prefer CMS SEO when present; otherwise fall back to static route defaults. */
export async function createCmsPageMetadata(
  path: PageSeoPath,
  seo?: CmsSeo,
  overrides?: Omit<CreateMetadataOptions, "path" | "title" | "description">,
): Promise<Metadata> {
  if (seo?.title) {
    const site = await getSiteConfig();
    return createMetadata(
      {
        title: seo.title,
        description: seo.description,
        path,
        ...overrides,
      },
      site,
    );
  }

  return createPageMetadata(path, overrides);
}
