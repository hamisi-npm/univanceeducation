import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Container } from "@/components/layout/container";
import type { NewsletterContent } from "@/features/blog/types";
import { cardStyles, sectionStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

type NewsletterProps = {
  content: NewsletterContent;
  className?: string;
};

export function Newsletter({ content, className }: NewsletterProps) {

  return (
    <section
      aria-labelledby="blog-newsletter-heading"
      className={cn(sectionStyles.sectionBackground, sectionStyles.padding, className)}
    >
      <Container>
        <div
          className={cn(
            cardStyles.base,
            "mx-auto max-w-3xl p-6 sm:p-8 lg:p-10",
          )}
        >
          <div className="flex flex-col gap-6 text-center sm:gap-8">
            <div className="mx-auto max-w-xl space-y-4">
              <span
                className={cn(
                  sectionStyles.badge,
                  sectionStyles.badgeOnBackground,
                  "mx-auto",
                )}
              >
                {content.badge}
              </span>
              <h2
                id="blog-newsletter-heading"
                className="text-balance text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
              >
                {content.heading}
              </h2>
              <p className="text-pretty text-base leading-relaxed text-muted-foreground">
                {content.description}
              </p>
            </div>

            <form className="mx-auto w-full max-w-md" noValidate>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex-1">
                  <label htmlFor="blog-newsletter-email" className="sr-only">
                    {content.emailLabel}
                  </label>
                  <Input
                    id="blog-newsletter-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder={content.emailPlaceholder}
                    className="h-10 bg-background sm:h-9"
                  />
                </div>
                <Button
                  type="button"
                  className="h-10 w-full shrink-0 sm:h-9 sm:w-auto"
                >
                  {content.submitLabel}
                </Button>
              </div>
              <p className="mt-3 text-pretty text-xs leading-relaxed text-muted-foreground">
                {content.privacyNote}
              </p>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
