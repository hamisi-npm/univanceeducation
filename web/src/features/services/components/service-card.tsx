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
  align?: "start" | "center";
};

export function ServiceCard({
  service,
  className,
  align = "start",
}: ServiceCardProps) {
  const Icon = serviceIcons[service.icon];
  const centered = align === "center";

  return (
    <article
      className={cn(
        cardStyles.elevated,
        cardStyles.interactive,
        centered ? "p-5 sm:p-6" : cardStyles.padding,
        "group relative flex h-full flex-col",
        className,
      )}
    >
      <Link
        href={service.href}
        className={cn(
          "flex h-full flex-col gap-3",
          cardStyles.linkFocus,
          centered && "items-center text-center",
        )}
      >
        <div
          className={cn(
            cardStyles.iconBox,
            centered && cardStyles.iconCircle,
          )}
        >
          <Icon
            className={cn(
              "size-5",
              centered ? "text-brand-gold" : cardStyles.icon,
            )}
            aria-hidden="true"
          />
        </div>

        <div
          className={cn(
            "flex flex-1 flex-col gap-2",
            centered && "items-center",
          )}
        >
          <h3
            className={cn(
              cardStyles.title,
              centered && "text-base",
            )}
          >
            {service.title}
          </h3>
          <p
            className={cn(
              cardStyles.body,
              centered && "line-clamp-3 text-xs sm:text-sm",
            )}
          >
            {service.description}
          </p>
        </div>

        <span
          className={cn(
            cardStyles.textLink,
            centered && "justify-center",
          )}
        >
          {service.ctaLabel}
          <ArrowRight className="size-4" aria-hidden="true" />
        </span>
      </Link>
    </article>
  );
}
