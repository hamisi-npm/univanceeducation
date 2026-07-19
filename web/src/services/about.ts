import { cache } from "react";

import { sanityTags } from "@/lib/sanity/cache-tags";
import { sanityFetch } from "@/lib/sanity/fetch";
import { mapAboutPage } from "@/mappers/about";
import { aboutPageQuery } from "@/queries/about";
import { singletonDocumentIds } from "@/lib/sanity/singletons";
import type { SanityAboutDocument } from "@/types/sanity/about";
import type { AboutPageData } from "@/types/about";

export const getAboutPage = cache(async (): Promise<AboutPageData> => {
  const document = await sanityFetch<SanityAboutDocument>({
    query: aboutPageQuery,
    params: { id: singletonDocumentIds.aboutPage },
    tags: [sanityTags.about],
  });

  if (!document) {
    throw new Error("Missing Sanity singleton: aboutPage");
  }

  return mapAboutPage(document);
});
