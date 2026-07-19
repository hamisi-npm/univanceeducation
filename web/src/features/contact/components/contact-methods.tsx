import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone, type LucideIcon } from "lucide-react";

import { Container } from "@/components/layout/container";
import type { ContactMethodIcon, ContactMethodsContent } from "@/features/contact/types";
import { cardStyles, focusRing, linkTransition, sectionStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

const methodIcons: Record<ContactMethodIcon, LucideIcon> = {
  phone: Phone,
  mail: Mail,
  "message-circle": MessageCircle,
  "map-pin": MapPin,
};

type ContactMethodsProps = {
  content: ContactMethodsContent;
  className?: string;
};

export function ContactMethods({ content, className }: ContactMethodsProps) {

  return (
    <section
      aria-labelledby="contact-methods-heading"
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
            <h2 id="contact-methods-heading" className={sectionStyles.heading}>
              {content.heading}
            </h2>
            <p className={sectionStyles.description}>{content.description}</p>
          </div>

          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {content.methods.map((method) => {
              const Icon = methodIcons[method.icon];

              return (
                <li key={method.id} className="h-full">
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
                      <h3 className={cardStyles.title}>{method.title}</h3>
                      <p className={cardStyles.body}>{method.description}</p>
                    </div>
                    {method.href ? (
                      method.external ? (
                        <a
                          href={method.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            "mt-auto text-sm font-medium text-primary",
                            linkTransition,
                            focusRing,
                            "rounded-sm hover:underline",
                          )}
                        >
                          {method.value}
                        </a>
                      ) : (
                        <Link
                          href={method.href}
                          className={cn(
                            "mt-auto text-sm font-medium text-primary",
                            linkTransition,
                            focusRing,
                            "rounded-sm hover:underline",
                          )}
                        >
                          {method.value}
                        </Link>
                      )
                    ) : (
                      <p className="mt-auto text-sm text-muted-foreground">
                        {method.value}
                      </p>
                    )}
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
