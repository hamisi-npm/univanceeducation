"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { GraduationCap, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { ProgramFinderContent } from "@/features/home/types";
import { buttonStyles, focusRing } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

type ProgramFinderProps = {
  content: ProgramFinderContent;
  className?: string;
};

function buildProgramsHref(
  baseHref: string,
  values: { destination: string; category: string; level: string },
  visibility: {
    showDestination: boolean;
    showCourse: boolean;
    showStudyLevel: boolean;
  },
): string {
  const params = new URLSearchParams();

  if (visibility.showDestination && values.destination) {
    params.set("destination", values.destination);
  }
  if (visibility.showCourse && values.category) {
    params.set("category", values.category);
  }
  if (visibility.showStudyLevel && values.level) {
    params.set("level", values.level);
  }

  const path = baseHref.split("?")[0] || "/programs";
  const query = params.toString();
  return query ? `${path}?${query}` : path;
}

export function ProgramFinder({ content, className }: ProgramFinderProps) {
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const href = buildProgramsHref(
      content.cta.href || "/programs",
      { destination, category, level },
      {
        showDestination: content.showDestination,
        showCourse: content.showCourse,
        showStudyLevel: content.showStudyLevel,
      },
    );

    if (content.cta.external) {
      window.location.assign(href);
      return;
    }

    router.push(href);
  }

  const fields = [
    content.showDestination
      ? {
          key: "destination",
          label: content.destinationLabel,
          placeholder: content.destinationPlaceholder,
          value: destination,
          onChange: setDestination,
          options: content.destinations,
        }
      : null,
    content.showCourse
      ? {
          key: "category",
          label: content.courseLabel,
          placeholder: content.coursePlaceholder,
          value: category,
          onChange: setCategory,
          options: content.categories,
        }
      : null,
    content.showStudyLevel
      ? {
          key: "level",
          label: content.studyLevelLabel,
          placeholder: content.studyLevelPlaceholder,
          value: level,
          onChange: setLevel,
          options: content.levels,
        }
      : null,
  ].filter(Boolean) as Array<{
    key: string;
    label: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    options: Array<{ value: string; label: string }>;
  }>;

  const themeClass =
    content.backgroundTheme === "navy"
      ? "bg-primary text-white ring-white/10"
      : "bg-brand-beige text-foreground ring-border/60";

  const isDark = content.backgroundTheme === "navy";

  const labelClass = isDark ? "text-white/70" : "text-muted-foreground";

  const selectClass = isDark
    ? "border-white/15 bg-white/5 text-white hover:border-white/25 focus:border-brand-beige focus:ring-brand-beige/40"
    : "border-border bg-white text-foreground hover:border-primary/30 focus:border-primary focus:ring-primary/40";

  return (
    <form
      onSubmit={handleSubmit}
      aria-label={content.heading}
      className={cn(
        "flex flex-col gap-4 rounded-2xl p-4 shadow-xl shadow-black/10 ring-1 sm:p-5 lg:flex-row lg:items-end lg:gap-5",
        themeClass,
        className,
      )}
    >
      <div className="flex min-w-0 items-center gap-3 lg:max-w-xs lg:shrink-0">
        <div
          className={cn(
            "flex size-11 shrink-0 items-center justify-center rounded-xl",
            isDark
              ? "bg-brand-navy text-white"
              : "bg-brand-navy/10 text-brand-navy",
          )}
        >
          <GraduationCap className="size-5" aria-hidden="true" />
        </div>
        <div className="min-w-0 space-y-0.5">
          <p
            className={cn(
              "text-sm font-semibold leading-snug sm:text-base",
              isDark ? "text-white" : "text-foreground",
            )}
          >
            {content.heading}
          </p>
          {content.description ? (
            <p className={cn("text-xs", labelClass)}>{content.description}</p>
          ) : null}
        </div>
      </div>

      {fields.length > 0 ? (
        <div
          className={cn(
            "grid flex-1 gap-3",
            fields.length === 1 && "sm:grid-cols-1",
            fields.length === 2 && "sm:grid-cols-2",
            fields.length >= 3 && "sm:grid-cols-3",
          )}
        >
          {fields.map((field) => (
            <div key={field.key} className="min-w-0 space-y-1.5">
              <label
                htmlFor={`program-finder-${field.key}`}
                className={cn("block text-xs font-medium", labelClass)}
              >
                {field.label}
              </label>
              <select
                id={`program-finder-${field.key}`}
                name={field.key}
                value={field.value}
                onChange={(event) => field.onChange(event.target.value)}
                className={cn(
                  "h-11 w-full rounded-lg border px-3 text-sm outline-none focus:ring-1",
                  selectClass,
                  focusRing,
                )}
              >
                <option value="" className="text-foreground">
                  {field.placeholder}
                </option>
                {field.options.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    className="text-foreground"
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      ) : null}

      <Button
        type="submit"
        size="lg"
        className={cn(
          buttonStyles.gold,
          "h-11 w-full shrink-0 gap-2 px-5 text-sm font-semibold lg:w-auto",
        )}
      >
        <Search className="size-4" aria-hidden="true" />
        {content.cta.label}
      </Button>
    </form>
  );
}
