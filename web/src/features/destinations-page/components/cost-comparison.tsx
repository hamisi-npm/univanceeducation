import { Container } from "@/components/layout/container";
import type { CostComparisonContent } from "@/features/destinations-page/types";
import { cardStyles, sectionStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

type CostComparisonProps = {
  content: CostComparisonContent;
  className?: string;
};

export function CostComparison({ content, className }: CostComparisonProps) {
  const { columns, rows, caption } = content;

  return (
    <section
      aria-labelledby="cost-comparison-heading"
      className={cn(sectionStyles.sectionMuted, sectionStyles.padding, className)}
    >
      <Container>
        <div className={sectionStyles.stack}>
          <div className={sectionStyles.header}>
            <span
              className={cn(
                sectionStyles.badge,
                sectionStyles.badgeOnMuted,
              )}
            >
              {content.badge}
            </span>
            <h2 id="cost-comparison-heading" className={sectionStyles.heading}>
              {content.heading}
            </h2>
            <p className={sectionStyles.description}>{content.description}</p>
          </div>

          <div
            className={cn(
              cardStyles.base,
              "overflow-hidden",
            )}
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                <caption className="sr-only">{caption}</caption>
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th
                      scope="col"
                      className="px-4 py-3 font-medium text-foreground sm:px-6"
                    >
                      {columns.country}
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 font-medium text-foreground sm:px-6"
                    >
                      {columns.tuition}
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 font-medium text-foreground sm:px-6"
                    >
                      {columns.livingCosts}
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 font-medium text-foreground sm:px-6"
                    >
                      {columns.duration}
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 font-medium text-foreground sm:px-6"
                    >
                      {columns.workWhileStudying}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr
                      key={row.id}
                      className="border-b border-border/80 last:border-b-0 motion-safe:transition-colors motion-safe:duration-200 motion-safe:hover:bg-muted/30"
                    >
                      <th
                        scope="row"
                        className="px-4 py-4 font-medium text-foreground sm:px-6"
                      >
                        {row.country}
                      </th>
                      <td className="px-4 py-4 font-mono text-xs text-muted-foreground sm:px-6 sm:text-sm">
                        {row.tuition}
                      </td>
                      <td className="px-4 py-4 font-mono text-xs text-muted-foreground sm:px-6 sm:text-sm">
                        {row.livingCosts}
                      </td>
                      <td className="px-4 py-4 text-muted-foreground sm:px-6">
                        {row.duration}
                      </td>
                      <td className="px-4 py-4 text-muted-foreground sm:px-6">
                        {row.workWhileStudying}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="border-t border-border/80 px-4 py-3 text-xs text-muted-foreground sm:px-6">
              {caption}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
