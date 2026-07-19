import type { CtaSectionContent } from "@/features/cta/types";
import type { Destination, FeaturedDestinationsContent } from "@/features/destinations/types";
import type { HeroContentData, HeroFloatingCard } from "@/features/home/types";
import type { HeroTrustStat } from "@/features/home/types";
import type { ProcessStep } from "@/features/process/types";
import type { ProcessStepIconName } from "@/features/process/types";
import type { Service, ServiceIconName, ServicesSectionContent } from "@/features/services/types";
import type { Testimonial } from "@/features/testimonials/types";
import { slugify } from "@/lib/slugify";
import type {
  SanityCtaBanner,
  SanityHomepageDestination,
  SanityHomepageDocument,
  SanityHomepageHero,
  SanityHomepageProcessStep,
  SanityHomepageService,
  SanityHomepageTestimonial,
  SanitySectionHeader,
  SanityStatistic,
} from "@/types/sanity/homepage";
import type { SanityCtaLink } from "@/types/sanity/global";
import { resolveSanityImage } from "@/lib/sanity/utils/image";
import type { HomepageContent } from "@/types/homepage";

const SERVICE_ICONS: ServiceIconName[] = [
  "graduation-cap",
  "file-text",
  "award",
  "stamp",
  "home",
  "luggage",
];

const PROCESS_ICONS: ProcessStepIconName[] = [
  "message-circle",
  "map-pin",
  "file-text",
  "mail-check",
  "stamp",
  "plane-takeoff",
];

const EMPTY_CTA = { label: "", href: "" };

function asServiceIcon(icon: string, fallback: ServiceIconName): ServiceIconName {
  return SERVICE_ICONS.includes(icon as ServiceIconName)
    ? (icon as ServiceIconName)
    : fallback;
}

function asProcessIcon(icon: string, fallback: ProcessStepIconName): ProcessStepIconName {
  return PROCESS_ICONS.includes(icon as ProcessStepIconName)
    ? (icon as ProcessStepIconName)
    : fallback;
}

function mapSectionHeader(header: SanitySectionHeader | null | undefined) {
  return {
    badge: header?.badge || "",
    heading: header?.heading || "",
    description: header?.description || "",
  };
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

  const floatingCards: HeroFloatingCard[] = (hero.floatingCards ?? []).map((card, index) => ({
    id: slugify(card.title) || `floating-card-${index}`,
    title: card.title || "",
    subtitle: card.subtitle || "",
    icon: card.icon === "offer" ? "offer" : "check",
    position: card.position === "top-right" ? "top-right" : "bottom-left",
  }));

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
    floatingCards,
    image: resolveSanityImage(hero.image, { src: "", alt: "" }),
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
    href: `/services/${slug}`,
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

function mapProcessStep(step: SanityHomepageProcessStep, index: number): ProcessStep {
  return {
    id: slugify(step.title) || `step-${step.step ?? index + 1}`,
    step: step.step ?? index + 1,
    title: step.title || "",
    description: step.description || "",
    icon: asProcessIcon(step.icon, "message-circle"),
  };
}

function mapTestimonial(testimonial: SanityHomepageTestimonial): Testimonial {
  return {
    id: slugify(testimonial.name) || testimonial._id,
    name: testimonial.name || "",
    destination: testimonial.destination || "",
    university: testimonial.university || "",
    course: testimonial.course || "",
    rating: testimonial.rating ?? 5,
    quote: testimonial.quote || "",
    featured: testimonial.featured ?? false,
    image: resolveSanityImage(testimonial.image, {
      src: "",
      alt: testimonial.name || "",
    }),
  };
}

function mapCtaBanner(
  banner: SanityCtaBanner | null | undefined,
): CtaSectionContent {
  if (!banner) {
    return {
      badge: "",
      heading: "",
      description: "",
      primaryCta: { ...EMPTY_CTA },
      secondaryCta: { ...EMPTY_CTA },
      trustMicrocopy: "",
    };
  }

  const mapLink = (link: SanityCtaLink | undefined) => ({
    label: link?.label || "",
    href: link?.href || "",
    external: link?.external ?? false,
  });

  return {
    badge: banner.badge || "",
    heading: banner.heading || "",
    description: banner.description || "",
    primaryCta: mapLink(banner.primaryCta),
    secondaryCta: mapLink(banner.secondaryCta),
    trustMicrocopy: banner.trustMicrocopy || "",
  };
}

export function mapHomepage(
  document: SanityHomepageDocument | null | undefined,
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

  const processSection = mapSectionHeader(document.processPreview?.header);
  const processCta = document.processPreview?.cta;

  return {
    hero,
    trustStats,
    trustedUniversities: {
      heading: document.trustedUniversities?.heading || "",
      partners:
        document.trustedUniversities?.partners
          ?.map((partner) => partner.name)
          .filter(Boolean) ?? [],
    },
    servicesPreview: {
      section: servicesPreviewSection,
      services:
        document.servicesPreview?.services?.map((service) => mapService(service)) ?? [],
    },
    featuredDestinations: {
      section: featuredDestinationsSection,
      destinations:
        document.featuredDestinations?.destinations?.map((destination) =>
          mapDestination(destination),
        ) ?? [],
    },
    processPreview: {
      section: {
        ...processSection,
        cta: {
          label: processCta?.label || "",
          href: processCta?.href || "",
          supportingText: processCta?.supportingText || "",
        },
      },
      steps:
        document.processPreview?.steps?.map((step, index) =>
          mapProcessStep(step, index),
        ) ?? [],
    },
    testimonialsPreview: {
      section: mapSectionHeader(document.testimonialsPreview?.header),
      testimonials:
        document.testimonialsPreview?.testimonials?.map((testimonial) =>
          mapTestimonial(testimonial),
        ) ?? [],
    },
    cta: mapCtaBanner(document.ctaBanner),
    seo: document.seo,
  };
}
