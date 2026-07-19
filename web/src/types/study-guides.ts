import type { StudyGuidesPageContent, StudyGuide } from "@/features/study-guides/types";
import type { CmsSeo } from "@/types/cms-seo";

export type StudyGuidesPageData = StudyGuidesPageContent & {
  guides: StudyGuide[];
  seo?: CmsSeo;
};

export type { StudyGuideDetail } from "@/mappers/study-guide";
