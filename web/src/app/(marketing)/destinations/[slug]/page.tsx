import { notFound } from "next/navigation";

import { DetailJsonLd } from "@/components/seo/detail-json-ld";
import { DestinationDetailView } from "@/features/destinations/components/destination-detail-view";
import { createMetadata } from "@/lib/metadata";
import { getProgramsByDestination } from "@/services/programs";
import { getSiteConfig } from "@/services/site";
import {
  getDestinationBySlug,
  getDestinationSlugs,
} from "@/services/destinations";

type DestinationPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getDestinationSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: DestinationPageProps) {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);

  if (!destination) {
    return {};
  }

  const site = await getSiteConfig();

  return createMetadata(
    {
      title: destination.seo?.title ?? `Study in ${destination.country}`,
      description: destination.seo?.description ?? destination.description,
      path: `/destinations/${slug}`,
    },
    site,
  );
}

export default async function DestinationPage({ params }: DestinationPageProps) {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);

  if (!destination) {
    notFound();
  }

  const programs = await getProgramsByDestination(destination.slug, 6);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Destinations", path: "/destinations" },
    { name: destination.country, path: `/destinations/${slug}` },
  ];

  return (
    <main id="main-content">
      <DetailJsonLd breadcrumbs={breadcrumbs} />
      <DestinationDetailView destination={destination} programs={programs} />
    </main>
  );
}
