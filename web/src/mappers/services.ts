import type { ProcessStep } from "@/features/process/types";
import type { ProcessStepIconName } from "@/features/process/types";
import type { Service, ServiceIconName } from "@/features/services/types";
import type { ServiceDetail } from "@/features/services-page/types";
import { slugify } from "@/lib/slugify";
import {
  mapCtaBanner,
  mapCtaLink,
  mapFaqItems,
  mapSectionHeader,
} from "@/mappers/shared";
import type {
  SanityProcessStepDocument,
  SanityServiceDocument,
  SanityServicesDocument,
} from "@/types/sanity/services";
import { resolveSanityImage } from "@/lib/sanity/utils/image";
import type { ServicesPageData } from "@/types/services";

const SERVICE_ICONS: ServiceIconName[] = [
  "graduation-cap",
  "file-text",
  "award",
  "stamp",
  "home",
  "luggage",
];

const PROCESS_ICONS: ProcessStepIconName[] = [
  "message-circle",
  "map-pin",
  "file-text",
  "mail-check",
  "stamp",
  "plane-takeoff",
];

function asServiceIcon(icon: string, fallback: ServiceIconName): ServiceIconName {
  return SERVICE_ICONS.includes(icon as ServiceIconName)
    ? (icon as ServiceIconName)
    : fallback;
}

function asProcessIcon(icon: string, fallback: ProcessStepIconName): ProcessStepIconName {
  return PROCESS_ICONS.includes(icon as ProcessStepIconName)
    ? (icon as ProcessStepIconName)
    : fallback;
}

function mapService(service: SanityServiceDocument): Service {
  const slug = service.slug || slugify(service.title);

  return {
    id: slug,
    slug,
    title: service.title || "",
    description: service.description || "",
    icon: asServiceIcon(service.icon, "graduation-cap"),
    ctaLabel: service.cta?.label || "",
    href: `/services/${slug}`,
  };
}

function mapServiceDetail(service: SanityServiceDocument): ServiceDetail {
  const slug = service.slug || slugify(service.title);

  return {
    slug,
    description: service.description || "",
    benefits: service.benefits?.length ? service.benefits : [],
    timeline: service.timeline || "",
    cta: mapCtaLink(service.cta),
  };
}

function mapProcessStep(step: SanityProcessStepDocument, index: number): ProcessStep {
  return {
    id: slugify(step.title) || `step-${step.step ?? index + 1}`,
    step: step.step ?? index + 1,
    title: step.title || "",
    description: step.description || "",
    icon: asProcessIcon(step.icon, "message-circle"),
  };
}

export function mapServicesPage(
  document: SanityServicesDocument | null | undefined,
): ServicesPageData {
  if (!document) {
    throw new Error("Missing Sanity document");
  }

  const allServices = document.allServices?.map((service) => mapService(service)) ?? [];

  const detailServices = document.serviceDetails?.services?.length
    ? document.serviceDetails.services.map((service) => mapService(service))
    : allServices;

  const details = detailServices.map((service, index) => {
    const source =
      document.serviceDetails?.services?.[index] ??
      document.allServices?.find((item) => item.slug === service.slug);

    return mapServiceDetail(
      source ?? {
        _id: service.id,
        title: service.title,
        slug: service.slug,
        description: service.description,
        icon: service.icon,
      },
    );
  });

  return {
    hero: {
      badge: document.hero?.badge || "",
      heading: document.hero?.heading || "",
      description: document.hero?.description || "",
      cta: mapCtaLink(document.hero?.cta),
      image: resolveSanityImage(document.hero?.image, { src: "", alt: "" }),
    },
    overview: mapSectionHeader(document.overview),
    serviceDetails: {
      ...mapSectionHeader(document.serviceDetails?.header),
      details,
    },
    processOverview: mapSectionHeader(document.processOverview),
    faqPreview: {
      ...mapSectionHeader(document.faqPreview?.header),
      items: mapFaqItems(document.faqPreview?.items),
      viewAllLabel: document.faqPreview?.viewAll?.label || "",
      viewAllHref: document.faqPreview?.viewAll?.href || "",
    },
    cta: mapCtaBanner(document.cta),
    services: allServices,
    processSteps:
      document.processSteps?.map((step, index) => mapProcessStep(step, index)) ?? [],
    seo: document.seo,
  };
}
