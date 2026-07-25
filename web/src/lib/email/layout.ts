import { brandColors } from "@/config/brand";

export type EmailLayoutInput = {
  preheader?: string;
  heading: string;
  greetingHtml: string;
  bodyHtml: string;
  button?: { label: string; url: string } | null;
  nextStepsHtml?: string;
  summaryCardHtml?: string;
  footerMessage?: string;
  supportMessage?: string;
  legalNote?: string;
  signature?: string;
  logoUrl?: string;
  siteName?: string;
};

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function escapeEmailHtml(value: string): string {
  return escapeHtml(value);
}

export function applyEmailPlaceholders(
  template: string,
  values: Record<string, string>,
): string {
  return Object.entries(values).reduce((result, [key, value]) => {
    return result.replaceAll(`{{${key}}}`, value);
  }, template);
}

/**
 * Branded responsive HTML email shell. Layout stays in code; copy is injected.
 */
export function renderBrandedEmailHtml(input: EmailLayoutInput): string {
  const siteName = escapeHtml(input.siteName || "Univance Education");
  const logoBlock = input.logoUrl
    ? `<img src="${escapeHtml(input.logoUrl)}" alt="${siteName}" width="140" style="display:block;border:0;outline:none;text-decoration:none;height:auto;max-width:140px;" />`
    : `<div style="font-size:20px;font-weight:700;color:${brandColors.white};letter-spacing:0.02em;">${siteName}</div>`;

  const buttonBlock =
    input.button?.label && input.button.url
      ? `
        <tr>
          <td style="padding:8px 0 24px;">
            <a href="${escapeHtml(input.button.url)}" style="display:inline-block;background:${brandColors.primary};color:${brandColors.white};text-decoration:none;font-size:15px;font-weight:600;line-height:1;padding:14px 22px;border-radius:8px;">
              ${escapeHtml(input.button.label)}
            </a>
          </td>
        </tr>`
      : "";

  const summaryBlock = input.summaryCardHtml
    ? `
        <tr>
          <td style="padding:0 0 24px;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${brandColors.neutral};border-radius:12px;">
              <tr>
                <td style="padding:20px 22px;color:${brandColors.text};font-size:14px;line-height:1.6;">
                  ${input.summaryCardHtml}
                </td>
              </tr>
            </table>
          </td>
        </tr>`
    : "";

  const nextStepsBlock = input.nextStepsHtml
    ? `
        <tr>
          <td style="padding:0 0 20px;color:${brandColors.mutedText};font-size:14px;line-height:1.7;">
            ${input.nextStepsHtml}
          </td>
        </tr>`
    : "";

  const supportBlock = input.supportMessage
    ? `<p style="margin:0 0 8px;color:${brandColors.mutedTextSoft};font-size:13px;line-height:1.6;">${escapeHtml(input.supportMessage)}</p>`
    : "";

  const footerBlock = input.footerMessage
    ? `<p style="margin:0 0 8px;color:${brandColors.mutedTextSoft};font-size:13px;line-height:1.6;">${escapeHtml(input.footerMessage)}</p>`
    : "";

  const legalBlock = input.legalNote
    ? `<p style="margin:0;color:${brandColors.mutedTextSoft};font-size:12px;line-height:1.5;">${escapeHtml(input.legalNote)}</p>`
    : "";

  const signatureBlock = input.signature
    ? `<p style="margin:0 0 20px;color:${brandColors.text};font-size:14px;line-height:1.6;">${escapeHtml(input.signature)}</p>`
    : "";

  const preheader = input.preheader
    ? `<div style="display:none;font-size:1px;color:#fff;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${escapeHtml(input.preheader)}</div>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(input.heading)}</title>
</head>
<body style="margin:0;padding:0;background:#F3F4F6;font-family:Geist,Arial,Helvetica,sans-serif;">
  ${preheader}
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#F3F4F6;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background:${brandColors.white};border-radius:16px;overflow:hidden;">
          <tr>
            <td style="background:${brandColors.primary};padding:22px 28px;">
              ${logoBlock}
            </td>
          </tr>
          <tr>
            <td style="padding:32px 28px 8px;">
              <h1 style="margin:0 0 16px;font-size:24px;line-height:1.3;color:${brandColors.text};font-weight:600;">
                ${escapeHtml(input.heading)}
              </h1>
              <div style="margin:0 0 16px;color:${brandColors.text};font-size:15px;line-height:1.7;">
                ${input.greetingHtml}
              </div>
              <div style="margin:0 0 20px;color:${brandColors.mutedText};font-size:15px;line-height:1.7;">
                ${input.bodyHtml}
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:0 28px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                ${summaryBlock}
                ${buttonBlock}
                ${nextStepsBlock}
                <tr>
                  <td>
                    ${signatureBlock}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 28px 28px;border-top:1px solid ${brandColors.border};">
              ${footerBlock}
              ${supportBlock}
              ${legalBlock}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function plainTextFromEmailParts(parts: string[]): string {
  return parts.filter(Boolean).join("\n\n");
}
