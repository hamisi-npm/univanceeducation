import { notFound } from "next/navigation";

import { DetailJsonLd } from "@/components/seo/detail-json-ld";
import { StudyGuideDetailView } from "@/features/study-guides/components/study-guide-detail-view";
import { createMetadata } from "@/lib/metadata";
import { getStudyGuideBySlug, getStudyGuideSlugs } from "@/services/study-guides";
import { getSiteConfig } from "@/services/site";

type StudyGuidePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getStudyGuideSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: StudyGuidePageProps) {
  const { slug } = await params;
  const guide = await getStudyGuideBySlug(slug);

  if (!guide) {
    return {};
  }

  const site = await getSiteConfig();

  return createMetadata(
    {
      title: guide.seo?.title ?? guide.title,
      description: guide.seo?.description ?? guide.description,
      path: `/study-guides/${slug}`,
    },
    site,
  );
}

export default async function StudyGuidePage({ params }: StudyGuidePageProps) {
  const { slug } = await params;
  const guide = await getStudyGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Study Guides", path: "/study-guides" },
    { name: guide.title, path: `/study-guides/${slug}` },
  ];

  return (
    <main id="main-content">
      <DetailJsonLd breadcrumbs={breadcrumbs} />
      <StudyGuideDetailView guide={guide} />
    </main>
  );
}
