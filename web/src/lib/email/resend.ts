import { Resend } from "resend";

import { getEmailEnv } from "@/lib/env";
import { serviceUnavailable } from "@/lib/api/errors";

let resendClient: Resend | null = null;

function getResend(): Resend {
  if (resendClient) {
    return resendClient;
  }

  const { RESEND_API_KEY } = getEmailEnv();
  resendClient = new Resend(RESEND_API_KEY);
  return resendClient;
}

export type SendEmailInput = {
  to: string | string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

/**
 * Sends transactional email via Resend.
 * Throws ApiError on provider failure — never reports a fake success.
 */
export async function sendEmail(input: SendEmailInput): Promise<{ id: string }> {
  const { EMAIL_FROM } = getEmailEnv();
  const resend = getResend();

  const { data, error } = await resend.emails.send({
    from: EMAIL_FROM,
    to: input.to,
    subject: input.subject,
    html: input.html,
    text: input.text,
    ...(input.replyTo ? { replyTo: input.replyTo } : {}),
  });

  if (error || !data?.id) {
    throw serviceUnavailable("Failed to send email.", {
      provider: "resend",
      message: error?.message ?? "No message id returned",
    });
  }

  return { id: data.id };
}
