import {
  LegalHero,
  LegalLayout,
  PolicySection,
} from "@/features/legal";
import { PageJsonLd } from "@/components/seo/page-json-ld";
import { createCmsPageMetadata } from "@/lib/metadata";
import { getTermsPage } from "@/services/legal";

export async function generateMetadata() {
  const content = await getTermsPage();
  return createCmsPageMetadata("/terms", content.seo);
}

export default async function TermsPage() {
  const content = await getTermsPage();

  return (
    <main id="main-content">
      <PageJsonLd path="/terms" />
      <LegalHero content={content.hero} />
      <LegalLayout>
        {content.sections.map((section) => (
          <PolicySection key={section.id} section={section} />
        ))}
      </LegalLayout>
    </main>
  );
}
