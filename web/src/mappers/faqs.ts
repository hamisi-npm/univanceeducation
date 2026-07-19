import type { FaqsPageContent } from "@/features/faqs/types";
import { slugify } from "@/lib/slugify";
import { mapCtaBanner, mapCtaLink, mapFaqItems } from "@/mappers/shared";
import type { SanityCtaBanner, SanityPortableText } from "@/types/sanity/shared";

type SanityFaqsPageDocument = {
  hero: {
    badge?: string;
    heading: string;
    description: string;
    cta: { label: string; href: string; external?: boolean };
  };
  categories: Array<{
    _id: string;
    title: string;
    description?: string;
    items: Array<{
      question: string;
      answer: SanityPortableText;
    }> | null;
  }> | null;
  cta: SanityCtaBanner;
};

export function mapFaqsPage(
  document: SanityFaqsPageDocument | null | undefined,
): FaqsPageContent {
  if (!document) {
    throw new Error("Missing Sanity document");
  }

  return {
    hero: {
      badge: document.hero?.badge || "",
      heading: document.hero?.heading || "",
      description: document.hero?.description || "",
      cta: mapCtaLink(document.hero?.cta),
    },
    categories:
      document.categories?.map((category) => ({
        id: slugify(category.title) || category._id,
        title: category.title || "",
        description: category.description || "",
        items: mapFaqItems(category.items),
      })) ?? [],
    cta: mapCtaBanner(document.cta),
  };
}
