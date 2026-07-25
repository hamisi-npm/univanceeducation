import {
  LegalHero,
  LegalLayout,
  PolicySection,
} from "@/features/legal";
import { PageJsonLd } from "@/components/seo/page-json-ld";
import { createCmsPageMetadata } from "@/lib/metadata";
import { getCookiePolicy } from "@/services/system";

export async function generateMetadata() {
  const content = await getCookiePolicy();
  return createCmsPageMetadata("/cookie-policy", content.seo);
}

export default async function CookiePolicyPage() {
  const content = await getCookiePolicy();

  const sections = [
    {
      id: "introduction",
      heading: content.title,
      paragraphs: content.introductionParagraphs,
    },
    {
      id: "necessary",
      heading: content.necessary.title,
      paragraphs: [content.necessary.description],
      listItems: content.necessary.examples.length
        ? content.necessary.examples
        : undefined,
    },
    {
      id: "functional",
      heading: content.functional.title,
      paragraphs: [content.functional.description],
      listItems: content.functional.examples.length
        ? content.functional.examples
        : undefined,
    },
    {
      id: "analytics",
      heading: content.analytics.title,
      paragraphs: [content.analytics.description],
      listItems: content.analytics.examples.length
        ? content.analytics.examples
        : undefined,
    },
    {
      id: "marketing",
      heading: content.marketing.title,
      paragraphs: [content.marketing.description],
      listItems: content.marketing.examples.length
        ? content.marketing.examples
        : undefined,
    },
    ...(content.retentionSummary
      ? [
          {
            id: "retention",
            heading: "Retention",
            paragraphs: [content.retentionSummary],
          },
        ]
      : []),
    ...(content.thirdPartyServices.length
      ? [
          {
            id: "third-parties",
            heading: "Third-party services",
            paragraphs: content.thirdPartyServices.map((service) =>
              service.privacyUrl
                ? `${service.name}: ${service.purpose} (${service.privacyUrl})`
                : `${service.name}: ${service.purpose}`,
            ),
          },
        ]
      : []),
  ];

  return (
    <main id="main-content">
      <PageJsonLd path="/cookie-policy" />
      <LegalHero
        content={{
          badge: "Legal",
          heading: content.title,
          description: content.retentionSummary || "How we use cookies on this site.",
          lastUpdated: content.lastUpdated,
          lastUpdatedIso: content.lastUpdatedIso,
        }}
      />
      <LegalLayout>
        {sections.map((section) => (
          <PolicySection key={section.id} section={section} />
        ))}
      </LegalLayout>
    </main>
  );
}
