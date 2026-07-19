import Image from "next/image";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import type { OfficeLocationContent } from "@/features/contact/types";
import { buttonStyles, sectionStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

type OfficeLocationProps = {
  content: OfficeLocationContent;
  className?: string;
};

export function OfficeLocation({ content, className }: OfficeLocationProps) {

  return (
    <section
      aria-labelledby="office-location-heading"
      className={cn(sectionStyles.sectionMuted, sectionStyles.padding, className)}
    >
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className={sectionStyles.header}>
            <span
              className={cn(
                sectionStyles.badge,
                sectionStyles.badgeOnMuted,
              )}
            >
              {content.badge}
            </span>
            <h2 id="office-location-heading" className={sectionStyles.heading}>
              {content.heading}
            </h2>
            <p className={sectionStyles.description}>{content.description}</p>
            <address className="mt-4 whitespace-pre-line text-base not-italic leading-relaxed text-foreground">
              {content.address}
            </address>
            <Button
              asChild
              variant="outline"
              className={cn("mt-6", buttonStyles.responsiveOutline)}
            >
              <a href={content.mapsHref} target="_blank" rel="noopener noreferrer">
                {content.openInMapsLabel}
              </a>
            </Button>
          </div>

          <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-border/80 bg-muted shadow-sm ring-1 ring-border/40">
            <Image
              src={content.mapImage.src}
              alt={content.mapImage.alt}
              fill
              quality={80}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
