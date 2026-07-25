import { Container } from "@/components/layout/container";
import type { NewsletterContent } from "@/features/blog/types";
import { NewsletterSubscribeForm } from "@/features/newsletter/components/newsletter-subscribe-form";
import { NEWSLETTER_SOURCES } from "@/constants/operational";
import { cardStyles, sectionStyles } from "@/lib/section-styles";
import { getTurnstileSiteKey } from "@/lib/security/turnstile";
import { getSystemMessages } from "@/services/system";
import { cn } from "@/lib/utils";

type NewsletterProps = {
  content: NewsletterContent;
  className?: string;
};

export async function Newsletter({ content, className }: NewsletterProps) {
  const [messages, turnstileSiteKey] = await Promise.all([
    getSystemMessages(),
    Promise.resolve(getTurnstileSiteKey()),
  ]);

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

            {turnstileSiteKey ? (
              <NewsletterSubscribeForm
                source={NEWSLETTER_SOURCES.blog}
                surface="default"
                emailLabel={content.emailLabel}
                emailPlaceholder={content.emailPlaceholder}
                submitLabel={content.submitLabel}
                emailInputId="blog-newsletter-email"
                turnstileSiteKey={turnstileSiteKey}
                formClassName="mx-auto w-full max-w-md"
                inputClassName="bg-background"
                privacyNote={content.privacyNote}
                successMessage={messages.newsletterSubscribeSuccess}
                alreadySubscribedMessage={messages.newsletterAlreadySubscribed}
              />
            ) : (
              <p className="text-sm text-muted-foreground" role="status">
                Newsletter signup is temporarily unavailable.
              </p>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
