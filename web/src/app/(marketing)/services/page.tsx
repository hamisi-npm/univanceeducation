import {
  FaqPreview,
  ProcessOverview,
  ServiceDetails,
  ServicesCta,
  ServicesHero,
  ServicesOverview,
} from "@/features/services-page";
import { PageJsonLd } from "@/components/seo/page-json-ld";
import { createCmsPageMetadata } from "@/lib/metadata";
import { getServicesPage } from "@/services/services";

export async function generateMetadata() {
  const services = await getServicesPage();
  return createCmsPageMetadata("/services", services.seo);
}

export default async function ServicesPage() {
  const services = await getServicesPage();

  return (
    <main id="main-content">
      <PageJsonLd path="/services" />
      <ServicesHero content={services.hero} />
      <ServicesOverview section={services.overview} services={services.services} />
      <ServiceDetails section={services.serviceDetails} services={services.services} />
      <ProcessOverview section={services.processOverview} steps={services.processSteps} />
      <FaqPreview content={services.faqPreview} />
      <ServicesCta content={services.cta} />
    </main>
  );
}
