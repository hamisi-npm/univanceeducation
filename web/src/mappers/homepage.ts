import type { WhyChooseUsIconName } from "@/features/about/types";
import type { CtaSectionContent } from "@/features/cta/types";
import type { Destination, FeaturedDestinationsContent } from "@/features/destinations/types";
import type {
  HeroContentData,
  HeroTrustStat,
  ProgramFinderContent,
} from "@/features/home/types";
import type { Service, ServiceIconName, ServicesSectionContent } from "@/features/services/types";
import { mapCtaBanner, mapCtaLink, mapSectionHeader } from "@/mappers/shared";
import { slugify } from "@/lib/slugify";
import { resolveSanityImage } from "@/lib/sanity/utils/image";
import type {
  SanityHomepageDestination,
  SanityHomepageDocument,
  SanityHomepageHero,
  SanityHomepageService,
  SanityProgramFinder,
  SanityStatistic,
  SanityWhyChooseUsFeature,
} from "@/types/sanity/homepage";
import type { HomepageContent, HomepageWhyChooseUsContent } from "@/types/homepage";

const SERVICE_ICONS: ServiceIconName[] = [
  "graduation-cap",
  "file-text",
  "award",
  "stamp",
  "home",
  "luggage",
];

const WHY_CHOOSE_ICONS: WhyChooseUsIconName[] = [
  "badge-check",
  "globe",
  "stamp",
  "award",
  "message-circle",
  "list-checks",
];

const EMPTY_CTA = { label: "", href: "" };

function asServiceIcon(icon: string, fallback: ServiceIconName): ServiceIconName {
  return SERVICE_ICONS.includes(icon as ServiceIconName)
    ? (icon as ServiceIconName)
    : fallback;
}

function asWhyChooseIcon(
  icon: string,
  fallback: WhyChooseUsIconName,
): WhyChooseUsIconName {
  return WHY_CHOOSE_ICONS.includes(icon as WhyChooseUsIconName)
    ? (icon as WhyChooseUsIconName)
    : fallback;
}

function mapTrustStats(
  stats: SanityStatistic[] | null | undefined,
): HeroTrustStat[] {
  if (!stats?.length) {
    return [];
  }

  return stats.map((stat) => ({
    value: stat.value || "",
    label: stat.label || "",
    footnote: stat.footnote,
  }));
}

function mapHero(
  hero: SanityHomepageHero | null | undefined,
  trustStats: HeroTrustStat[],
): HeroContentData {
  if (!hero) {
    return {
      badge: { text: "", suffix: "", href: "" },
      headline: "",
      subheadline: "",
      trustMicrocopy: "",
      ctas: {
        primary: { ...EMPTY_CTA },
        secondary: { ...EMPTY_CTA },
      },
      stats: trustStats,
      floatingCards: [],
      image: { src: "", alt: "" },
    };
  }

  return {
    badge: {
      text: hero.badge?.text || "",
      suffix: hero.badge?.suffix || "",
      href: hero.badge?.href || "",
    },
    headline: hero.headline || "",
    subheadline: hero.subheadline || "",
    trustMicrocopy: hero.trustMicrocopy || "",
    ctas: {
      primary: {
        label: hero.ctas?.primary?.label || "",
        href: hero.ctas?.primary?.href || "",
      },
      secondary: {
        label: hero.ctas?.secondary?.label || "",
        href: hero.ctas?.secondary?.href || "",
      },
    },
    stats: trustStats,
    floatingCards: [],
    image: resolveSanityImage(hero.image, { src: "", alt: "" }),
  };
}

function mapProgramFinder(
  finder: SanityProgramFinder | null | undefined,
  options?: {
    destinations: ProgramFinderContent["destinations"];
    categories: ProgramFinderContent["categories"];
    levels: ProgramFinderContent["levels"];
  },
): ProgramFinderContent {
  const theme = finder?.backgroundTheme;
  const backgroundTheme =
    theme === "beige" || theme === "navy" || theme === "light" ? theme : "navy";

  const cta = finder?.cta
    ? mapCtaLink(finder.cta)
    : { ...EMPTY_CTA, href: "/programs" };

  return {
    heading: finder?.heading || finder?.title || "",
    description: finder?.description || "",
    destinationLabel: finder?.destinationLabel || "Destination",
    destinationPlaceholder:
      finder?.destinationPlaceholder || "Select destination",
    courseLabel: finder?.courseLabel || "Course",
    coursePlaceholder: finder?.coursePlaceholder || "Select course",
    studyLevelLabel: finder?.studyLevelLabel || "Study level",
    studyLevelPlaceholder:
      finder?.studyLevelPlaceholder || "Select level",
    backgroundTheme,
    showDestination: finder?.showDestination ?? true,
    showCourse: finder?.showCourse ?? true,
    showStudyLevel: finder?.showStudyLevel ?? true,
    destinations: options?.destinations ?? [],
    categories: options?.categories ?? [],
    levels: options?.levels ?? [],
    cta: {
      ...cta,
      href: cta.href || "/programs",
    },
  };
}

function mapService(service: SanityHomepageService): Service {
  const slug = service.slug || slugify(service.title);

  return {
    id: slug,
    slug,
    title: service.title || "",
    description: service.description || "",
    icon: asServiceIcon(service.icon, "graduation-cap"),
    ctaLabel: service.ctaLabel || "",
    href: `/services#${slug}`,
  };
}

function mapDestination(destination: SanityHomepageDestination): Destination {
  const slug = destination.slug || slugify(destination.country);

  return {
    id: slug,
    slug,
    country: destination.country || "",
    flag: destination.flag || "",
    description: destination.description || "",
    studyFields: destination.studyFields?.length ? destination.studyFields : [],
    tuitionRange: destination.tuitionRange || "",
    image: resolveSanityImage(destination.image, {
      src: "",
      alt: destination.country || "",
    }),
    featured: destination.featured ?? false,
    ctaLabel: destination.ctaLabel || "",
  };
}

function mapWhyChooseUs(
  section: SanityHomepageDocument["whyChooseUs"] | null | undefined,
): HomepageWhyChooseUsContent {
  const header = mapSectionHeader(section?.header);
  const features =
    section?.features?.map((feature: SanityWhyChooseUsFeature, index) => ({
      id: slugify(feature.title) || `feature-${index}`,
      title: feature.title || "",
      description: feature.description || "",
      icon: asWhyChooseIcon(feature.icon, "badge-check"),
    })) ?? [];

  return {
    ...header,
    features,
    cta: mapCtaLink(section?.cta),
  };
}

export function mapHomepage(
  document: SanityHomepageDocument | null | undefined,
  finderOptions?: {
    destinations: ProgramFinderContent["destinations"];
    categories: ProgramFinderContent["categories"];
    levels: ProgramFinderContent["levels"];
  },
): HomepageContent {
  if (!document) {
    throw new Error("Missing Sanity document");
  }

  const trustStats = mapTrustStats(document.trustStats);
  const hero = mapHero(document.hero, trustStats);

  const servicesPreviewSection = mapSectionHeader(
    document.servicesPreview?.header,
  ) satisfies ServicesSectionContent;

  const featuredSectionHeader = mapSectionHeader(
    document.featuredDestinations?.header,
  );

  const viewAll = document.featuredDestinations?.viewAll;
  const featuredDestinationsSection: FeaturedDestinationsContent = {
    ...featuredSectionHeader,
    viewAllLabel: viewAll?.label || "",
    viewAllHref: viewAll?.href || "",
  };

  const cta: CtaSectionContent = mapCtaBanner(document.ctaBanner);

  return {
    hero,
    trustStats,
    programFinder: mapProgramFinder(document.programFinder, finderOptions),
    servicesPreview: {
      section: servicesPreviewSection,
      services:
        document.servicesPreview?.services?.map((service) => mapService(service)) ??
        [],
    },
    featuredDestinations: {
      section: featuredDestinationsSection,
      destinations:
        document.featuredDestinations?.destinations?.map((destination) =>
          mapDestination(destination),
        ) ?? [],
    },
    whyChooseUs: mapWhyChooseUs(document.whyChooseUs),
    cta,
    seo: document.seo,
  };
}
