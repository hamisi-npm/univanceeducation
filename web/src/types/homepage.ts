import type { WhyChooseUsContent, WhyChooseUsFeature } from "@/features/about/types";
import type { CtaSectionContent } from "@/features/cta/types";
import type { Destination, FeaturedDestinationsContent } from "@/features/destinations/types";
import type {
  HeroContentData,
  HeroTrustStat,
  ProgramFinderContent,
} from "@/features/home/types";
import type { Service, ServicesSectionContent } from "@/features/services/types";
import type { CmsSeo } from "@/types/cms-seo";

export type HomepageWhyChooseUsContent = WhyChooseUsContent & {
  cta: {
    label: string;
    href: string;
    external?: boolean;
  };
  features: WhyChooseUsFeature[];
};

export type HomepageContent = {
  hero: HeroContentData;
  trustStats: HeroTrustStat[];
  programFinder: ProgramFinderContent;
  servicesPreview: {
    section: ServicesSectionContent;
    services: Service[];
  };
  featuredDestinations: {
    section: FeaturedDestinationsContent;
    destinations: Destination[];
  };
  whyChooseUs: HomepageWhyChooseUsContent;
  cta: CtaSectionContent;
  seo?: CmsSeo;
};
