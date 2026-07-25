import { z } from "zod";

import { NEWSLETTER_SOURCES } from "@/constants/operational";

const newsletterSourceValues = Object.values(NEWSLETTER_SOURCES) as [
  (typeof NEWSLETTER_SOURCES)[keyof typeof NEWSLETTER_SOURCES],
  ...(typeof NEWSLETTER_SOURCES)[keyof typeof NEWSLETTER_SOURCES][],
];

export const newsletterSubscribeSchema = z.object({
  email: z.email("Please enter a valid email address"),
  source: z.enum(newsletterSourceValues).optional(),
});

export const newsletterConfirmSchema = z.object({
  token: z
    .string()
    .trim()
    .min(16, "Invalid confirmation token")
    .max(128, "Invalid confirmation token"),
});

export type NewsletterSubscribeInput = z.infer<typeof newsletterSubscribeSchema>;
export type NewsletterConfirmInput = z.infer<typeof newsletterConfirmSchema>;
