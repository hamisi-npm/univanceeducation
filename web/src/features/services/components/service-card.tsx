import Link from "next/link";
import {
  ArrowRight,
  Award,
  FileText,
  GraduationCap,
  Home,
  Luggage,
  Stamp,
  type LucideIcon,
} from "lucide-react";

import type { Service, ServiceIconName } from "@/features/services/types";
import { cardStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

const serviceIcons: Record<ServiceIconName, LucideIcon> = {
  "graduation-cap": GraduationCap,
  "file-text": FileText,
  award: Award,
  stamp: Stamp,
  home: Home,
  luggage: Luggage,
};

type ServiceCardProps = {
  service: Service;
  className?: string;
};

export function ServiceCard({ service, className }: ServiceCardProps) {
  const Icon = serviceIcons[service.icon];

  return (
    <article
      className={cn(
        cardStyles.base,
        cardStyles.interactive,
        cardStyles.padding,
        "group relative flex h-full flex-col",
        className,
      )}
    >
      <Link
        href={service.href}
        className={cn("flex h-full flex-col gap-4", cardStyles.linkFocus)}
      >
        <div className={cardStyles.iconBox}>
          <Icon className={cn(cardStyles.icon, "size-5")} aria-hidden="true" />
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <h3 className={cardStyles.title}>{service.title}</h3>
          <p className={cardStyles.body}>{service.description}</p>
        </div>

        <span className={cardStyles.textLink}>
          {service.ctaLabel}
          <ArrowRight className="size-4" aria-hidden="true" />
        </span>
      </Link>
    </article>
  );
}
