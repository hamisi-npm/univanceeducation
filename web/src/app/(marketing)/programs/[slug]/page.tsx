import { notFound } from "next/navigation";

import { DetailJsonLd } from "@/components/seo/detail-json-ld";
import { JsonLd } from "@/components/seo/json-ld";
import { ProgramDetailView } from "@/features/programs";
import { createMetadata } from "@/lib/metadata";
import { courseJsonLd } from "@/lib/seo/json-ld";
import {
  getProgramBySlug,
  getProgramSlugs,
  getRelatedPrograms,
} from "@/services/programs";
import { getSiteConfig } from "@/services/site";

type ProgramPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getProgramSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProgramPageProps) {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);

  if (!program) {
    return {};
  }

  const site = await getSiteConfig();

  return createMetadata(
    {
      title: program.seo?.title ?? program.title,
      description: program.seo?.description ?? program.shortDescription,
      path: `/programs/${slug}`,
    },
    site,
  );
}

export default async function ProgramPage({ params }: ProgramPageProps) {
  const { slug } = await params;
  const [program, site] = await Promise.all([
    getProgramBySlug(slug),
    getSiteConfig(),
  ]);

  if (!program) {
    notFound();
  }

  const related = await getRelatedPrograms({
    slug: program.slug,
    categorySlug: program.categorySlug,
    universitySlug: program.universitySlug,
    limit: 3,
  });

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Programs", path: "/programs" },
    { name: program.title, path: `/programs/${slug}` },
  ];

  return (
    <main id="main-content">
      <DetailJsonLd breadcrumbs={breadcrumbs} />
      <JsonLd data={courseJsonLd(program, site)} />
      <ProgramDetailView program={program} related={related} />
    </main>
  );
}
