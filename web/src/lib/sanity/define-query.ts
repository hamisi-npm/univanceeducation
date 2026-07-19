import { defineQuery } from "next-sanity";

/**
 * Re-export defineQuery for typegen-friendly query modules.
 * All GROQ queries must live under src/queries/ and use defineQuery.
 */
export { defineQuery };
