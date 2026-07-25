import { z } from "zod";

import { safeLongText, safeText } from "@/lib/validation/safe-text";

export const consultationFormSchema = z.object({
  fullName: safeText({
    min: 2,
    max: 120,
    minMessage: "Please enter your full name",
    maxMessage: "Name must be 120 characters or fewer",
  }),
  email: z.email("Please enter a valid email address"),
  phone: z
    .string()
    .trim()
    .min(8, "Please enter a valid phone number")
    .max(40, "Phone must be 40 characters or fewer"),
  preferredDestination: safeText({
    min: 1,
    max: 120,
    minMessage: "Please select a preferred destination",
  }),
  preferredIntake: safeText({
    min: 1,
    max: 80,
    minMessage: "Please select a preferred intake",
  }),
  studyLevel: safeText({
    min: 1,
    max: 80,
    minMessage: "Please select a study level",
  }),
  message: safeLongText({
    min: 10,
    max: 1000,
    minMessage: "Please provide at least 10 characters",
    maxMessage: "Message must be 1,000 characters or fewer",
  }),
  /** Honeypot — must stay empty; enforced by `assertHoneypotEmpty` before parse. */
  website: z.string().default(""),
  /** Cloudflare Turnstile token — verified server-side before Zod persistence parse. */
  turnstileToken: z
    .string()
    .min(1, "Please complete the security check."),
});

/** API body for persistence — honeypot + captcha excluded after server checks. */
export const createConsultationSchema = consultationFormSchema.omit({
  website: true,
  turnstileToken: true,
});

export type ConsultationFormValues = z.infer<typeof consultationFormSchema>;
export type CreateConsultationInput = z.infer<typeof createConsultationSchema>;
