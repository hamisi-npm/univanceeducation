"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, type Resolver } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  HONEYPOT_FIELD_NAME,
  HoneypotField,
} from "@/components/shared/honeypot-field";
import {
  resetTurnstileWidget,
  TurnstileWidget,
} from "@/components/shared/turnstile-widget";
import { API_ROUTES } from "@/constants/operational";
import type { ConsultationFormContent } from "@/features/contact/types";
import {
  consultationFormSchema,
  type ConsultationFormValues,
} from "@/features/consultations/validation";
import { ApiClientError, postJson } from "@/lib/api/client";
import { cardStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

type ConsultationFormProps = {
  content: ConsultationFormContent;
  turnstileSiteKey: string;
  className?: string;
};

export function ConsultationForm({
  content,
  turnstileSiteKey,
  className,
}: ConsultationFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [turnstileWidgetId, setTurnstileWidgetId] = useState<string | null>(
    null,
  );

  const form = useForm<ConsultationFormValues>({
    resolver: zodResolver(
      consultationFormSchema,
    ) as Resolver<ConsultationFormValues>,
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      preferredDestination: "",
      preferredIntake: "",
      studyLevel: "",
      message: "",
      website: "",
      turnstileToken: "",
    },
  });

  async function onSubmit(values: ConsultationFormValues) {
    setSubmitError(null);

    if (!values.turnstileToken?.trim()) {
      form.setError("turnstileToken", {
        type: "manual",
        message: "Please complete the security check.",
      });
      return;
    }

    try {
      await postJson(API_ROUTES.contact, values);
      setSubmitted(true);
      form.reset();
      resetTurnstileWidget(turnstileWidgetId);
    } catch (error) {
      resetTurnstileWidget(turnstileWidgetId);
      form.setValue("turnstileToken", "");

      if (error instanceof ApiClientError) {
        setSubmitError(error.message);
        return;
      }

      setSubmitError("Something went wrong. Please try again.");
    }
  }

  if (submitted) {
    return (
      <div
        className={cn(
          cardStyles.base,
          cardStyles.padding,
          "space-y-3 text-center",
          className,
        )}
        role="status"
        aria-live="polite"
      >
        <h3 className="text-lg font-medium tracking-tight text-foreground">
          {content.successTitle}
        </h3>
        <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
          {content.successMessage}
        </p>
      </div>
    );
  }

  const isSubmitting = form.formState.isSubmitting;
  const turnstileError = form.formState.errors.turnstileToken;

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      noValidate
      className={cn(
        cardStyles.base,
        cardStyles.padding,
        "relative",
        className,
      )}
    >
      <HoneypotField
        id="consultation-website"
        registration={form.register(HONEYPOT_FIELD_NAME)}
      />
      <FieldGroup>
        <Field data-invalid={!!form.formState.errors.fullName}>
          <FieldLabel htmlFor="fullName">{content.fields.fullName.label}</FieldLabel>
          <Input
            id="fullName"
            autoComplete="name"
            placeholder={content.fields.fullName.placeholder}
            aria-invalid={!!form.formState.errors.fullName}
            className="h-10"
            disabled={isSubmitting}
            {...form.register("fullName")}
          />
          <FieldError errors={[form.formState.errors.fullName]} />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field data-invalid={!!form.formState.errors.email}>
            <FieldLabel htmlFor="email">{content.fields.email.label}</FieldLabel>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder={content.fields.email.placeholder}
              aria-invalid={!!form.formState.errors.email}
              className="h-10"
              disabled={isSubmitting}
              {...form.register("email")}
            />
            <FieldError errors={[form.formState.errors.email]} />
          </Field>

          <Field data-invalid={!!form.formState.errors.phone}>
            <FieldLabel htmlFor="phone">{content.fields.phone.label}</FieldLabel>
            <Input
              id="phone"
              type="tel"
              autoComplete="tel"
              placeholder={content.fields.phone.placeholder}
              aria-invalid={!!form.formState.errors.phone}
              className="h-10"
              disabled={isSubmitting}
              {...form.register("phone")}
            />
            <FieldError errors={[form.formState.errors.phone]} />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <Field data-invalid={!!form.formState.errors.preferredDestination}>
            <FieldLabel htmlFor="preferredDestination">
              {content.fields.preferredDestination.label}
            </FieldLabel>
            <Controller
              control={form.control}
              name="preferredDestination"
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={isSubmitting}
                >
                  <SelectTrigger
                    id="preferredDestination"
                    className="w-full"
                    aria-invalid={!!form.formState.errors.preferredDestination}
                  >
                    <SelectValue
                      placeholder={content.fields.preferredDestination.placeholder}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {content.destinationOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError errors={[form.formState.errors.preferredDestination]} />
          </Field>

          <Field data-invalid={!!form.formState.errors.preferredIntake}>
            <FieldLabel htmlFor="preferredIntake">
              {content.fields.preferredIntake.label}
            </FieldLabel>
            <Controller
              control={form.control}
              name="preferredIntake"
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={isSubmitting}
                >
                  <SelectTrigger
                    id="preferredIntake"
                    className="w-full"
                    aria-invalid={!!form.formState.errors.preferredIntake}
                  >
                    <SelectValue
                      placeholder={content.fields.preferredIntake.placeholder}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {content.intakeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError errors={[form.formState.errors.preferredIntake]} />
          </Field>

          <Field data-invalid={!!form.formState.errors.studyLevel}>
            <FieldLabel htmlFor="studyLevel">
              {content.fields.studyLevel.label}
            </FieldLabel>
            <Controller
              control={form.control}
              name="studyLevel"
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={isSubmitting}
                >
                  <SelectTrigger
                    id="studyLevel"
                    className="w-full"
                    aria-invalid={!!form.formState.errors.studyLevel}
                  >
                    <SelectValue
                      placeholder={content.fields.studyLevel.placeholder}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {content.studyLevelOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError errors={[form.formState.errors.studyLevel]} />
          </Field>
        </div>

        <Field data-invalid={!!form.formState.errors.message}>
          <FieldLabel htmlFor="message">{content.fields.message.label}</FieldLabel>
          <Textarea
            id="message"
            rows={5}
            placeholder={content.fields.message.placeholder}
            aria-invalid={!!form.formState.errors.message}
            disabled={isSubmitting}
            {...form.register("message")}
          />
          <FieldError errors={[form.formState.errors.message]} />
        </Field>

        <Field data-invalid={!!turnstileError}>
          <FieldLabel className="sr-only">Security check</FieldLabel>
          <TurnstileWidget
            siteKey={turnstileSiteKey}
            onToken={(token) => {
              form.setValue("turnstileToken", token, {
                shouldValidate: true,
                shouldDirty: true,
              });
              form.clearErrors("turnstileToken");
            }}
            onExpire={() => {
              form.setValue("turnstileToken", "");
              form.setError("turnstileToken", {
                type: "manual",
                message: "Please complete the security check.",
              });
            }}
            onError={() => {
              form.setValue("turnstileToken", "");
              form.setError("turnstileToken", {
                type: "manual",
                message: "Please complete the security check.",
              });
            }}
            onWidgetId={setTurnstileWidgetId}
          />
          <FieldError errors={[turnstileError]} />
        </Field>

        {submitError ? (
          <p className="text-sm text-destructive" role="alert">
            {submitError}
          </p>
        ) : null}

        <Button type="submit" className="h-10 w-full sm:w-auto" disabled={isSubmitting}>
          {isSubmitting ? "Sending…" : content.submitLabel}
        </Button>
      </FieldGroup>
    </form>
  );
}
