import {
  AdmissionRequirements,
  CostComparison,
  CountryGrid,
  DestinationsCta,
  DestinationsHero,
  FaqPreview,
  FeaturedCountries,
  PopularCourses,
} from "@/features/destinations-page";
import { PageJsonLd } from "@/components/seo/page-json-ld";
import { createCmsPageMetadata } from "@/lib/metadata";
import { getDestinationsPage } from "@/services/destinations";

export async function generateMetadata() {
  const destinations = await getDestinationsPage();
  return createCmsPageMetadata("/destinations", destinations.seo);
}

export default async function DestinationsPage() {
  const destinations = await getDestinationsPage();

  return (
    <main id="main-content">
      <PageJsonLd path="/destinations" />
      <DestinationsHero content={destinations.hero} />
      <FeaturedCountries
        section={destinations.featuredCountries}
        destinations={destinations.featuredDestinations}
      />
      <CountryGrid
        section={destinations.countryGrid}
        destinations={destinations.gridDestinations}
      />
      <CostComparison content={destinations.costComparison} />
      <PopularCourses content={destinations.popularCourses} />
      <AdmissionRequirements content={destinations.admissionRequirements} />
      <FaqPreview content={destinations.faqPreview} />
      <DestinationsCta content={destinations.cta} />
    </main>
  );
}
