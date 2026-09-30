"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Resolver } from "react-hook-form";

import {
  HONEYPOT_FIELD_NAME,
  HoneypotField,
} from "@/components/shared/honeypot-field";
import { TurnstileWidget } from "@/components/shared/turnstile-widget";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  API_ROUTES,
  type NewsletterSource,
} from "@/constants/operational";
import {
  newsletterSubscribeSchema,
  type NewsletterSubscribeInput,
} from "@/features/newsletter/validation";
import { ApiClientError, postJson } from "@/lib/api/client";
import { cn } from "@/lib/utils";

type NewsletterSubscribeFormProps = {
  source: NewsletterSource;
  emailLabel: string;
  emailPlaceholder: string;
  submitLabel: string;
  emailInputId: string;
  turnstileSiteKey: string;
  /** `footer` uses footer design tokens for contrast on maroon surfaces. */
  surface?: "default" | "footer";
  inputClassName?: string;
  buttonClassName?: string;
  formClassName?: string;
  successMessage?: string;
  alreadySubscribedMessage?: string;
  privacyNote?: string;
  privacyNoteClassName?: string;
};

type FormValues = Pick<
  NewsletterSubscribeInput,
  "email" | "website" | "turnstileToken"
>;

const newsletterFormSchema = newsletterSubscribeSchema.pick({
  email: true,
  website: true,
  turnstileToken: true,
});

export function NewsletterSubscribeForm({
  source,
  emailLabel,
  emailPlaceholder,
  submitLabel,
  emailInputId,
  turnstileSiteKey,
  surface = "default",
  inputClassName,
  buttonClassName,
  formClassName,
  successMessage = "Check your email to confirm your subscription.",
  alreadySubscribedMessage = "You are already subscribed.",
  privacyNote,
  privacyNoteClassName,
}: NewsletterSubscribeFormProps) {
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [hasTurnstileToken, setHasTurnstileToken] = useState(false);
  const [turnstileKey, setTurnstileKey] = useState(0);

  const form = useForm<FormValues>({
    resolver: zodResolver(newsletterFormSchema) as Resolver<FormValues>,
    defaultValues: { email: "", website: "", turnstileToken: "" },
  });

  async function onSubmit(values: FormValues) {
    setSubmitError(null);
    setStatusMessage(null);

    if (!values.turnstileToken?.trim()) {
      form.setError("turnstileToken", {
        type: "manual",
        message: "Please complete the security check.",
      });
      return;
    }

    try {
      const result = await postJson<{
        alreadySubscribed: boolean;
      }>(API_ROUTES.newsletter, {
        email: values.email,
        source,
        website: values.website ?? "",
        turnstileToken: values.turnstileToken,
      });

      setStatusMessage(
        result.alreadySubscribed ? alreadySubscribedMessage : successMessage,
      );
      form.reset();
      setHasTurnstileToken(false);
      setTurnstileKey((key) => key + 1);
    } catch (error) {
      form.setValue("turnstileToken", "");
      setHasTurnstileToken(false);
      setTurnstileKey((key) => key + 1);

      if (error instanceof ApiClientError) {
        setSubmitError(error.message);
        return;
      }

      setSubmitError("Something went wrong. Please try again.");
    }
  }

  const isSubmitting = form.formState.isSubmitting;
  const emailError = form.formState.errors.email?.message;
  const turnstileError = form.formState.errors.turnstileToken?.message;
  const isFooter = surface === "footer";

  const statusClassName = isFooter
    ? "text-footer-muted"
    : "text-muted-foreground";
  const errorClassName = isFooter
    ? "text-footer-accent"
    : "text-destructive";
  const privacyClassName = isFooter
    ? "text-footer-muted"
    : "text-muted-foreground";

  return (
    <form
      className={cn("relative", formClassName)}
      noValidate
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <HoneypotField
        id={`${emailInputId}-website`}
        registration={form.register(HONEYPOT_FIELD_NAME)}
      />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3">
        <div className="flex-1">
          <label htmlFor={emailInputId} className="sr-only">
            {emailLabel}
          </label>
          <Input
            id={emailInputId}
            type="email"
            autoComplete="email"
            placeholder={emailPlaceholder}
            aria-invalid={!!emailError}
            disabled={isSubmitting}
            className={cn("h-10 sm:h-9", inputClassName)}
            {...form.register("email")}
          />
        </div>
        <Button
          type="submit"
          disabled={isSubmitting || !hasTurnstileToken}
          className={cn("h-10 w-full shrink-0 sm:h-9 sm:w-auto", buttonClassName)}
        >
          {isSubmitting ? "Subscribing…" : submitLabel}
        </Button>
      </div>

      <div className="mt-3">
        <TurnstileWidget
          key={turnstileKey}
          siteKey={turnstileSiteKey}
          onToken={(token) => {
            setHasTurnstileToken(Boolean(token));
            form.setValue("turnstileToken", token, {
              shouldValidate: true,
              shouldDirty: true,
            });
            form.clearErrors("turnstileToken");
          }}
          onExpire={() => {
            setHasTurnstileToken(false);
            form.setValue("turnstileToken", "");
            form.setError("turnstileToken", {
              type: "manual",
              message: "Please complete the security check.",
            });
          }}
          onError={() => {
            setHasTurnstileToken(false);
            form.setValue("turnstileToken", "");
            form.setError("turnstileToken", {
              type: "manual",
              message: "Please complete the security check.",
            });
          }}
        />
      </div>

      {emailError ? (
        <p className={cn("mt-2 text-sm", errorClassName)} role="alert">
          {emailError}
        </p>
      ) : null}

      {turnstileError ? (
        <p className={cn("mt-2 text-sm", errorClassName)} role="alert">
          {turnstileError}
        </p>
      ) : null}

      {submitError ? (
        <p className={cn("mt-2 text-sm", errorClassName)} role="alert">
          {submitError}
        </p>
      ) : null}

      {statusMessage ? (
        <p
          className={cn("mt-2 text-sm", statusClassName)}
          role="status"
          aria-live="polite"
        >
          {statusMessage}
        </p>
      ) : null}

      {privacyNote ? (
        <p
          className={cn(
            "mt-3 text-pretty text-xs leading-relaxed",
            privacyClassName,
            privacyNoteClassName,
          )}
        >
          {privacyNote}
        </p>
      ) : null}
    </form>
  );
}
