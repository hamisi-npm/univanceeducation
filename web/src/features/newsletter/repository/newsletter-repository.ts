import { randomBytes } from "node:crypto";

import type { NewsletterSubscriber } from "@/generated/prisma/client";
import { NewsletterStatus } from "@/generated/prisma/client";

import { getPrisma } from "@/lib/db/prisma";

/** Confirmation links expire after 7 days. */
export const CONFIRMATION_TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export type ConfirmOutcome =
  | { status: "confirmed"; subscriber: NewsletterSubscriber }
  | { status: "already-subscribed"; subscriber: NewsletterSubscriber }
  | { status: "expired"; subscriber: NewsletterSubscriber }
  | { status: "invalid" };

export type UnsubscribeOutcome =
  | { status: "unsubscribed"; subscriber: NewsletterSubscriber }
  | { status: "already-unsubscribed"; subscriber: NewsletterSubscriber }
  | { status: "invalid" };

export function createToken(): string {
  return randomBytes(32).toString("hex");
}

export function createConfirmationExpiry(from = new Date()): Date {
  return new Date(from.getTime() + CONFIRMATION_TOKEN_TTL_MS);
}

export async function findSubscriberByEmail(
  email: string,
): Promise<NewsletterSubscriber | null> {
  return getPrisma().newsletterSubscriber.findUnique({
    where: { email: email.toLowerCase() },
  });
}

export async function findSubscriberByConfirmationToken(
  token: string,
): Promise<NewsletterSubscriber | null> {
  return getPrisma().newsletterSubscriber.findFirst({
    where: {
      confirmationToken: token,
      archived: false,
    },
  });
}

export async function findSubscriberByUnsubscribeToken(
  token: string,
): Promise<NewsletterSubscriber | null> {
  return getPrisma().newsletterSubscriber.findFirst({
    where: {
      unsubscribeToken: token,
      archived: false,
    },
  });
}

export async function createPendingSubscriber(input: {
  email: string;
  source: string;
  confirmationToken: string;
  confirmationExpiresAt: Date;
}): Promise<NewsletterSubscriber> {
  return getPrisma().newsletterSubscriber.create({
    data: {
      email: input.email.toLowerCase(),
      source: input.source,
      status: NewsletterStatus.PENDING,
      confirmationToken: input.confirmationToken,
      confirmationExpiresAt: input.confirmationExpiresAt,
    },
  });
}

export async function resetSubscriberToPending(
  id: string,
  input: {
    source: string;
    confirmationToken: string;
    confirmationExpiresAt: Date;
  },
): Promise<NewsletterSubscriber> {
  return getPrisma().newsletterSubscriber.update({
    where: { id },
    data: {
      status: NewsletterStatus.PENDING,
      source: input.source,
      confirmationToken: input.confirmationToken,
      confirmationExpiresAt: input.confirmationExpiresAt,
      confirmedAt: null,
      unsubscribedAt: null,
      unsubscribeToken: null,
      archived: false,
    },
  });
}

export async function confirmSubscriberByToken(
  token: string,
): Promise<ConfirmOutcome> {
  const existing = await findSubscriberByConfirmationToken(token);
  if (!existing) {
    return { status: "invalid" };
  }

  if (
    existing.confirmationExpiresAt &&
    existing.confirmationExpiresAt.getTime() < Date.now()
  ) {
    return { status: "expired", subscriber: existing };
  }

  if (existing.status === NewsletterStatus.CONFIRMED) {
    return { status: "already-subscribed", subscriber: existing };
  }

  const unsubscribeToken = createToken();

  const subscriber = await getPrisma().newsletterSubscriber.update({
    where: { id: existing.id },
    data: {
      status: NewsletterStatus.CONFIRMED,
      confirmedAt: new Date(),
      confirmationToken: null,
      confirmationExpiresAt: null,
      unsubscribeToken,
      unsubscribedAt: null,
      archived: false,
    },
  });

  return { status: "confirmed", subscriber };
}

export async function unsubscribeSubscriberByToken(
  token: string,
): Promise<UnsubscribeOutcome> {
  const existing = await findSubscriberByUnsubscribeToken(token);
  if (!existing) {
    return { status: "invalid" };
  }

  if (existing.status === NewsletterStatus.UNSUBSCRIBED) {
    return { status: "already-unsubscribed", subscriber: existing };
  }

  const subscriber = await getPrisma().newsletterSubscriber.update({
    where: { id: existing.id },
    data: {
      status: NewsletterStatus.UNSUBSCRIBED,
      unsubscribedAt: new Date(),
      confirmationToken: null,
      confirmationExpiresAt: null,
      archived: false,
    },
  });

  return { status: "unsubscribed", subscriber };
}
