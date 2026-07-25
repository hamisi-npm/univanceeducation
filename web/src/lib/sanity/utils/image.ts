import type { SanityImageWithAlt } from "@/types/sanity/global";

export type ResolvedImage = {
  src: string;
  alt: string;
};

/**
 * Canonical Sanity → Next.js image resolver.
 * Returns a valid image when an asset URL exists (or a fallback with a non-empty src).
 * Never returns `{ src: "" }`.
 */
export function resolveSanityImage(
  image: SanityImageWithAlt | null | undefined,
  fallback?: ResolvedImage | null,
): ResolvedImage | null {
  const url = image?.asset?.url?.trim();

  if (url) {
    return {
      src: url,
      alt: image?.alt?.trim() || fallback?.alt || "",
    };
  }

  const fallbackSrc = fallback?.src?.trim();
  if (fallbackSrc) {
    return {
      src: fallbackSrc,
      alt: fallback?.alt || "",
    };
  }

  return null;
}
