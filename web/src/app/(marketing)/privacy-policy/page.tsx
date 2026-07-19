import {
  LegalHero,
  LegalLayout,
  PolicySection,
} from "@/features/legal";
import { PageJsonLd } from "@/components/seo/page-json-ld";
import { createCmsPageMetadata } from "@/lib/metadata";
import { getPrivacyPolicy } from "@/services/legal";

export async function generateMetadata() {
  const content = await getPrivacyPolicy();
  return createCmsPageMetadata("/privacy-policy", content.seo);
}

export default async function PrivacyPolicyPage() {
  const content = await getPrivacyPolicy();

  return (
    <main id="main-content">
      <PageJsonLd path="/privacy-policy" />
      <LegalHero content={content.hero} />
      <LegalLayout>
        {content.sections.map((section) => (
          <PolicySection key={section.id} section={section} />
        ))}
      </LegalLayout>
    </main>
  );
}
