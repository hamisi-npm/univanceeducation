import type { BlogArticle } from "@/features/blog/types";
import type { SiteConfig } from "@/types/site";
import type { ProgramDetail } from "@/types/programs";
import {
  getAbsoluteUrl,
  type BreadcrumbItem,
} from "@/lib/seo/routes";

type JsonLd = Record<string, unknown>;

function resolveLogoUrl(site: SiteConfig): string {
  return site.logo.src.startsWith("http")
    ? site.logo.src
    : getAbsoluteUrl(site.logo.src, site.url);
}

function postalAddressJsonLd(site: SiteConfig): JsonLd {
  const { office } = site;
  const floorSuite = [office.floor, office.suite].filter(Boolean).join(", ");
  const streetAddress = [office.building, floorSuite, office.street]
    .filter(Boolean)
    .join(", ");

  return {
    "@type": "PostalAddress",
    streetAddress,
    addressLocality: office.area || office.city,
    addressRegion: office.area ? office.city : undefined,
    addressCountry: office.country,
  };
}

function contactPointJsonLd(site: SiteConfig): JsonLd {
  return {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: site.contact.email,
    telephone: site.contact.phone,
    areaServed: site.office.country,
    availableLanguage: ["English"],
  };
}

export function organizationJsonLd(site: SiteConfig): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: getAbsoluteUrl("/", site.url),
    logo: resolveLogoUrl(site),
    description: site.description,
    email: site.contact.email,
    telephone: site.contact.phone,
    address: postalAddressJsonLd(site),
    contactPoint: contactPointJsonLd(site),
    sameAs: [
      site.social.twitter,
      site.social.linkedin,
      site.social.instagram,
      site.social.facebook,
    ].filter(Boolean),
  };
}

export function websiteJsonLd(site: SiteConfig): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: getAbsoluteUrl("/", site.url),
    description: site.description,
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: getAbsoluteUrl("/", site.url),
      address: postalAddressJsonLd(site),
    },
  };
}

export function breadcrumbListJsonLd(items: BreadcrumbItem[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: getAbsoluteUrl(item.path),
    })),
  };
}

export function articleJsonLd(article: BlogArticle, site: SiteConfig): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    datePublished: article.date,
    author: {
      "@type": "Person",
      name: article.author,
    },
    image: [article.coverImage.src],
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": getAbsoluteUrl(`/blog/${article.slug}`, site.url),
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: getAbsoluteUrl("/", site.url),
      address: postalAddressJsonLd(site),
    },
  };
}

export function blogItemListJsonLd(
  articles: BlogArticle[],
  site: SiteConfig,
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${site.name} Blog`,
    itemListElement: articles.map((article, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: getAbsoluteUrl(`/blog/${article.slug}`, site.url),
      name: article.title,
    })),
  };
}

export function courseJsonLd(program: ProgramDetail, site: SiteConfig): JsonLd {
  const provider = program.university.slug
    ? {
        "@type": "CollegeOrUniversity",
        name: program.university.name,
        url: getAbsoluteUrl(
          `/universities/${program.university.slug}`,
          site.url,
        ),
        address: {
          "@type": "PostalAddress",
          addressLocality: program.university.city || undefined,
          addressCountry: program.university.destinationCountry || undefined,
        },
      }
    : {
        "@type": "Organization",
        name: site.name,
        url: getAbsoluteUrl("/", site.url),
      };

  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: program.title,
    description: program.shortDescription,
    url: getAbsoluteUrl(`/programs/${program.slug}`, site.url),
    image: program.image.src || undefined,
    provider,
    educationalLevel: program.studyLevelName || undefined,
    timeRequired: program.duration || undefined,
    inLanguage: program.language || undefined,
    offers: program.annualTuition
      ? {
          "@type": "Offer",
          category: "Tuition",
          price: program.annualTuition,
          priceCurrency: program.currency || "USD",
        }
      : undefined,
  };
}
