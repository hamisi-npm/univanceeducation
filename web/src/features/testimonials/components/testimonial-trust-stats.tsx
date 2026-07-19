import type { TrustStat } from "@/types/trust-stats";
import { TrustStatsGrid } from "@/components/shared/trust-stats-grid";

type TestimonialTrustStatsProps = {
  stats: TrustStat[];
  className?: string;
};

export function TestimonialTrustStats({ stats, className }: TestimonialTrustStatsProps) {
  return (
    <TrustStatsGrid stats={stats} variant="band" className={className} />
  );
}
