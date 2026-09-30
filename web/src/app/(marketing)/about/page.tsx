import {
  AboutCta,
  AboutHero,
  CompanyStory,
  MissionVision,
  WhyChooseUs,
} from "@/features/about";
import { PageJsonLd } from "@/components/seo/page-json-ld";
import { createCmsPageMetadata } from "@/lib/metadata";
import { getAboutPage } from "@/services/about";

export async function generateMetadata() {
  const about = await getAboutPage();
  return createCmsPageMetadata("/about", about.seo);
}

export default async function AboutPage() {
  const about = await getAboutPage();

  return (
    <main id="main-content">
      <PageJsonLd path="/about" />
      <AboutHero content={about.hero} />
      <CompanyStory content={about.companyStory} />
      <MissionVision content={about.missionVision} />
      <WhyChooseUs content={about.whyChooseUs} />
      <AboutCta content={about.cta} />
    </main>
  );
}
