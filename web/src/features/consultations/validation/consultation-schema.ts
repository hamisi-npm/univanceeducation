import { z } from "zod";

export const consultationFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name")
    .max(120, "Name must be 120 characters or fewer"),
  email: z.email("Please enter a valid email address"),
  phone: z
    .string()
    .trim()
    .min(8, "Please enter a valid phone number")
    .max(40, "Phone must be 40 characters or fewer"),
  preferredDestination: z
    .string()
    .trim()
    .min(1, "Please select a preferred destination")
    .max(120),
  preferredIntake: z
    .string()
    .trim()
    .min(1, "Please select a preferred intake")
    .max(80),
  studyLevel: z
    .string()
    .trim()
    .min(1, "Please select a study level")
    .max(80),
  message: z
    .string()
    .trim()
    .min(10, "Please provide at least 10 characters")
    .max(1000, "Message must be 1,000 characters or fewer"),
});

/** API body — same fields as the public form. */
export const createConsultationSchema = consultationFormSchema;

export type ConsultationFormValues = z.infer<typeof consultationFormSchema>;
export type CreateConsultationInput = z.infer<typeof createConsultationSchema>;
