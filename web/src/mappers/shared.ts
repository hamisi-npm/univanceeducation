import type { SanityCtaLink } from "@/types/sanity/global";
import type { SanityCtaBanner, SanitySectionHeader } from "@/types/sanity/shared";
import { blocksToPlainText } from "@/lib/sanity/utils/portable-text";
import { slugify } from "@/lib/slugify";

const EMPTY_CTA = { label: "", href: "" };

export function mapSectionHeader(
  header: SanitySectionHeader | null | undefined,
) {
  return {
    badge: header?.badge || "",
    heading: header?.heading || "",
    description: header?.description || "",
  };
}

export function mapCtaLink(link: SanityCtaLink | null | undefined) {
  return {
    label: link?.label || "",
    href: link?.href || "",
    external: link?.external ?? false,
  };
}

export function mapCtaBanner(banner: SanityCtaBanner | null | undefined) {
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

  return {
    badge: banner.badge || "",
    heading: banner.heading || "",
    description: banner.description || "",
    primaryCta: mapCtaLink(banner.primaryCta),
    secondaryCta: mapCtaLink(banner.secondaryCta),
    trustMicrocopy: banner.trustMicrocopy || "",
  };
}

export function mapFaqItems(
  items:
    | Array<{
        question: string;
        answer: Parameters<typeof blocksToPlainText>[0];
      }>
    | null
    | undefined,
) {
  if (!items?.length) {
    return [];
  }

  return items.map((item, index) => ({
    id: slugify(item.question) || `faq-${index}`,
    question: item.question || "",
    answer: blocksToPlainText(item.answer) || "",
  }));
}
