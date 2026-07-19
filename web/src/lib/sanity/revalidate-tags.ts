import { legalPageDocumentIds } from "@/lib/sanity/singletons";
import {
  sanityTags,
  type SanityCacheTag,
} from "@/lib/sanity/cache-tags";

type RevalidatePayload = {
  _type?: string;
  _id?: string;
  kind?: "privacy" | "terms";
  slug?: { current?: string } | string;
};

const documentTypeTags: Record<string, SanityCacheTag[]> = {
  siteSettings: [sanityTags.siteSettings],
  navigation: [sanityTags.navigation],
  footer: [sanityTags.footer],
  homepage: [sanityTags.homepage],
  aboutPage: [sanityTags.about],
  servicesPage: [sanityTags.services],
  contactPage: [sanityTags.contact],
  faqsPage: [sanityTags.faqs],
  destinationsPage: [sanityTags.destinations],
  universitiesPage: [sanityTags.universities],
  blogPage: [sanityTags.blog],
  studyGuidesPage: [sanityTags.studyGuides],
  destination: [sanityTags.destination, sanityTags.destinations],
  university: [sanityTags.university, sanityTags.universities],
  blogPost: [sanityTags.blogPost, sanityTags.blog],
  studyGuide: [sanityTags.studyGuide, sanityTags.studyGuides],
  service: [sanityTags.services],
  processStep: [sanityTags.services],
  testimonial: [sanityTags.homepage],
  teamMember: [sanityTags.about],
  partnerUniversity: [sanityTags.homepage, sanityTags.universities],
  faqCategory: [sanityTags.faqs],
  author: [sanityTags.blogPost, sanityTags.blog],
  blogCategory: [sanityTags.blog],
  studyGuideCategory: [sanityTags.studyGuides],
};

function resolveLegalPageTags(payload: RevalidatePayload): SanityCacheTag[] {
  if (payload.kind === "privacy" || payload._id === legalPageDocumentIds.privacy) {
    return [sanityTags.legalPrivacy];
  }

  if (payload.kind === "terms" || payload._id === legalPageDocumentIds.terms) {
    return [sanityTags.legalTerms];
  }

  return [sanityTags.legalPrivacy, sanityTags.legalTerms];
}

/**
 * Maps a Sanity webhook document payload to Next.js cache tags.
 * Always includes `sanity:global` so layout-level fetches refresh.
 */
export function resolveRevalidateTags(
  payload: RevalidatePayload,
): SanityCacheTag[] {
  const documentType = payload._type;

  if (!documentType) {
    return [sanityTags.global];
  }

  if (documentType === "legalPage") {
    return [...resolveLegalPageTags(payload), sanityTags.global];
  }

  const tags = documentTypeTags[documentType] ?? [];

  if (tags.length === 0) {
    return [sanityTags.global];
  }

  return [...new Set([...tags, sanityTags.global])];
}
