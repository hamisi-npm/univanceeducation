import type { University } from "@/features/universities/types";
import { slugify } from "@/lib/slugify";
import type { SanityImageWithAlt } from "@/types/sanity/global";
import { blocksToPlainText } from "@/lib/sanity/utils/portable-text";
import { resolveSanityImage } from "@/lib/sanity/utils/image";

export type SanityUniversityCard = {
  _id?: string;
  name: string;
  slug: string;
  city: string;
  type: string;
  description: string;
  programs?: string[] | null;
  tuitionRange: string;
  image: SanityImageWithAlt;
  featured?: boolean;
  ctaLabel: string;
  destination?: {
    country: string;
    slug: string;
    flag: string;
  };
};

export type SanityUniversityDetailDocument = SanityUniversityCard & {
  ranking?: string;
  scholarships?: Parameters<typeof blocksToPlainText>[0];
  seo?: {
    title?: string;
    description?: string;
  };
};

export type UniversityDetail = University & {
  ranking?: string;
  scholarships?: string;
  seo?: {
    title?: string;
    description?: string;
  };
};

export function mapUniversityCard(university: SanityUniversityCard): University {
  const destination = university.destination;

  return {
    id: university.slug || slugify(university.name),
    slug: university.slug || slugify(university.name),
    name: university.name || "",
    country: destination?.country || "",
    countrySlug: destination?.slug || "",
    flag: destination?.flag || "",
    city: university.city || "",
    type: university.type || "",
    description: university.description || "",
    programs: university.programs?.length ? university.programs : [],
    tuitionRange: university.tuitionRange || "",
    image: resolveSanityImage(university.image, {
      src: "",
      alt: university.name || "",
    }),
    featured: university.featured ?? false,
    ctaLabel: university.ctaLabel || "",
  };
}

export function mapUniversityDetail(
  document: SanityUniversityDetailDocument,
): UniversityDetail {
  const card = mapUniversityCard(document);

  return {
    ...card,
    ranking: document.ranking || "",
    scholarships: blocksToPlainText(document.scholarships) || "",
    seo: document.seo,
  };
}

export function deriveCountryOptions(universities: University[]) {
  const options = new Map<string, { slug: string; label: string; flag: string }>();

  for (const university of universities) {
    if (!options.has(university.countrySlug)) {
      options.set(university.countrySlug, {
        slug: university.countrySlug,
        label: university.country,
        flag: university.flag,
      });
    }
  }

  return Array.from(options.values()).sort((a, b) => a.label.localeCompare(b.label));
}
