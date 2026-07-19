import type { CtaSectionContent } from "@/features/cta/types";
import type { Destination, FeaturedDestinationsContent } from "@/features/destinations/types";
import type { HeroContentData, HeroTrustStat } from "@/features/home/types";
import type { ProcessSectionContent, ProcessStep } from "@/features/process/types";
import type { Service, ServicesSectionContent } from "@/features/services/types";
import type { Testimonial, TestimonialsSectionContent } from "@/features/testimonials/types";
import type { CmsSeo } from "@/types/cms-seo";

export type HomepageContent = {
  hero: HeroContentData;
  trustStats: HeroTrustStat[];
  trustedUniversities: {
    heading: string;
    partners: string[];
  };
  servicesPreview: {
    section: ServicesSectionContent;
    services: Service[];
  };
  featuredDestinations: {
    section: FeaturedDestinationsContent;
    destinations: Destination[];
  };
  processPreview: {
    section: ProcessSectionContent;
    steps: ProcessStep[];
  };
  testimonialsPreview: {
    section: TestimonialsSectionContent;
    testimonials: Testimonial[];
  };
  cta: CtaSectionContent;
  seo?: CmsSeo;
};
