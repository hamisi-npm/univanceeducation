import type { TrustStat } from "@/types/trust-stats";
import { TrustStatsGrid } from "@/components/shared/trust-stats-grid";

type TrustBadgesProps = {
  stats: TrustStat[];
  className?: string;
};

export function TrustBadges({ stats, className }: TrustBadgesProps) {
  return (
    <TrustStatsGrid stats={stats} variant="inline" className={className} />
  );
}
