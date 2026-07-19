import type {
  AdmissionStepIconName,
  PopularProgramIconName,
} from "@/features/universities/types";
import { slugify } from "@/lib/slugify";
import {
  deriveCountryOptions,
  mapUniversityCard,
} from "@/mappers/university";
import {
  mapCtaBanner,
  mapCtaLink,
  mapSectionHeader,
} from "@/mappers/shared";
import type { SanityCtaBanner, SanitySectionHeader } from "@/types/sanity/shared";
import { resolveSanityImage } from "@/lib/sanity/utils/image";
import type { UniversitiesPageData } from "@/types/universities";

const PROGRAM_ICONS: PopularProgramIconName[] = [
  "cpu",
  "briefcase",
  "heart-pulse",
  "cog",
  "scale",
  "flask",
];

const ADMISSION_STEP_ICONS: AdmissionStepIconName[] = [
  "search",
  "file-text",
  "languages",
  "stamp",
  "plane",
];

function asProgramIcon(icon: string, fallback: PopularProgramIconName): PopularProgramIconName {
  return PROGRAM_ICONS.includes(icon as PopularProgramIconName)
    ? (icon as PopularProgramIconName)
    : fallback;
}

function asAdmissionStepIcon(
  icon: string,
  fallback: AdmissionStepIconName,
): AdmissionStepIconName {
  return ADMISSION_STEP_ICONS.includes(icon as AdmissionStepIconName)
    ? (icon as AdmissionStepIconName)
    : fallback;
}

type SanityUniversitiesPageDocument = {
  hero: {
    badge?: string;
    heading: string;
    description: string;
    cta: { label: string; href: string; external?: boolean };
    image: Parameters<typeof mapUniversityCard>[0]["image"];
  };
  featuredUniversities: {
    header: SanitySectionHeader;
    universities: Parameters<typeof mapUniversityCard>[0][] | null;
  };
  browseByCountry: SanitySectionHeader;
  popularPrograms: {
    header: SanitySectionHeader;
    programs: Array<{ title: string; description: string; icon: string }> | null;
  };
  admissionOverview: {
    header: SanitySectionHeader;
    steps: Array<{ title: string; description: string; icon: string }> | null;
  };
  cta: SanityCtaBanner;
  allUniversities: Parameters<typeof mapUniversityCard>[0][] | null;
  seo?: {
    title?: string;
    description?: string;
  };
};

export function mapUniversitiesPage(
  document: SanityUniversitiesPageDocument | null | undefined,
): UniversitiesPageData {
  if (!document) {
    throw new Error("Missing Sanity document");
  }

  const allUniversities =
    document.allUniversities?.map((university) => mapUniversityCard(university)) ?? [];

  const featuredUniversityList =
    document.featuredUniversities?.universities?.map((university) =>
      mapUniversityCard(university),
    ) ?? [];

  return {
    hero: {
      ...mapSectionHeader({
        badge: document.hero?.badge,
        heading: document.hero?.heading,
        description: document.hero?.description,
      }),
      cta: mapCtaLink(document.hero?.cta),
      image: resolveSanityImage(document.hero?.image, { src: "", alt: "" }),
    },
    featuredUniversities: mapSectionHeader(document.featuredUniversities?.header),
    browseByCountry: mapSectionHeader(document.browseByCountry),
    popularPrograms: {
      ...mapSectionHeader(document.popularPrograms?.header),
      programs:
        document.popularPrograms?.programs?.map((program, index) => ({
          id: slugify(program.title) || `program-${index}`,
          title: program.title || "",
          description: program.description || "",
          icon: asProgramIcon(program.icon, "cpu"),
        })) ?? [],
    },
    admissionOverview: {
      ...mapSectionHeader(document.admissionOverview?.header),
      steps:
        document.admissionOverview?.steps?.map((step, index) => ({
          id: slugify(step.title) || `step-${index}`,
          title: step.title || "",
          description: step.description || "",
          icon: asAdmissionStepIcon(step.icon, "search"),
        })) ?? [],
    },
    cta: mapCtaBanner(document.cta),
    featuredUniversityList,
    allUniversities,
    countryOptions: deriveCountryOptions(allUniversities),
    seo: document.seo,
  };
}
