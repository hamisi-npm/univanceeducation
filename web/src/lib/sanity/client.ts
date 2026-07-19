import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "@/lib/sanity/env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
  stega: {
    studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || "http://localhost:3333",
  },
});

/** Alias used by legacy fetch helpers. */
export const sanityClient = client;
