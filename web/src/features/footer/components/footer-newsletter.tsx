import {
  footerHeadingClassName,
  footerMutedTextClassName,
} from "@/features/footer/components/footer-link-styles";
import type { FooterNewsletterContent } from "@/features/footer/types";
import { NewsletterSubscribeForm } from "@/features/newsletter/components/newsletter-subscribe-form";
import { NEWSLETTER_SOURCES } from "@/constants/operational";
import { getSystemMessages } from "@/services/system";
import { cn } from "@/lib/utils";

type FooterNewsletterProps = {
  content: FooterNewsletterContent;
  className?: string;
};

export async function FooterNewsletter({
  content,
  className,
}: FooterNewsletterProps) {
  const messages = await getSystemMessages();

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

          <NewsletterSubscribeForm
            source={NEWSLETTER_SOURCES.footer}
            surface="footer"
            emailLabel={content.emailLabel}
            emailPlaceholder={content.emailPlaceholder}
            submitLabel={content.submitLabel}
            emailInputId="footer-newsletter-email"
            formClassName="w-full max-w-md"
            inputClassName="border-footer-foreground/15 bg-footer-foreground/10 text-footer-foreground placeholder:text-footer-muted"
            buttonClassName="rounded-lg border-transparent bg-white text-primary hover:bg-brand-beige"
            successMessage={messages.newsletterSubscribeSuccess}
            alreadySubscribedMessage={messages.newsletterAlreadySubscribed}
          />
        </div>
      </div>
    </section>
  );
}
