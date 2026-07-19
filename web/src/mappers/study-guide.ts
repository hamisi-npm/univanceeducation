import type { StudyGuide, GuideCategorySlug } from "@/features/study-guides/types";
import { slugify } from "@/lib/slugify";
import type { SanityImageWithAlt } from "@/types/sanity/global";
import type { SanityPortableText } from "@/types/sanity/shared";
import { blocksToParagraphs } from "@/lib/sanity/utils/portable-text";
import { resolveSanityImage } from "@/lib/sanity/utils/image";

export type SanityStudyGuideCard = {
  _id?: string;
  slug: string;
  title: string;
  readTime: string;
  description: string;
  coverImage: SanityImageWithAlt;
  ctaLabel: string;
  categorySlug?: string;
  categoryLabel?: string;
};

export type SanityStudyGuideDetailDocument = SanityStudyGuideCard & {
  body?: SanityPortableText;
  seo?: {
    title?: string;
    description?: string;
  };
  relatedGuides?: SanityStudyGuideCard[] | null;
};

export type StudyGuideDetail = StudyGuide & {
  body: string[];
  seo?: {
    title?: string;
    description?: string;
  };
  relatedGuides: StudyGuide[];
};

export function mapStudyGuideCard(guide: SanityStudyGuideCard): StudyGuide {
  return {
    id: guide.slug || slugify(guide.title),
    slug: guide.slug || slugify(guide.title),
    title: guide.title || "",
    category: (guide.categorySlug || "") as GuideCategorySlug,
    categoryLabel: guide.categoryLabel || "",
    readTime: guide.readTime || "",
    description: guide.description || "",
    coverImage: resolveSanityImage(guide.coverImage, {
      src: "",
      alt: guide.title || "",
    }),
    ctaLabel: guide.ctaLabel || "",
  };
}

export function mapStudyGuideDetail(
  document: SanityStudyGuideDetailDocument,
): StudyGuideDetail {
  const card = mapStudyGuideCard(document);

  const body = document.body?.length
    ? blocksToParagraphs(document.body)
    : card.description
      ? [card.description]
      : [];

  const relatedGuides =
    document.relatedGuides?.map((guide) => mapStudyGuideCard(guide)) ?? [];

  return {
    ...card,
    body,
    seo: document.seo,
    relatedGuides,
  };
}
