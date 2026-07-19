import { defineField } from "sanity";
import type { SlugRule } from "@sanity/types";

import { limits } from './validators';

export function slugField(source: string | string[] = "title") {
  return defineField({
    name: "slug",
    title: "Slug",
    type: "slug",
    options: {
      source,
      maxLength: limits.slugSegment,
    },
    validation: (rule: SlugRule) =>
      rule.required().custom((slug) => {
        if (!slug?.current?.trim()) {
          return "Slug is required";
        }

        return true;
      }),
  });
}

export function seoField() {
  return defineField({
    name: "seo",
    title: "SEO",
    type: "seo",
  });
}

export function orderField(description = "Lower numbers appear first.") {
  return defineField({
    name: "order",
    title: "Sort order",
    type: "number",
    description,
    initialValue: 0,
    validation: (rule) => rule.min(0).integer(),
  });
}

export function publishedAtField() {
  return defineField({
    name: "publishedAt",
    title: "Published at",
    type: "datetime",
    description: "Optional publish date for sorting and display.",
  });
}
