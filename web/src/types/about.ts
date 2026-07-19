import type { AboutPageContent } from "@/features/about/types";
import type { CmsSeo } from "@/types/cms-seo";

export type AboutPageData = AboutPageContent & {
  seo?: CmsSeo;
};
