import Link from "next/link";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Globe,
  ListChecks,
  MessageCircle,
  Stamp,
  type LucideIcon,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import type { WhyChooseUsIconName } from "@/features/about/types";
import type { HomepageWhyChooseUsContent } from "@/types/homepage";
import { buttonStyles, cardStyles, sectionStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

const featureIcons: Record<WhyChooseUsIconName, LucideIcon> = {
  "badge-check": BadgeCheck,
  globe: Globe,
  stamp: Stamp,
  award: Award,
  "message-circle": MessageCircle,
  "list-checks": ListChecks,
};

type WhyChooseUsHomeProps = {
  content: HomepageWhyChooseUsContent;
  className?: string;
};

export function WhyChooseUsHome({ content, className }: WhyChooseUsHomeProps) {
  return (
    <section
      aria-labelledby="why-choose-us-heading"
      className={cn(sectionStyles.sectionBeige, sectionStyles.padding, className)}
    >
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-6">
            <span className={sectionStyles.badgeGold}>{content.badge}</span>
            <h2
              id="why-choose-us-heading"
              className={sectionStyles.heading}
            >
              {content.heading}
            </h2>
            <p className={sectionStyles.description}>{content.description}</p>
            <Button
              asChild
              size="lg"
              className={cn(
                buttonStyles.gold,
                "h-11 gap-2 px-6 text-sm font-semibold",
              )}
            >
              <Link href={content.cta.href}>
                {content.cta.label}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>

          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {content.features.map((feature) => {
              const Icon = featureIcons[feature.icon];

              return (
                <li key={feature.id}>
                  <article className="flex flex-col gap-3">
                    <div className={cardStyles.iconCircle}>
                      <Icon className="size-5" aria-hidden="true" />
                    </div>
                    <div className="space-y-1.5">
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
