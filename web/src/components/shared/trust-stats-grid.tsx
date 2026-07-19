import type { TrustStat } from "@/types/trust-stats";
import { cn } from "@/lib/utils";

type TrustStatsGridProps = {
  stats: TrustStat[];
  variant?: "inline" | "band";
  className?: string;
};

export function TrustStatsGrid({
  stats,
  variant = "inline",
  className,
}: TrustStatsGridProps) {
  const isBand = variant === "band";

  return (
    <dl
      className={cn(
        isBand
          ? "grid grid-cols-1 gap-6 border-y border-border/80 py-10 sm:grid-cols-3 sm:gap-8"
          : "grid grid-cols-2 gap-6 sm:grid-cols-3",
        className,
      )}
    >
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className={cn(
            "space-y-1",
            !isBand && index === 2 && "col-span-2 sm:col-span-1",
            isBand && "text-center sm:text-left",
          )}
        >
          <dt className="sr-only">{stat.label}</dt>
          <dd
            className={cn(
              "font-mono font-medium tracking-tight text-foreground",
              isBand ? "text-2xl sm:text-3xl" : "text-3xl",
            )}
          >
            {stat.value}
          </dd>
          <dd
            className={cn(
              "text-sm text-muted-foreground",
              isBand && "mt-1",
            )}
            aria-hidden="true"
          >
            {stat.label}
          </dd>
          {stat.footnote ? (
            <dd className="text-xs text-muted-foreground">{stat.footnote}</dd>
          ) : null}
        </div>
      ))}
    </dl>
  );
}
