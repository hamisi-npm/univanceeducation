import type {
  NewsletterStatus,
  NewsletterSubscriber,
} from "@/generated/prisma/client";
import type { NewsletterSource } from "@/constants/operational";

export type { NewsletterStatus, NewsletterSubscriber };

export type SubscribeNewsletterResult = {
  email: string;
  status: NewsletterStatus;
  alreadySubscribed: boolean;
};

export type ConfirmNewsletterResult = {
  email: string;
  status: NewsletterStatus;
  confirmedAt: string;
};

export type SubscribeNewsletterContext = {
  source: NewsletterSource;
};
