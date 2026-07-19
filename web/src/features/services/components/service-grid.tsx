import { ServiceCard } from "@/features/services/components/service-card";
import type { Service } from "@/features/services/types";
import { cn } from "@/lib/utils";

type ServiceGridProps = {
  services: Service[];
  className?: string;
};

export function ServiceGrid({ services, className }: ServiceGridProps) {
  return (
    <ul
      className={cn(
        "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {services.map((service) => (
        <li key={service.id} className="h-full">
          <ServiceCard service={service} />
        </li>
      ))}
    </ul>
  );
}
