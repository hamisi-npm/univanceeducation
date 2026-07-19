import type { ReactNode } from "react";

import { MarketingShell } from "@/components/layout/marketing-shell";
import { getGlobalLayoutData } from "@/services/site";

/** Content is CMS-driven; always fetch at request time. */
export const dynamic = "force-dynamic";

type MarketingLayoutProps = {
  children: ReactNode;
};

export default async function MarketingLayout({ children }: MarketingLayoutProps) {
  const global = await getGlobalLayoutData();

  return <MarketingShell global={global}>{children}</MarketingShell>;
}
