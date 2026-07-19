import type { ContactMethodIcon } from "@/features/contact/types";
import type { ContactPageData } from "@/types/contact";
import { slugify } from "@/lib/slugify";
import {
  mapCtaBanner,
  mapCtaLink,
  mapFaqItems,
  mapSectionHeader,
} from "@/mappers/shared";
import type { SanityContactDocument } from "@/types/sanity/contact";
import { resolveSanityImage } from "@/lib/sanity/utils/image";

const CONTACT_METHOD_ICONS: ContactMethodIcon[] = [
  "phone",
  "mail",
  "message-circle",
  "map-pin",
];

const EMPTY_FIELD = { label: "", placeholder: "" };

function asContactMethodIcon(
  icon: string,
  fallback: ContactMethodIcon,
): ContactMethodIcon {
  return CONTACT_METHOD_ICONS.includes(icon as ContactMethodIcon)
    ? (icon as ContactMethodIcon)
    : fallback;
}

function mapSelectOptions(
  options: Array<{ value: string; label: string }> | null | undefined,
) {
  if (!options?.length) {
    return [];
  }

  return options.map((option) => ({
    value: option.value || "",
    label: option.label || "",
  }));
}

export function mapContactPage(
  document: SanityContactDocument | null | undefined,
): ContactPageData {
  if (!document) {
    throw new Error("Missing Sanity document");
  }

  const heroHeader = document.hero?.header;
  const fields = document.consultationForm?.fields;

  return {
    hero: {
      badge: heroHeader?.badge || "",
      heading: heroHeader?.heading || "",
      description: heroHeader?.description || "",
      cta: mapCtaLink(document.hero?.cta),
      image: resolveSanityImage(document.hero?.image, { src: "", alt: "" }),
    },
    contactMethods: {
      ...mapSectionHeader(document.contactMethods?.header),
      methods:
        document.contactMethods?.methods?.map((method, index) => ({
          id: slugify(method.title) || `method-${index}`,
          title: method.title || "",
          description: method.description || "",
          value: method.value || "",
          href: method.href,
          external: method.external,
          icon: asContactMethodIcon(method.icon, "phone"),
        })) ?? [],
    },
    consultationForm: {
      ...mapSectionHeader(document.consultationForm?.header),
      fields: {
        fullName: fields?.fullName ?? EMPTY_FIELD,
        email: fields?.email ?? EMPTY_FIELD,
        phone: fields?.phone ?? EMPTY_FIELD,
        preferredDestination: fields?.preferredDestination ?? EMPTY_FIELD,
        preferredIntake: fields?.preferredIntake ?? EMPTY_FIELD,
        studyLevel: fields?.studyLevel ?? EMPTY_FIELD,
        message: fields?.message ?? EMPTY_FIELD,
      },
      destinationOptions: mapSelectOptions(
        document.consultationForm?.destinationOptions,
      ),
      intakeOptions: mapSelectOptions(document.consultationForm?.intakeOptions),
      studyLevelOptions: mapSelectOptions(
        document.consultationForm?.studyLevelOptions,
      ),
      submitLabel: document.consultationForm?.submitLabel || "",
      successTitle: document.consultationForm?.successTitle || "",
      successMessage: document.consultationForm?.successMessage || "",
    },
    officeLocation: {
      ...mapSectionHeader(document.officeLocation?.header),
      address: document.officeLocation?.address || "",
      mapImage: resolveSanityImage(document.officeLocation?.mapImage, {
        src: "",
        alt: "",
      }),
      openInMapsLabel: document.officeLocation?.openInMapsLabel || "",
      mapsHref: document.officeLocation?.mapsHref || "",
    },
    officeHours: {
      ...mapSectionHeader(document.officeHours?.header),
      entries:
        document.officeHours?.entries?.map((entry, index) => ({
          id: slugify(entry.days) || `hours-${index}`,
          days: entry.days || "",
          hours: entry.hours || "",
        })) ?? [],
      note: document.officeHours?.note || "",
    },
    faqPreview: {
      ...mapSectionHeader(document.faqPreview?.header),
      items: mapFaqItems(document.faqPreview?.items),
      viewAllLabel: document.faqPreview?.viewAll?.label || "",
      viewAllHref: document.faqPreview?.viewAll?.href || "",
    },
    cta: mapCtaBanner(document.cta),
    seo: document.seo,
  };
}
