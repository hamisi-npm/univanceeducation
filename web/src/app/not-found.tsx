import type { Metadata } from "next";

import { MarketingShell } from "@/components/layout/marketing-shell";
import { SystemPage } from "@/components/shared/system-page";
import { SystemPageActions } from "@/components/shared/system-page-actions";
import { createMetadata } from "@/lib/metadata";
import { getGlobalLayoutData } from "@/services/site";
import type { GlobalLayoutData } from "@/types/global-layout";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const { site } = await getGlobalLayoutData();
    return createMetadata(
      {
        title: "Page Not Found",
        description:
          "The page you are looking for could not be found. Return home or contact our study abroad counsellors for help.",
        robots: {
          index: false,
          follow: true,
        },
      },
      site,
    );
  } catch {
    return {
      title: "Page Not Found",
      robots: { index: false, follow: true },
    };
  }
}

export default async function NotFound() {
  let global: GlobalLayoutData | undefined;

  try {
    global = await getGlobalLayoutData();
  } catch {
    global = undefined;
  }

  const page = (
    <SystemPage
      badge="404"
      title="Page not found"
      description="The page you requested does not exist or may have been moved. You can return home or get in touch — our counsellors are happy to help."
      headingId="not-found-heading"
      actions={<SystemPageActions />}
    />
  );

  if (!global) {
    return page;
  }

  return <MarketingShell global={global}>{page}</MarketingShell>;
}
