import type { SanityImageWithAlt } from "@/types/sanity/global";

export type ResolvedImage = {
  src: string;
  alt: string;
};

/** Maps a Sanity `imageWithAlt` field to a Next.js-friendly image source. */
export function resolveSanityImage(
  image: SanityImageWithAlt | null | undefined,
  fallback: ResolvedImage,
): ResolvedImage {
  const url = image?.asset?.url;

  if (!url) {
    return fallback;
  }

  return {
    src: url,
    alt: image?.alt || fallback.alt,
  };
}
