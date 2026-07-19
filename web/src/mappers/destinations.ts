import type {
  AdmissionRequirementIconName,
  PopularCourseIconName,
} from "@/features/destinations-page/types";
import type { DestinationsPageContent } from "@/features/destinations-page/types";
import { slugify } from "@/lib/slugify";
import { mapDestinationCard } from "@/mappers/destination";
import {
  mapCtaBanner,
  mapCtaLink,
  mapFaqItems,
  mapSectionHeader,
} from "@/mappers/shared";
import type { SanityCtaBanner, SanityPortableText, SanitySectionHeader } from "@/types/sanity/shared";
import { resolveSanityImage } from "@/lib/sanity/utils/image";
import type { DestinationsPageData } from "@/types/destinations";

const POPULAR_COURSE_ICONS: PopularCourseIconName[] = [
  "cog",
  "briefcase",
  "cpu",
  "heart-pulse",
  "utensils-crossed",
  "palette",
];

const ADMISSION_ICONS: AdmissionRequirementIconName[] = [
  "file-text",
  "languages",
  "pen-line",
  "users",
  "stamp",
];

const EMPTY_COLUMNS: DestinationsPageContent["costComparison"]["columns"] = {
  country: "",
  tuition: "",
  livingCosts: "",
  duration: "",
  workWhileStudying: "",
};

function asPopularCourseIcon(icon: string, fallback: PopularCourseIconName): PopularCourseIconName {
  return POPULAR_COURSE_ICONS.includes(icon as PopularCourseIconName)
    ? (icon as PopularCourseIconName)
    : fallback;
}

function asAdmissionIcon(
  icon: string,
  fallback: AdmissionRequirementIconName,
): AdmissionRequirementIconName {
  return ADMISSION_ICONS.includes(icon as AdmissionRequirementIconName)
    ? (icon as AdmissionRequirementIconName)
    : fallback;
}

type SanityDestinationsPageDocument = {
  hero: {
    badge?: string;
    heading: string;
    description: string;
    cta: { label: string; href: string; external?: boolean };
    image: Parameters<typeof mapDestinationCard>[0]["image"];
  };
  featuredCountries: {
    header: SanitySectionHeader;
    destinations: Parameters<typeof mapDestinationCard>[0][] | null;
  };
  countryGrid: {
    header: SanitySectionHeader;
    destinations: Parameters<typeof mapDestinationCard>[0][] | null;
  };
  costComparison: {
    header: SanitySectionHeader;
    columns: DestinationsPageContent["costComparison"]["columns"];
    rows: Array<{
      country: string;
      tuition: string;
      livingCosts: string;
      duration: string;
      workWhileStudying: string;
    }> | null;
    caption: string;
  };
  popularCourses: {
    header: SanitySectionHeader;
    courses: Array<{ title: string; description: string; icon: string }> | null;
  };
  admissionRequirements: {
    header: SanitySectionHeader;
    requirements: Array<{ title: string; description: string; icon: string }> | null;
  };
  faqPreview: {
    header: SanitySectionHeader;
    items: Array<{ question: string; answer: SanityPortableText }> | null;
    viewAll: { label: string; href: string; external?: boolean };
  };
  cta: SanityCtaBanner;
  seo?: {
    title?: string;
    description?: string;
  };
};

export function mapDestinationsPage(
  document: SanityDestinationsPageDocument | null | undefined,
): DestinationsPageData {
  if (!document) {
    throw new Error("Missing Sanity document");
  }

  const featuredDestinations =
    document.featuredCountries?.destinations?.map((destination) =>
      mapDestinationCard(destination),
    ) ?? [];

  const gridDestinations =
    document.countryGrid?.destinations?.map((destination) =>
      mapDestinationCard(destination),
    ) ?? [];

  return {
    hero: {
      badge: document.hero?.badge || "",
      heading: document.hero?.heading || "",
      description: document.hero?.description || "",
      cta: mapCtaLink(document.hero?.cta),
      image: resolveSanityImage(document.hero?.image, { src: "", alt: "" }),
    },
    featuredCountries: mapSectionHeader(document.featuredCountries?.header),
    countryGrid: mapSectionHeader(document.countryGrid?.header),
    costComparison: {
      ...mapSectionHeader(document.costComparison?.header),
      columns: document.costComparison?.columns ?? EMPTY_COLUMNS,
      rows:
        document.costComparison?.rows?.map((row, index) => ({
          id: slugify(row.country) || `row-${index}`,
          country: row.country || "",
          tuition: row.tuition || "",
          livingCosts: row.livingCosts || "",
          duration: row.duration || "",
          workWhileStudying: row.workWhileStudying || "",
        })) ?? [],
      caption: document.costComparison?.caption || "",
    },
    popularCourses: {
      ...mapSectionHeader(document.popularCourses?.header),
      courses:
        document.popularCourses?.courses?.map((course, index) => ({
          id: slugify(course.title) || `course-${index}`,
          title: course.title || "",
          description: course.description || "",
          icon: asPopularCourseIcon(course.icon, "cog"),
        })) ?? [],
    },
    admissionRequirements: {
      ...mapSectionHeader(document.admissionRequirements?.header),
      requirements:
        document.admissionRequirements?.requirements?.map((requirement, index) => ({
          id: slugify(requirement.title) || `requirement-${index}`,
          title: requirement.title || "",
          description: requirement.description || "",
          icon: asAdmissionIcon(requirement.icon, "file-text"),
        })) ?? [],
    },
    faqPreview: {
      ...mapSectionHeader(document.faqPreview?.header),
      items: mapFaqItems(document.faqPreview?.items),
      viewAllLabel: document.faqPreview?.viewAll?.label || "",
      viewAllHref: document.faqPreview?.viewAll?.href || "",
    },
    cta: mapCtaBanner(document.cta),
    featuredDestinations,
    gridDestinations,
    seo: document.seo,
  };
}
