import {
  Award,
  BadgeCheck,
  Globe,
  ListChecks,
  MessageCircle,
  Stamp,
  type LucideIcon,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import type { WhyChooseUsContent } from "@/features/about/types";
import type { WhyChooseUsIconName } from "@/features/about/types";
import { cardStyles, sectionStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

const featureIcons: Record<WhyChooseUsIconName, LucideIcon> = {
  "badge-check": BadgeCheck,
  globe: Globe,
  stamp: Stamp,
  award: Award,
  "message-circle": MessageCircle,
  "list-checks": ListChecks,
};

type WhyChooseUsProps = {
  content: WhyChooseUsContent;
  className?: string;
};

export function WhyChooseUs({ content, className }: WhyChooseUsProps) {

  return (
    <section
      aria-labelledby="why-choose-us-heading"
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
            <h2 id="why-choose-us-heading" className={sectionStyles.heading}>
              {content.heading}
            </h2>
            <p className={sectionStyles.description}>{content.description}</p>
          </div>

          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {content.features.map((feature) => {
              const Icon = featureIcons[feature.icon];

              return (
                <li key={feature.id} className="h-full">
                  <article
                    className={cn(
                      cardStyles.base,
                      cardStyles.interactive,
                      cardStyles.padding,
                      "flex h-full flex-col gap-4",
                    )}
                  >
                    <div className={cardStyles.iconBox}>
                      <Icon className={cn(cardStyles.icon, "size-5")} aria-hidden="true" />
                    </div>
                    <div className="space-y-2">
                      <h3 className={cardStyles.title}>{feature.title}</h3>
                      <p className={cardStyles.body}>{feature.description}</p>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
