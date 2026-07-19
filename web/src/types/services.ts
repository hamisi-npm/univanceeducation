import type { ProcessStep } from "@/features/process/types";
import type { Service } from "@/features/services/types";
import type { ServicesPageContent } from "@/features/services-page/types";
import type { CmsSeo } from "@/types/cms-seo";

export type ServicesPageData = ServicesPageContent & {
  services: Service[];
  processSteps: ProcessStep[];
  seo?: CmsSeo;
};
