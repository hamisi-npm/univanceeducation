import { client } from "@/lib/sanity/client";
import {
  SANITY_REVALIDATE_SECONDS,
  sanityTags,
  type SanityCacheTag,
} from "@/lib/sanity/cache-tags";

const isDevelopment = process.env.NODE_ENV === "development";

type SanityFetchOptions = {
  query: string;
  params?: Record<string, unknown>;
  tags: SanityCacheTag[];
};

function getFetchOptions(tags: SanityCacheTag[]) {
  if (isDevelopment) {
    return { cache: "no-store" as const };
  }

  return {
    next: {
      revalidate: SANITY_REVALIDATE_SECONDS,
      tags: [...tags, sanityTags.global],
    },
  };
}

/**
 * Tagged Sanity fetch for Server Components.
 * Live updates are handled by `<SanityLive />` in the root layout.
 * Returns `null` on failure so callers can throw domain-specific errors.
 */
export async function sanityFetch<T>({
  query,
  params = {},
  tags,
}: SanityFetchOptions): Promise<T | null> {
  try {
    return await client.fetch<T>(query, params, getFetchOptions(tags));
  } catch (error) {
    if (isDevelopment) {
      console.error("[sanity] Fetch failed:", { tags, error });
    }
    return null;
  }
}

export { SANITY_REVALIDATE_SECONDS };
