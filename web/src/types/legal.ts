import type { LegalPageContent } from "@/features/legal/types";
import type { CmsSeo } from "@/types/cms-seo";

export type LegalPageData = LegalPageContent & {
  seo?: CmsSeo;
};
