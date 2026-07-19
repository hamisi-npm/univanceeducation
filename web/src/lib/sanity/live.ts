import { defineLive } from "next-sanity/live";

import { client } from "@/lib/sanity/client";

/**
 * Live Content API — render `<SanityLive />` in the root layout.
 * Server data fetching uses `sanityFetch` in `./fetch.ts` with cache tags.
 */
export const { SanityLive } = defineLive({
  client,
  serverToken: process.env.SANITY_API_READ_TOKEN,
  browserToken: process.env.SANITY_API_READ_TOKEN,
});
