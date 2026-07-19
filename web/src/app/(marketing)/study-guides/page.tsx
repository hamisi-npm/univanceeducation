import {
  GuidesGrid,
  StudyGuidesCta,
  StudyGuidesHero,
} from "@/features/study-guides";
import { PageJsonLd } from "@/components/seo/page-json-ld";
import { createCmsPageMetadata } from "@/lib/metadata";
import { getStudyGuidesPage } from "@/services/study-guides";

export async function generateMetadata() {
  const page = await getStudyGuidesPage();
  return createCmsPageMetadata("/study-guides", page.seo);
}

export default async function StudyGuidesPage() {
  const page = await getStudyGuidesPage();

  return (
    <main id="main-content">
      <PageJsonLd path="/study-guides" />
      <StudyGuidesHero content={page.hero} />
      <GuidesGrid page={page} />
      <StudyGuidesCta content={page.cta} />
    </main>
  );
}
