import { notFound } from "next/navigation";

import { DetailJsonLd } from "@/components/seo/detail-json-ld";
import { UniversityDetailView } from "@/features/universities/components/university-detail-view";
import { createMetadata } from "@/lib/metadata";
import { getProgramsByUniversity } from "@/services/programs";
import { getSiteConfig } from "@/services/site";
import {
  getUniversityBySlug,
  getUniversitySlugs,
} from "@/services/universities";

type UniversityPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getUniversitySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: UniversityPageProps) {
  const { slug } = await params;
  const university = await getUniversityBySlug(slug);

  if (!university) {
    return {};
  }

  const site = await getSiteConfig();

  return createMetadata(
    {
      title: university.seo?.title ?? university.name,
      description: university.seo?.description ?? university.description,
      path: `/universities/${slug}`,
    },
    site,
  );
}

export default async function UniversityPage({ params }: UniversityPageProps) {
  const { slug } = await params;
  const university = await getUniversityBySlug(slug);

  if (!university) {
    notFound();
  }

  const programs = await getProgramsByUniversity(university.slug, 6);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Universities", path: "/universities" },
    { name: university.name, path: `/universities/${slug}` },
  ];

  return (
    <main id="main-content">
      <DetailJsonLd breadcrumbs={breadcrumbs} />
      <UniversityDetailView university={university} programs={programs} />
    </main>
  );
}
