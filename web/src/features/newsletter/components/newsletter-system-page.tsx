import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import type { NewsletterSystemPageContent } from "@/types/system";
import { cardStyles, sectionStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

type NewsletterSystemPageProps = {
  content: NewsletterSystemPageContent;
};

export function NewsletterSystemPageView({ content }: NewsletterSystemPageProps) {
  return (
    <section className={cn(sectionStyles.sectionBackground, sectionStyles.padding)}>
      <Container>
        <div
          className={cn(
            cardStyles.base,
            "mx-auto grid max-w-3xl gap-8 p-6 sm:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:p-10",
          )}
        >
          <div className="space-y-5 text-center lg:text-left">
            {content.badge ? (
              <span
                className={cn(
                  sectionStyles.badge,
                  sectionStyles.badgeOnBackground,
                  "mx-auto lg:mx-0",
                )}
              >
                {content.badge}
              </span>
            ) : null}

            <div className="space-y-3">
              <h1 className="text-balance text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
                {content.heading}
              </h1>
              <p className="text-pretty text-base leading-relaxed text-muted-foreground">
                {content.description}
              </p>
            </div>

            {content.bodyParagraphs.length > 0 ? (
              <div className="space-y-3 text-pretty text-sm leading-relaxed text-muted-foreground">
                {content.bodyParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            ) : null}

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Button asChild className="h-10">
                <Link
                  href={content.primaryCta.href}
                  {...(content.primaryCta.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {content.primaryCta.label}
                </Link>
              </Button>
              {content.secondaryCta ? (
                <Button asChild variant="outline" className="h-10">
                  <Link
                    href={content.secondaryCta.href}
                    {...(content.secondaryCta.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {content.secondaryCta.label}
                  </Link>
                </Button>
              ) : null}
            </div>
          </div>

          {content.illustration ? (
            <div className="relative mx-auto aspect-[4/3] w-full max-w-sm overflow-hidden rounded-xl bg-muted">
              <Image
                src={content.illustration.src}
                alt={content.illustration.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 80vw, 320px"
              />
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
