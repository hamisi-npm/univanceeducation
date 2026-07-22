import { mapProgramCard } from "@/mappers/program";
import type {
  SanityProgramCard,
  SanityProgramFilterOptions,
  SanityProgramsPageDocument,
} from "@/types/sanity/programs";
import type {
  ProgramFilterOptions,
  ProgramsPageData,
} from "@/types/programs";
import { resolveSanityImage } from "@/lib/sanity/utils/image";

function mapCta(cta: SanityProgramsPageDocument["ctaBanner"]["cta"]) {
  return {
    label: cta?.label || "",
    href: cta?.href || "/contact",
    ...(cta?.external ? { external: true } : {}),
  };
}

export function mapProgramsPage(
  document: SanityProgramsPageDocument,
): ProgramsPageData {
  const heroImage = document.hero?.image
    ? resolveSanityImage(document.hero.image, {
        src: "",
        alt: document.hero.heading || "",
      })
    : null;

  return {
    hero: {
      badge: document.hero?.badge || "",
      heading: document.hero?.heading || "",
      description: document.hero?.description || "",
      image: heroImage?.src ? heroImage : null,
    },
    statistics:
      document.statistics
        ?.filter((stat) => stat.value && stat.label)
        .map((stat) => ({
          value: stat.value,
          label: stat.label,
        })) ?? [],
    filters: {
      heading: document.filters?.heading || "",
      description: document.filters?.description || "",
      destinationLabel: document.filters?.destinationLabel || "Destination",
      universityLabel: document.filters?.universityLabel || "University",
      categoryLabel: document.filters?.categoryLabel || "Category",
      levelLabel: document.filters?.levelLabel || "Study level",
      keywordLabel: document.filters?.keywordLabel || "Search",
      keywordPlaceholder:
        document.filters?.keywordPlaceholder || "Search programs…",
      submitLabel: document.filters?.submitLabel || "Apply filters",
      clearLabel: document.filters?.clearLabel || "Clear all",
    },
    resultsCountLabel: document.resultsCountLabel || "{count} programs found",
    emptyState: {
      heading: document.emptyState?.heading || "No programs found",
      description:
        document.emptyState?.description ||
        "Try adjusting your filters or search keywords.",
    },
    ctaBanner: {
      heading: document.ctaBanner?.heading || "",
      description: document.ctaBanner?.description || "",
      cta: mapCta(document.ctaBanner?.cta),
    },
    seo: document.seo,
  };
}

export function mapProgramCards(
  items: SanityProgramCard[] | null | undefined,
) {
  return (items ?? []).map(mapProgramCard);
}

export function mapProgramFilterOptions(
  options: SanityProgramFilterOptions | null | undefined,
): ProgramFilterOptions {
  return {
    destinations:
      options?.destinations
        ?.filter((item) => item.slug && item.label)
        .map((item) => ({
          slug: item.slug,
          label: item.label,
          ...(item.flag ? { flag: item.flag } : {}),
        })) ?? [],
    universities:
      options?.universities
        ?.filter((item) => item.slug && item.label)
        .map((item) => ({
          slug: item.slug,
          label: item.label,
          ...(item.destinationSlug
            ? { destinationSlug: item.destinationSlug }
            : {}),
        })) ?? [],
    categories:
      options?.categories
        ?.filter((item) => item.slug && item.label)
        .map((item) => ({
          slug: item.slug,
          label: item.label,
        })) ?? [],
    levels:
      options?.levels
        ?.filter((item) => item.slug && item.label)
        .map((item) => ({
          slug: item.slug,
          label: item.label,
        })) ?? [],
  };
}
