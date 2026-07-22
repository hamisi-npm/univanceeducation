import type { DocumentRule } from "@sanity/types";

import { apiVersion } from "./env";

/**
 * Fixed document IDs for desk structure (Milestone 2.x).
 * Structure tool will open these IDs directly — editors cannot create duplicates.
 */
export const singletonDocumentIds = {
  siteSettings: "siteSettings",
  navigation: "navigation",
  footer: "footer",
  homepage: "homepage",
  aboutPage: "aboutPage",
  contactPage: "contactPage",
  faqsPage: "faqsPage",
  servicesPage: "servicesPage",
  destinationsPage: "destinationsPage",
  universitiesPage: "universitiesPage",
  programsPage: "programsPage",
  blogPage: "blogPage",
  studyGuidesPage: "studyGuidesPage",
} as const;

/** Fixed IDs for legal singletons (same schema type, unique `kind`). */
export const legalPageDocumentIds = {
  privacy: "legalPage-privacy",
  terms: "legalPage-terms",
} as const;

export type SingletonDocumentType = keyof typeof singletonDocumentIds;

/**
 * Prevents more than one published document per singleton type.
 * Pair with `singletonDocumentIds` in the Studio desk structure.
 */
export function singletonDocumentRule(documentType: SingletonDocumentType | string) {
  return (rule: DocumentRule) =>
    rule.custom(async (_, { document, getClient }) => {
      if (!document?._id) {
        return true;
      }

      const client = getClient({ apiVersion });
      const publishedId = document._id.replace(/^drafts\./, "");

      const count = await client.fetch<number>(
        `count(*[_type == $type && _id != $published && _id != $draft])`,
        {
          type: documentType,
          published: publishedId,
          draft: `drafts.${publishedId}`,
        },
      );

      return count === 0 || "Only one document of this type is allowed.";
    });
}

/**
 * Ensures only one document exists per value of a given field (e.g. legal `kind`).
 */
export function uniqueFieldDocumentRule(documentType: string, fieldName: string) {
  return (rule: DocumentRule) =>
    rule.custom(async (_, { document, getClient }) => {
      const value = document?.[fieldName] as string | undefined;

      if (!value || !document?._id) {
        return true;
      }

      const client = getClient({ apiVersion });
      const publishedId = document._id.replace(/^drafts\./, "");

      const count = await client.fetch<number>(
        `count(*[_type == $type && ${fieldName} == $value && _id != $published && _id != $draft])`,
        {
          type: documentType,
          value,
          published: publishedId,
          draft: `drafts.${publishedId}`,
        },
      );

      return count === 0 || `Only one document with this ${fieldName} is allowed.`;
    });
}
