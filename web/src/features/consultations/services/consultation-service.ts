import { getEmailEnv, getSiteOrigin } from "@/lib/env";
import { sendEmail } from "@/lib/email/resend";
import {
  buildConsultationApplicantEmail,
  buildConsultationStaffEmail,
} from "@/features/consultations/emails/consultation-emails";
import * as consultationRepository from "@/features/consultations/repository/consultation-repository";
import type {
  ConsultationCreateData,
  CreateConsultationResult,
} from "@/features/consultations/types";
import { createConsultationSchema } from "@/features/consultations/validation";
import { getEmailTemplate } from "@/services/system";
import { getSiteConfig } from "@/services/site";

export async function submitConsultation(
  rawBody: unknown,
  context: Pick<ConsultationCreateData, "source" | "ipHash">,
): Promise<CreateConsultationResult> {
  const input = createConsultationSchema.parse(rawBody);

  const consultation = await consultationRepository.createConsultation({
    ...input,
    source: context.source,
    ipHash: context.ipHash,
  });

  const [{ CONSULTATION_INBOX }, staffTemplate, applicantTemplate, site] =
    await Promise.all([
      Promise.resolve(getEmailEnv()),
      getEmailTemplate("consultation-staff"),
      getEmailTemplate("consultation-confirmation"),
      getSiteConfig().catch(() => null),
    ]);

  const siteUrl = site?.url?.replace(/\/$/, "") || getSiteOrigin();
  const logoUrl = site?.logo?.src;

  const staffEmail = buildConsultationStaffEmail({
    template: staffTemplate,
    consultation,
    siteUrl,
    logoUrl,
  });
  const applicantEmail = buildConsultationApplicantEmail({
    template: applicantTemplate,
    consultation,
    siteUrl,
    logoUrl,
  });

  await Promise.all([
    sendEmail({
      to: CONSULTATION_INBOX,
      subject: staffEmail.subject,
      html: staffEmail.html,
      text: staffEmail.text,
      replyTo: consultation.email,
    }),
    sendEmail({
      to: consultation.email,
      subject: applicantEmail.subject,
      html: applicantEmail.html,
      text: applicantEmail.text,
    }),
  ]);

  return {
    id: consultation.id,
    status: consultation.status,
    createdAt: consultation.createdAt.toISOString(),
  };
}
