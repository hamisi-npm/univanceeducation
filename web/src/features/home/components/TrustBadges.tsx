import { Award, GraduationCap, MapPin } from "lucide-react";

import type { TrustStat } from "@/types/trust-stats";
import { cn } from "@/lib/utils";

type TrustBadgesProps = {
  stats: TrustStat[];
  className?: string;
};

const STAT_ICONS = [GraduationCap, Award, MapPin] as const;

export function TrustBadges({ stats, className }: TrustBadgesProps) {
  return (
    <dl
      className={cn(
        "grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-8",
        className,
      )}
    >
      {stats.map((stat, index) => {
        const Icon = STAT_ICONS[index % STAT_ICONS.length];

        return (
          <div key={stat.label} className="flex items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-navy/20 text-brand-beige">
              <Icon className="size-5 text-brand-beige" aria-hidden="true" />
            </div>
            <div className="min-w-0 space-y-0.5">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="text-lg font-semibold tracking-tight text-white">
                {stat.value} {stat.label}
              </dd>
              {stat.footnote ? (
                <dd className="text-xs text-white/65">{stat.footnote}</dd>
              ) : null}
            </div>
          </div>
        );
      })}
    </dl>
  );
}
