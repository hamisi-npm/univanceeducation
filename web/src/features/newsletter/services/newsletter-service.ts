import { NewsletterStatus } from "@/generated/prisma/client";

import {
  API_ROUTES,
  NEWSLETTER_SOURCES,
  type NewsletterSource,
} from "@/constants/operational";
import { sendEmail } from "@/lib/email/resend";
import { getSiteOrigin } from "@/lib/env";
import {
  buildNewsletterConfirmationEmail,
  buildNewsletterUnsubscribedEmail,
} from "@/features/newsletter/emails/newsletter-emails";
import * as newsletterRepository from "@/features/newsletter/repository/newsletter-repository";
import type { SubscribeNewsletterResult } from "@/features/newsletter/types";
import {
  newsletterConfirmSchema,
  newsletterSubscribeSchema,
} from "@/features/newsletter/validation";
import type { NewsletterPageKind } from "@/lib/sanity/singletons";
import { getEmailTemplate, getNewsletterSystemPage } from "@/services/system";
import { getSiteConfig } from "@/services/site";
import type { NewsletterSystemPageContent } from "@/types/system";

function resolveSource(source: string | undefined): NewsletterSource {
  if (source === NEWSLETTER_SOURCES.blog || source === NEWSLETTER_SOURCES.footer) {
    return source;
  }
  return NEWSLETTER_SOURCES.footer;
}

function buildConfirmUrl(token: string): string {
  return `${getSiteOrigin()}${API_ROUTES.newsletterConfirmPage}?token=${encodeURIComponent(token)}`;
}

async function getEmailChrome() {
  const site = await getSiteConfig().catch(() => null);
  const siteUrl = site?.url?.replace(/\/$/, "") || getSiteOrigin();
  return {
    siteUrl,
    logoUrl: site?.logo?.src,
  };
}

async function sendConfirmationEmail(email: string, token: string): Promise<void> {
  const [template, chrome] = await Promise.all([
    getEmailTemplate("newsletter-confirmation"),
    getEmailChrome(),
  ]);

  const built = buildNewsletterConfirmationEmail({
    template,
    email,
    confirmUrl: buildConfirmUrl(token),
    siteUrl: chrome.siteUrl,
    logoUrl: chrome.logoUrl,
  });

  await sendEmail({
    to: email,
    subject: built.subject,
    html: built.html,
    text: built.text,
  });
}

async function sendUnsubscribedEmail(email: string): Promise<void> {
  const [template, chrome] = await Promise.all([
    getEmailTemplate("newsletter-unsubscribed"),
    getEmailChrome(),
  ]);

  const built = buildNewsletterUnsubscribedEmail({
    template,
    email,
    siteUrl: chrome.siteUrl,
    logoUrl: chrome.logoUrl,
  });

  await sendEmail({
    to: email,
    subject: built.subject,
    html: built.html,
    text: built.text,
  });
}

export async function subscribeNewsletter(
  rawBody: unknown,
): Promise<SubscribeNewsletterResult> {
  const input = newsletterSubscribeSchema.parse(rawBody);
  const email = input.email.toLowerCase();
  const source = resolveSource(input.source);

  const existing = await newsletterRepository.findSubscriberByEmail(email);

  if (
    existing &&
    !existing.archived &&
    existing.status === NewsletterStatus.CONFIRMED
  ) {
    return {
      email: existing.email,
      status: existing.status,
      alreadySubscribed: true,
    };
  }

  const confirmationToken = newsletterRepository.createToken();
  const confirmationExpiresAt = newsletterRepository.createConfirmationExpiry();

  let subscriber;
  if (!existing) {
    subscriber = await newsletterRepository.createPendingSubscriber({
      email,
      source,
      confirmationToken,
      confirmationExpiresAt,
    });
  } else {
    subscriber = await newsletterRepository.resetSubscriberToPending(existing.id, {
      source,
      confirmationToken,
      confirmationExpiresAt,
    });
  }

  await sendConfirmationEmail(subscriber.email, confirmationToken);

  return {
    email: subscriber.email,
    status: subscriber.status,
    alreadySubscribed: false,
  };
}

export async function resolveNewsletterConfirmationPage(
  rawQuery: unknown,
): Promise<NewsletterSystemPageContent> {
  const parsed = newsletterConfirmSchema.safeParse(rawQuery);
  if (!parsed.success) {
    return getNewsletterSystemPage("invalid");
  }

  const outcome = await newsletterRepository.confirmSubscriberByToken(
    parsed.data.token,
  );

  const kindByStatus: Record<typeof outcome.status, NewsletterPageKind> = {
    confirmed: "confirmation",
    "already-subscribed": "already-subscribed",
    expired: "expired",
    invalid: "invalid",
  };

  return getNewsletterSystemPage(kindByStatus[outcome.status]);
}

export async function resolveNewsletterUnsubscribePage(
  rawQuery: unknown,
): Promise<NewsletterSystemPageContent> {
  const parsed = newsletterConfirmSchema.safeParse(rawQuery);
  if (!parsed.success) {
    return getNewsletterSystemPage("invalid");
  }

  const outcome = await newsletterRepository.unsubscribeSubscriberByToken(
    parsed.data.token,
  );

  if (outcome.status === "unsubscribed") {
    await sendUnsubscribedEmail(outcome.subscriber.email).catch((error) => {
      console.error("[newsletter] Failed to send unsubscribe confirmation", error);
    });
    return getNewsletterSystemPage("unsubscribed");
  }

  if (outcome.status === "already-unsubscribed") {
    return getNewsletterSystemPage("already-unsubscribed");
  }

  return getNewsletterSystemPage("invalid");
}
