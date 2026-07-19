import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import type { BlogHeroContent } from "@/features/blog/types";
import { buttonStyles, sectionStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

type BlogHeroProps = {
  content: BlogHeroContent;
  className?: string;
};

export function BlogHero({ content, className }: BlogHeroProps) {

  return (
    <section
      aria-labelledby="blog-hero-heading"
      className={cn(
        "relative -mt-14 overflow-hidden bg-background pt-14",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_-20%,var(--muted)_0%,transparent_60%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-background"
        aria-hidden="true"
      />

      <Container className="relative py-16 sm:py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-8">
            <div className={sectionStyles.header}>
              <span
                className={cn(
                  sectionStyles.badge,
                  sectionStyles.badgeOnBackground,
                )}
              >
                {content.badge}
              </span>
              <h1
                id="blog-hero-heading"
                className="text-balance text-3xl font-medium tracking-tight text-foreground sm:text-4xl lg:text-5xl"
              >
                {content.heading}
              </h1>
              <p className={sectionStyles.description}>{content.description}</p>
            </div>

            <Button asChild size="lg" className={buttonStyles.responsiveLg}>
              <Link href={content.cta.href}>{content.cta.label}</Link>
            </Button>
          </div>

          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div
              className="pointer-events-none absolute -inset-10 -z-10 bg-[radial-gradient(ellipse_at_center,var(--muted)_0%,transparent_72%)] opacity-80"
              aria-hidden="true"
            />
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border/80 bg-muted shadow-sm ring-1 ring-border/40 sm:aspect-[5/4] lg:aspect-[4/3]">
              <Image
                src={content.image.src}
                alt={content.image.alt}
                fill
                priority
                quality={85}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/10 via-transparent to-transparent"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
