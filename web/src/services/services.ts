import { cache } from "react";

import { sanityTags } from "@/lib/sanity/cache-tags";
import { sanityFetch } from "@/lib/sanity/fetch";
import { mapServicesPage } from "@/mappers/services";
import { servicesPageQuery } from "@/queries/services";
import { singletonDocumentIds } from "@/lib/sanity/singletons";
import type { SanityServicesDocument } from "@/types/sanity/services";
import type { ServicesPageData } from "@/types/services";

export const getServicesPage = cache(async (): Promise<ServicesPageData> => {
  const document = await sanityFetch<SanityServicesDocument>({
    query: servicesPageQuery,
    params: { id: singletonDocumentIds.servicesPage },
    tags: [sanityTags.services],
  });

  if (!document) {
    throw new Error("Missing Sanity singleton: servicesPage");
  }

  return mapServicesPage(document);
});
