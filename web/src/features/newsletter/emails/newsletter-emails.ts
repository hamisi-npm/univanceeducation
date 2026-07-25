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

export function buildNewsletterConfirmationEmail(input: {
  template: EmailTemplateContent;
  email: string;
  confirmUrl: string;
  siteUrl: string;
  logoUrl?: string;
}): BuiltEmail {
  const { template, email, confirmUrl, siteUrl, logoUrl } = input;
  const values = { email, confirmUrl, siteUrl };

  const buttonUrl = resolveButtonUrl(template, values) || confirmUrl;
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
    button: {
      label: applyEmailPlaceholders(
        template.buttonLabel || "Confirm subscription",
        values,
      ),
      url: buttonUrl,
    },
    nextStepsHtml: nextSteps
      ? `<p style="margin:0;">${nl2br(nextSteps)}</p>`
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
    `Confirm: ${buttonUrl}`,
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

export function buildNewsletterUnsubscribedEmail(input: {
  template: EmailTemplateContent;
  email: string;
  siteUrl: string;
  logoUrl?: string;
}): BuiltEmail {
  const { template, email, siteUrl, logoUrl } = input;
  const values = { email, siteUrl };
  const buttonUrl = resolveButtonUrl(template, values);
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
    button:
      template.buttonLabel && buttonUrl
        ? {
            label: applyEmailPlaceholders(template.buttonLabel, values),
            url: buttonUrl,
          }
        : null,
    nextStepsHtml: nextSteps
      ? `<p style="margin:0;">${nl2br(nextSteps)}</p>`
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
