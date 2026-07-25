import type { Consultation } from "@/generated/prisma/client";

import { brandColors } from "@/config/brand";
import {
  applyEmailPlaceholders,
  escapeEmailHtml,
  plainTextFromEmailParts,
  renderBrandedEmailHtml,
} from "@/lib/email/layout";
import type { EmailTemplateContent } from "@/types/system";

export type BuiltEmail = {
  subject: string;
  html: string;
  text: string;
};

function nl2br(value: string): string {
  return escapeEmailHtml(value).replaceAll("\n", "<br />");
}

function resolveButtonUrl(
  template: EmailTemplateContent,
  values: Record<string, string>,
): string | null {
  const placeholder = template.buttonUrlPlaceholder?.trim();
  if (!placeholder) {
    return null;
  }

  if (placeholder.startsWith("{{") && placeholder.endsWith("}}")) {
    const key = placeholder.slice(2, -2);
    return values[key] || null;
  }

  return applyEmailPlaceholders(placeholder, values);
}

export function buildConsultationStaffEmail(input: {
  template: EmailTemplateContent;
  consultation: Consultation;
  siteUrl: string;
  logoUrl?: string;
}): BuiltEmail {
  const { template, consultation, siteUrl, logoUrl } = input;
  const values = {
    fullName: consultation.fullName,
    email: consultation.email,
    phone: consultation.phone,
    preferredDestination: consultation.preferredDestination,
    preferredIntake: consultation.preferredIntake,
    studyLevel: consultation.studyLevel,
    message: consultation.message,
    source: consultation.source ?? "unknown",
    id: consultation.id,
    siteUrl,
  };

  const summaryCardHtml = `
    <p style="margin:0 0 8px;"><strong>Name:</strong> ${escapeEmailHtml(consultation.fullName)}</p>
    <p style="margin:0 0 8px;"><strong>Email:</strong> ${escapeEmailHtml(consultation.email)}</p>
    <p style="margin:0 0 8px;"><strong>Phone:</strong> ${escapeEmailHtml(consultation.phone)}</p>
    <p style="margin:0 0 8px;"><strong>Destination:</strong> ${escapeEmailHtml(consultation.preferredDestination)}</p>
    <p style="margin:0 0 8px;"><strong>Intake:</strong> ${escapeEmailHtml(consultation.preferredIntake)}</p>
    <p style="margin:0 0 8px;"><strong>Study level:</strong> ${escapeEmailHtml(consultation.studyLevel)}</p>
    <p style="margin:0 0 8px;"><strong>Source:</strong> ${escapeEmailHtml(consultation.source ?? "unknown")}</p>
    <p style="margin:0 0 8px;"><strong>ID:</strong> ${escapeEmailHtml(consultation.id)}</p>
    <p style="margin:12px 0 0;"><strong>Message</strong></p>
    <p style="margin:4px 0 0;">${nl2br(consultation.message)}</p>
  `;

  const greeting = applyEmailPlaceholders(template.greeting, values);
  const introduction = applyEmailPlaceholders(template.introduction, values);
  const nextSteps = template.nextSteps
    ? applyEmailPlaceholders(template.nextSteps, values)
    : "";

  const html = renderBrandedEmailHtml({
    preheader: applyEmailPlaceholders(template.subject, values),
    heading: applyEmailPlaceholders(template.heading, values),
    greetingHtml: `<p style="margin:0;">${nl2br(greeting)}</p>`,
    bodyHtml: `<p style="margin:0;">${nl2br(introduction)}</p>`,
    summaryCardHtml,
    nextStepsHtml: nextSteps
      ? `<p style="margin:0 0 6px;font-weight:600;color:${brandColors.text};">What happens next</p><p style="margin:0;">${nl2br(nextSteps)}</p>`
      : undefined,
    footerMessage: template.footerMessage
      ? applyEmailPlaceholders(template.footerMessage, values)
      : undefined,
    supportMessage: template.supportMessage
      ? applyEmailPlaceholders(template.supportMessage, values)
      : undefined,
    legalNote: template.legalNote
      ? applyEmailPlaceholders(template.legalNote, values)
      : undefined,
    signature: template.signature
      ? applyEmailPlaceholders(template.signature, values)
      : undefined,
    logoUrl,
    siteName: "Univance Education",
  });

  const text = plainTextFromEmailParts([
    applyEmailPlaceholders(template.greeting, values),
    applyEmailPlaceholders(template.introduction, values),
    `Name: ${consultation.fullName}`,
    `Email: ${consultation.email}`,
    `Phone: ${consultation.phone}`,
    `Destination: ${consultation.preferredDestination}`,
    `Intake: ${consultation.preferredIntake}`,
    `Study level: ${consultation.studyLevel}`,
    `Message: ${consultation.message}`,
    nextSteps,
    template.signature
      ? applyEmailPlaceholders(template.signature, values)
      : "",
  ]);

  return {
    subject: applyEmailPlaceholders(template.subject, values),
    html,
    text,
  };
}

export function buildConsultationApplicantEmail(input: {
  template: EmailTemplateContent;
  consultation: Consultation;
  siteUrl: string;
  logoUrl?: string;
}): BuiltEmail {
  const { template, consultation, siteUrl, logoUrl } = input;
  const values = {
    fullName: consultation.fullName,
    email: consultation.email,
    preferredDestination: consultation.preferredDestination,
    preferredIntake: consultation.preferredIntake,
    studyLevel: consultation.studyLevel,
    siteUrl,
  };

  const buttonUrl = resolveButtonUrl(template, values);
  const greeting = applyEmailPlaceholders(template.greeting, values);
  const introduction = applyEmailPlaceholders(template.introduction, values);
  const nextSteps = template.nextSteps
    ? applyEmailPlaceholders(template.nextSteps, values)
    : "";

  const summaryCardHtml = `
    <p style="margin:0 0 8px;font-weight:600;">Consultation summary</p>
    <p style="margin:0 0 6px;">Preferred destination: ${escapeEmailHtml(consultation.preferredDestination)}</p>
    <p style="margin:0 0 6px;">Preferred intake: ${escapeEmailHtml(consultation.preferredIntake)}</p>
    <p style="margin:0;">Study level: ${escapeEmailHtml(consultation.studyLevel)}</p>
  `;

  const html = renderBrandedEmailHtml({
    preheader: applyEmailPlaceholders(template.subject, values),
    heading: applyEmailPlaceholders(template.heading, values),
    greetingHtml: `<p style="margin:0;">${nl2br(greeting)}</p>`,
    bodyHtml: `<p style="margin:0;">${nl2br(introduction)}</p>`,
    summaryCardHtml,
    button:
      template.buttonLabel && buttonUrl
        ? { label: applyEmailPlaceholders(template.buttonLabel, values), url: buttonUrl }
        : null,
    nextStepsHtml: nextSteps
      ? `<p style="margin:0 0 6px;font-weight:600;color:${brandColors.text};">What happens next</p><p style="margin:0;">${nl2br(nextSteps)}</p>`
      : undefined,
    footerMessage: template.footerMessage
      ? applyEmailPlaceholders(template.footerMessage, values)
      : undefined,
    supportMessage: template.supportMessage
      ? applyEmailPlaceholders(template.supportMessage, values)
      : undefined,
    legalNote: template.legalNote
      ? applyEmailPlaceholders(template.legalNote, values)
      : undefined,
    signature: template.signature
      ? applyEmailPlaceholders(template.signature, values)
      : undefined,
    logoUrl,
    siteName: "Univance Education",
  });

  const text = plainTextFromEmailParts([
    applyEmailPlaceholders(template.greeting, values),
    applyEmailPlaceholders(template.introduction, values),
    `Preferred destination: ${consultation.preferredDestination}`,
    `Preferred intake: ${consultation.preferredIntake}`,
    `Study level: ${consultation.studyLevel}`,
    nextSteps,
    buttonUrl ? `${template.buttonLabel}: ${buttonUrl}` : "",
    template.signature
      ? applyEmailPlaceholders(template.signature, values)
      : "",
  ]);

  return {
    subject: applyEmailPlaceholders(template.subject, values),
    html,
    text,
  };
}
