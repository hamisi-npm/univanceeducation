import { CtaSection } from "@/features/cta";
import { FeaturedDestinations } from "@/features/destinations";
import { Hero, WhyChooseUsHome } from "@/features/home";
import { ServiceSection } from "@/features/services";
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
      <Hero
        content={homepage.hero}
        trustStats={homepage.trustStats}
        programFinder={homepage.programFinder}
        site={site}
      />
      <ServiceSection
        section={homepage.servicesPreview.section}
        services={homepage.servicesPreview.services}
        layout="row"
      />
      <FeaturedDestinations
        section={homepage.featuredDestinations.section}
        destinations={homepage.featuredDestinations.destinations}
      />
      <WhyChooseUsHome content={homepage.whyChooseUs} />
      <CtaSection
        content={homepage.cta}
        variant="banner"
        headingId="homepage-mid-cta-heading"
      />
    </main>
  );
}
