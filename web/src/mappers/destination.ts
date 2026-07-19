import type { Destination, DestinationImage } from "@/features/destinations/types";
import type { Testimonial } from "@/features/testimonials/types";
import type { University } from "@/features/universities/types";
import { slugify } from "@/lib/slugify";
import type { SanityImageWithAlt } from "@/types/sanity/global";
import { blocksToParagraphs, blocksToPlainText } from "@/lib/sanity/utils/portable-text";
import { resolveSanityImage } from "@/lib/sanity/utils/image";

export type SanityDestinationCard = {
  _id?: string;
  slug: string;
  country: string;
  flag: string;
  description: string;
  studyFields?: string[] | null;
  tuitionRange: string;
  image: SanityImageWithAlt;
  featured?: boolean;
  ctaLabel: string;
};

export type SanityDestinationDetailDocument = SanityDestinationCard & {
  heroImage?: SanityImageWithAlt;
  gallery?: SanityImageWithAlt[] | null;
  overview?: Parameters<typeof blocksToParagraphs>[0];
  livingCost?: string;
  duration?: string;
  workRights?: string;
  visaInformation?: Parameters<typeof blocksToPlainText>[0];
  scholarships?: Parameters<typeof blocksToPlainText>[0];
  universities?: Array<{
    _id: string;
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
  }> | null;
  testimonials?: Array<{
    _id: string;
    name: string;
    course: string;
    rating: number;
    quote: string;
    featured?: boolean;
    image: SanityImageWithAlt;
    destination?: string;
    university?: string;
  }> | null;
  seo?: {
    title?: string;
    description?: string;
  };
};

export type DestinationDetail = Destination & {
  heroImage: DestinationImage;
  gallery: DestinationImage[];
  overview: string[];
  livingCost?: string;
  duration?: string;
  workRights?: string;
  visaInformation?: string;
  scholarships?: string;
  universities: University[];
  testimonials: Testimonial[];
  seo?: {
    title?: string;
    description?: string;
  };
};

export function mapDestinationCard(destination: SanityDestinationCard): Destination {
  return {
    id: destination.slug || slugify(destination.country),
    slug: destination.slug || slugify(destination.country),
    country: destination.country || "",
    flag: destination.flag || "",
    description: destination.description || "",
    studyFields: destination.studyFields?.length ? destination.studyFields : [],
    tuitionRange: destination.tuitionRange || "",
    image: resolveSanityImage(destination.image, {
      src: "",
      alt: destination.country || "",
    }),
    featured: destination.featured ?? false,
    ctaLabel: destination.ctaLabel || "",
  };
}

function mapGalleryImage(
  image: SanityImageWithAlt,
  index: number,
  country: string,
): DestinationImage {
  return resolveSanityImage(image, {
    src: "",
    alt: `${country} gallery image ${index + 1}`,
  });
}

export function mapDestinationDetail(
  document: SanityDestinationDetailDocument,
): DestinationDetail {
  const card = mapDestinationCard(document);
  const overview = blocksToParagraphs(document.overview);

  return {
    ...card,
    heroImage: resolveSanityImage(document.heroImage, card.image),
    gallery:
      document.gallery?.map((image, index) =>
        mapGalleryImage(image, index, card.country),
      ) ?? [],
    overview: overview.length ? overview : card.description ? [card.description] : [],
    livingCost: document.livingCost || "",
    duration: document.duration || "",
    workRights: document.workRights || "",
    visaInformation: blocksToPlainText(document.visaInformation) || "",
    scholarships: blocksToPlainText(document.scholarships) || "",
    universities:
      document.universities?.map((university) => {
        const dest = university.destination;

        return {
          id: university.slug || slugify(university.name),
          slug: university.slug || "",
          name: university.name || "",
          country: dest?.country || "",
          countrySlug: dest?.slug || "",
          flag: dest?.flag || "",
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
      }) ?? [],
    testimonials:
      document.testimonials?.map((testimonial) => ({
        id: slugify(testimonial.name) || testimonial._id,
        name: testimonial.name || "",
        destination: testimonial.destination || "",
        university: testimonial.university || "",
        course: testimonial.course || "",
        rating: testimonial.rating ?? 5,
        quote: testimonial.quote || "",
        featured: testimonial.featured ?? false,
        image: resolveSanityImage(testimonial.image, {
          src: "",
          alt: testimonial.name || "",
        }),
      })) ?? [],
    seo: document.seo,
  };
}
