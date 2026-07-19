import { MarketingShell } from "@/components/layout/marketing-shell";
import { PageLoadingSkeleton } from "@/components/shared/page-loading-skeleton";

export default function Loading() {
  return (
    <MarketingShell>
      <PageLoadingSkeleton />
    </MarketingShell>
  );
}
