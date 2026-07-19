import { CtaSection } from "@/features/cta";
import { FeaturedDestinations } from "@/features/destinations";
import { Hero, TrustedUniversities } from "@/features/home";
import { ProcessSection } from "@/features/process";
import { ServiceSection } from "@/features/services";
import { TestimonialsSection } from "@/features/testimonials";
import { createCmsPageMetadata } from "@/lib/metadata";
import { getHomepage } from "@/services/homepage";
import { getSiteConfig } from "@/services/site";

export async function generateMetadata() {
  const homepage = await getHomepage();
  return createCmsPageMetadata("/", homepage.seo);
}

export default async function Home() {
  const [homepage, site] = await Promise.all([getHomepage(), getSiteConfig()]);

  return (
    <main id="main-content">
      <Hero content={homepage.hero} trustStats={homepage.trustStats} site={site} />
      <TrustedUniversities
        heading={homepage.trustedUniversities.heading}
        partners={homepage.trustedUniversities.partners}
      />
      <FeaturedDestinations
        section={homepage.featuredDestinations.section}
        destinations={homepage.featuredDestinations.destinations}
      />
      <ServiceSection
        section={homepage.servicesPreview.section}
        services={homepage.servicesPreview.services}
      />
      <ProcessSection
        section={homepage.processPreview.section}
        steps={homepage.processPreview.steps}
      />
      <TestimonialsSection
        section={homepage.testimonialsPreview.section}
        testimonials={homepage.testimonialsPreview.testimonials}
        trustStats={homepage.trustStats}
      />
      <CtaSection content={homepage.cta} />
    </main>
  );
}
