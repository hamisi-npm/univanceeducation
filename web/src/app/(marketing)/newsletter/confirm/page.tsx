import type { Metadata } from "next";

import { NewsletterSystemPageView } from "@/features/newsletter";
import { createCmsPageMetadata } from "@/lib/metadata";
import { resolveNewsletterConfirmationPage } from "@/features/newsletter/services/newsletter-service";

type PageProps = {
  searchParams: Promise<{ token?: string | string[] }>;
};

function readToken(value: string | string[] | undefined): string {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }
  return value ?? "";
}

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const content = await resolveNewsletterConfirmationPage({
    token: readToken(params.token),
  });
  return createCmsPageMetadata("/newsletter/confirm", content.seo);
}

export default async function NewsletterConfirmPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const content = await resolveNewsletterConfirmationPage({
    token: readToken(params.token),
  });

  return (
    <main id="main-content">
      <NewsletterSystemPageView content={content} />
    </main>
  );
}
