import { z } from "zod";

export const consultationFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name"),
  email: z.email("Please enter a valid email address"),
  phone: z
    .string()
    .trim()
    .min(8, "Please enter a valid phone number"),
  preferredDestination: z
    .string()
    .min(1, "Please select a preferred destination"),
  preferredIntake: z.string().min(1, "Please select a preferred intake"),
  studyLevel: z.string().min(1, "Please select a study level"),
  message: z
    .string()
    .trim()
    .min(10, "Please provide at least 10 characters")
    .max(1000, "Message must be 1,000 characters or fewer"),
});

export type ConsultationFormValues = z.infer<typeof consultationFormSchema>;
