import { PageJsonLd } from "@/components/seo/page-json-ld";
import { FaqsCategories, FaqsCta, FaqsHero } from "@/features/faqs";
import { createPageMetadata } from "@/lib/metadata";
import { getFaqPage } from "@/services/faqs";

export async function generateMetadata() {
  return createPageMetadata("/faqs");
}

export default async function FaqsPage() {
  const faqs = await getFaqPage();

  return (
    <main id="main-content">
      <PageJsonLd path="/faqs" />
      <FaqsHero content={faqs.hero} />
      <FaqsCategories categories={faqs.categories} />
      <FaqsCta content={faqs.cta} />
    </main>
  );
}
