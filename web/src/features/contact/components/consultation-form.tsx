"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

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
import type { ConsultationFormContent } from "@/features/contact/types";
import {
  consultationFormSchema,
  type ConsultationFormValues,
} from "@/features/contact/data/consultation-schema";
import { cardStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

type ConsultationFormProps = {
  content: ConsultationFormContent;
  className?: string;
};

export function ConsultationForm({ content, className }: ConsultationFormProps) {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ConsultationFormValues>({
    resolver: zodResolver(consultationFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      preferredDestination: "",
      preferredIntake: "",
      studyLevel: "",
      message: "",
    },
  });

  function onSubmit() {
    setSubmitted(true);
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

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      noValidate
      className={cn(
        cardStyles.base,
        cardStyles.padding,
        className,
      )}
    >
      <FieldGroup>
        <Field data-invalid={!!form.formState.errors.fullName}>
          <FieldLabel htmlFor="fullName">{content.fields.fullName.label}</FieldLabel>
          <Input
            id="fullName"
            autoComplete="name"
            placeholder={content.fields.fullName.placeholder}
            aria-invalid={!!form.formState.errors.fullName}
            className="h-10"
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
                <Select value={field.value} onValueChange={field.onChange}>
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
                <Select value={field.value} onValueChange={field.onChange}>
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
                <Select value={field.value} onValueChange={field.onChange}>
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
            {...form.register("message")}
          />
          <FieldError errors={[form.formState.errors.message]} />
        </Field>

        <Button type="submit" className="h-10 w-full sm:w-auto">
          {content.submitLabel}
        </Button>
      </FieldGroup>
    </form>
  );
}
