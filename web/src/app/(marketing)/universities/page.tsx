import {
  AdmissionOverview,
  FeaturedUniversities,
  PopularPrograms,
  UniversitiesCta,
  UniversitiesHero,
  UniversityGrid,
} from "@/features/universities";
import { PageJsonLd } from "@/components/seo/page-json-ld";
import { createCmsPageMetadata } from "@/lib/metadata";
import { getUniversitiesPage } from "@/services/universities";

export async function generateMetadata() {
  const universities = await getUniversitiesPage();
  return createCmsPageMetadata("/universities", universities.seo);
}

export default async function UniversitiesPage() {
  const universities = await getUniversitiesPage();

  return (
    <main id="main-content">
      <PageJsonLd path="/universities" />
      <UniversitiesHero content={universities.hero} />
      <FeaturedUniversities
        section={universities.featuredUniversities}
        universities={universities.featuredUniversityList}
      />
      <UniversityGrid
        section={universities.browseByCountry}
        universities={universities.allUniversities}
        countryOptions={universities.countryOptions}
      />
      <PopularPrograms content={universities.popularPrograms} />
      <AdmissionOverview content={universities.admissionOverview} />
      <UniversitiesCta content={universities.cta} />
    </main>
  );
}
