import type { LegalHeroContent, LegalSection } from "@/features/legal/types";
import { formatArticleDate } from "@/lib/format-article-date";
import { slugify } from "@/lib/slugify";
import type { SanityLegalDocument } from "@/types/sanity/legal";
import { blocksToParagraphs } from "@/lib/sanity/utils/portable-text";
import type { LegalPageData } from "@/types/legal";

function mapLegalHero(
  hero: SanityLegalDocument["hero"] | null | undefined,
): LegalHeroContent {
  const lastUpdatedIso = hero?.lastUpdated || "";

  return {
    badge: hero?.badge || "",
    heading: hero?.heading || "",
    description: hero?.description || "",
    lastUpdated: lastUpdatedIso ? formatArticleDate(lastUpdatedIso) : "",
    lastUpdatedIso,
  };
}

function mapLegalSections(
  sections: SanityLegalDocument["sections"] | null | undefined,
): LegalSection[] {
  if (!sections?.length) {
    return [];
  }

  return sections.map((section, index) => {
    const paragraphs = blocksToParagraphs(section.paragraphs);

    return {
      id: slugify(section.heading) || `section-${index}`,
      heading: section.heading || "",
      paragraphs,
      listItems: section.listItems?.length ? section.listItems : undefined,
    };
  });
}

export function mapPrivacyPolicy(
  document: SanityLegalDocument | null | undefined,
): LegalPageData {
  if (!document) {
    throw new Error("Missing Sanity document");
  }

  return {
    hero: mapLegalHero(document.hero),
    sections: mapLegalSections(document.sections),
    seo: document.seo,
  };
}

export function mapTermsPage(
  document: SanityLegalDocument | null | undefined,
): LegalPageData {
  if (!document) {
    throw new Error("Missing Sanity document");
  }

  return {
    hero: mapLegalHero(document.hero),
    sections: mapLegalSections(document.sections),
    seo: document.seo,
  };
}
