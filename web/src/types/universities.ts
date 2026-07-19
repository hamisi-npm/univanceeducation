import type { CountryOption, SectionHeaderContent, UniversitiesPageContent, University } from "@/features/universities/types";
import type { UniversityDetail } from "@/mappers/university";
import type { CmsSeo } from "@/types/cms-seo";

export type UniversitiesPageData = Omit<
  UniversitiesPageContent,
  "featuredUniversities"
> & {
  featuredUniversities: SectionHeaderContent;
  featuredUniversityList: University[];
  allUniversities: University[];
  countryOptions: CountryOption[];
  seo?: CmsSeo;
};

export type { UniversityDetail };
