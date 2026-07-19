import type { StudyGuidesPageContent } from "@/features/study-guides/types";
import { slugify } from "@/lib/slugify";
import { mapStudyGuideCard, type SanityStudyGuideCard } from "@/mappers/study-guide";
import { mapCtaBanner, mapCtaLink, mapSectionHeader } from "@/mappers/shared";
import type { SanityCtaBanner } from "@/types/sanity/shared";
import { resolveSanityImage } from "@/lib/sanity/utils/image";
import type { StudyGuidesPageData } from "@/types/study-guides";

type SanityStudyGuidesPageDocument = {
  hero: {
    badge?: string;
    heading: string;
    description: string;
    cta: { label: string; href: string; external?: boolean };
    image: Parameters<typeof resolveSanityImage>[0];
  };
  featuredGuides: { badge?: string; heading: string; description: string };
  guideCategories: {
    header: { badge?: string; heading: string; description: string };
    categories: Array<{
      _id: string;
      label: string;
      slug: string;
      description?: string;
    }> | null;
  };
  studyChecklist: {
    header: { badge?: string; heading: string; description: string };
    items: Array<{ title: string; description: string }> | null;
  };
  resources: {
    header: { badge?: string; heading: string; description: string };
    links: Array<{
      title: string;
      description: string;
      href: string;
      external?: boolean;
    }> | null;
  };
  cta: SanityCtaBanner;
  seo?: {
    title?: string;
    description?: string;
  };
  guides: SanityStudyGuideCard[] | null;
};

export function mapStudyGuidesPage(
  document: SanityStudyGuidesPageDocument | null | undefined,
): StudyGuidesPageData {
  if (!document) {
    throw new Error("Missing Sanity document");
  }

  return {
    hero: {
      badge: document.hero?.badge || "",
      heading: document.hero?.heading || "",
      description: document.hero?.description || "",
      cta: mapCtaLink(document.hero?.cta),
      image: resolveSanityImage(document.hero?.image, { src: "", alt: "" }),
    },
    featuredGuides: mapSectionHeader(document.featuredGuides),
    guideCategories: {
      ...mapSectionHeader(document.guideCategories?.header),
      categories:
        document.guideCategories?.categories?.map((category) => ({
          id: (category.slug ||
            slugify(category.label)) as StudyGuidesPageContent["guideCategories"]["categories"][number]["id"],
          label: category.label || "",
          description: category.description || "",
        })) ?? [],
    },
    studyChecklist: {
      ...mapSectionHeader(document.studyChecklist?.header),
      items:
        document.studyChecklist?.items?.map((item, index) => ({
          id: slugify(item.title) || `checklist-${index}`,
          title: item.title || "",
          description: item.description || "",
        })) ?? [],
    },
    resources: {
      ...mapSectionHeader(document.resources?.header),
      links:
        document.resources?.links?.map((link, index) => ({
          id: slugify(link.title) || `resource-${index}`,
          title: link.title || "",
          description: link.description || "",
          href: link.href || "",
        })) ?? [],
    },
    cta: mapCtaBanner(document.cta),
    guides: document.guides?.map((guide) => mapStudyGuideCard(guide)) ?? [],
    seo: document.seo,
  };
}
