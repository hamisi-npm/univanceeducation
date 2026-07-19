import type { SectionHeaderContent } from "@/features/destinations-page/types";
import type { DestinationsPageContent } from "@/features/destinations-page/types";
import type { Destination } from "@/features/destinations/types";
import type { DestinationDetail } from "@/mappers/destination";
import type { CmsSeo } from "@/types/cms-seo";

export type DestinationsPageData = Omit<
  DestinationsPageContent,
  "featuredCountries" | "countryGrid"
> & {
  featuredCountries: SectionHeaderContent;
  countryGrid: SectionHeaderContent;
  featuredDestinations: Destination[];
  gridDestinations: Destination[];
  seo?: CmsSeo;
};

export type { DestinationDetail };
