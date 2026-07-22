import { ServiceCard } from "@/features/services/components/service-card";
import type { Service } from "@/features/services/types";
import { cn } from "@/lib/utils";

type ServiceGridProps = {
  services: Service[];
  className?: string;
  /** `row` = six-across homepage layout; `grid` = default 3-col listing. */
  layout?: "grid" | "row";
};

export function ServiceGrid({
  services,
  className,
  layout = "grid",
}: ServiceGridProps) {
  const isRow = layout === "row";

  return (
    <ul
      className={cn(
        isRow
          ? "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 xl:gap-5"
          : "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {services.map((service) => (
        <li key={service.id} className="h-full">
          <ServiceCard
            service={service}
            align={isRow ? "center" : "start"}
          />
        </li>
      ))}
    </ul>
  );
}
