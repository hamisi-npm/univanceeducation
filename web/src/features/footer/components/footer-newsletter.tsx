import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  footerHeadingClassName,
  footerMutedTextClassName,
} from "@/features/footer/components/footer-link-styles";
import type { FooterNewsletterContent } from "@/features/footer/types";
import { cn } from "@/lib/utils";

type FooterNewsletterProps = {
  content: FooterNewsletterContent;
  className?: string;
};

export function FooterNewsletter({ content, className }: FooterNewsletterProps) {
  return (
    <section
      aria-labelledby="footer-newsletter-heading"
      className={cn("border-t border-footer-accent/40 pt-12", className)}
    >
      <div className="rounded-lg border border-footer-foreground/10 bg-footer-foreground/5 p-6 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <div className="max-w-md space-y-2">
            <h3
              id="footer-newsletter-heading"
              className={footerHeadingClassName}
            >
              {content.heading}
            </h3>
            <p className={cn("text-pretty", footerMutedTextClassName)}>
              {content.description}
            </p>
          </div>

          <form className="w-full max-w-md" noValidate>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3">
              <div className="flex-1">
                <label htmlFor="footer-newsletter-email" className="sr-only">
                  {content.emailLabel}
                </label>
                <Input
                  id="footer-newsletter-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder={content.emailPlaceholder}
                  className="h-10 border-footer-foreground/15 bg-footer-foreground/10 text-footer-foreground placeholder:text-footer-muted sm:h-9"
                />
              </div>
              <Button
                type="button"
                className="h-10 w-full shrink-0 sm:h-9 sm:w-auto"
              >
                {content.submitLabel}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
