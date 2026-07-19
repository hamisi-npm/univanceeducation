"use client";

import { Button } from "@/components/ui/button";
import type { CategoryOption } from "@/features/blog/types";
import { focusRing } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

type CategoryFilterProps = {
  categories: CategoryOption[];
  selectedSlug: string;
  onSelect: (slug: string) => void;
  className?: string;
};

export function CategoryFilter({
  categories,
  selectedSlug,
  onSelect,
  className,
}: CategoryFilterProps) {
  return (
    <div
      role="tablist"
      aria-label="Filter articles by category"
      className={cn("flex flex-wrap justify-center gap-2 sm:justify-start", className)}
    >
      <Button
        type="button"
        role="tab"
        aria-selected={selectedSlug === "all"}
        variant={selectedSlug === "all" ? "default" : "outline"}
        size="sm"
        className={cn("h-9 px-4", focusRing)}
        onClick={() => onSelect("all")}
      >
        All categories
      </Button>
      {categories.map((category) => (
        <Button
          key={category.slug}
          type="button"
          role="tab"
          aria-selected={selectedSlug === category.slug}
          variant={selectedSlug === category.slug ? "default" : "outline"}
          size="sm"
          className={cn("h-9 px-4", focusRing)}
          onClick={() => onSelect(category.slug)}
        >
          {category.label}
        </Button>
      ))}
    </div>
  );
}
