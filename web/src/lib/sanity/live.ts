import { defineLive } from "next-sanity/live";

import { client } from "@/lib/sanity/client";

/**
 * Live Content API — mount `<SanityLive />` only while Draft Mode is on
 * (Presentation / Visual Editing). Published traffic uses tagged ISR fetches.
 */
export const { SanityLive } = defineLive({
  client,
  serverToken: process.env.SANITY_API_READ_TOKEN,
  browserToken: process.env.SANITY_API_READ_TOKEN,
});
