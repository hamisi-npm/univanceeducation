import Link from "next/link";
import {
  Award,
  FileText,
  GraduationCap,
  Home,
  Luggage,
  Stamp,
  type LucideIcon,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import type { Service } from "@/features/services/types";
import type { ServiceDetailsContent } from "@/features/services-page/types";
import type { ServiceIconName } from "@/features/services/types";
import { buttonStyles, cardStyles, sectionStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

const serviceIcons: Record<ServiceIconName, LucideIcon> = {
  "graduation-cap": GraduationCap,
  "file-text": FileText,
  award: Award,
  stamp: Stamp,
  home: Home,
  luggage: Luggage,
};

type ServiceDetailsProps = {
  section: ServiceDetailsContent;
  services: Service[];
  className?: string;
};

export function ServiceDetails({ section, services, className }: ServiceDetailsProps) {

  return (
    <section
      aria-labelledby="service-details-heading"
      className={cn(sectionStyles.sectionBackground, sectionStyles.padding, className)}
    >
      <Container>
        <div className={sectionStyles.stack}>
          <div className={sectionStyles.header}>
            <span
              className={cn(
                sectionStyles.badge,
                sectionStyles.badgeOnBackground,
              )}
            >
              {section.badge}
            </span>
            <h2 id="service-details-heading" className={sectionStyles.heading}>
              {section.heading}
            </h2>
            <p className={sectionStyles.description}>{section.description}</p>
          </div>

          <div className="flex flex-col gap-8">
            {services.map((service) => {
              const detail = section.details.find(
                (item) => item.slug === service.slug,
              );

              if (!detail) {
                return null;
              }

              const Icon = serviceIcons[service.icon];

              return (
                <article
                  key={service.id}
                  id={service.slug}
                  className={cn(
                    cardStyles.base,
                    cardStyles.padding,
                    "scroll-mt-24",
                  )}
                >
                  <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
                    <div className="flex shrink-0 items-start gap-4 lg:w-64">
                      <div className={cardStyles.iconBox}>
                        <Icon className={cn(cardStyles.icon, "size-5")} aria-hidden="true" />
                      </div>
                      <h3 className="text-xl font-medium tracking-tight text-foreground">
                        {service.title}
                      </h3>
                    </div>

                    <div className="flex flex-1 flex-col gap-6">
                      <p className="text-pretty text-base leading-relaxed text-muted-foreground">
                        {detail.description}
                      </p>

                      <div className="space-y-3">
                        <h4 className="text-sm font-medium text-foreground">
                          Key benefits
                        </h4>
                        <ul className="grid gap-2 sm:grid-cols-2">
                          {detail.benefits.map((benefit) => (
                            <li
                              key={benefit}
                              className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
                            >
                              <span
                                className="mt-2 size-1 shrink-0 rounded-full bg-primary"
                                aria-hidden="true"
                              />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-col gap-4 border-t border-border/80 pt-6 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">
                            Typical timeline:{" "}
                          </span>
                          {detail.timeline}
                        </p>
                        <Button
                          asChild
                          variant="outline"
                          className={buttonStyles.responsiveOutline}
                        >
                          <Link href={detail.cta.href}>{detail.cta.label}</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
