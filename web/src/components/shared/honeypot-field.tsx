"use client";

import type { UseFormRegisterReturn } from "react-hook-form";

import { cn } from "@/lib/utils";

/** Field name expected by `assertHoneypotEmpty()`. */
export const HONEYPOT_FIELD_NAME = "website" as const;

/**
 * Off-screen honeypot container — stays in the DOM for bots that fill
 * every input. Avoid `display:none` / `visibility:hidden` / `hidden`.
 */
export const honeypotFieldClassName =
  "pointer-events-none absolute -left-[9999px] top-auto h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 opacity-0";

type HoneypotFieldProps = {
  /** Unique id when multiple forms appear on one page. */
  id: string;
  registration: UseFormRegisterReturn;
  className?: string;
};

/**
 * Hidden honeypot input for public forms. Legitimate users never see or
 * tab into it; bots that autofill `website` are rejected server-side.
 */
export function HoneypotField({
  id,
  registration,
  className,
}: HoneypotFieldProps) {
  return (
    <div className={cn(honeypotFieldClassName, className)} aria-hidden="true">
      <label htmlFor={id}>Website</label>
      <input
        id={id}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        {...registration}
      />
    </div>
  );
}
