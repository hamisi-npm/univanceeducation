import type { ContactPageContent } from "@/features/contact/types";
import type { CmsSeo } from "@/types/cms-seo";

export type ContactPageData = ContactPageContent & {
  seo?: CmsSeo;
};
