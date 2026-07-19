import { defineArrayMember, defineField, defineType } from "sanity";

import {
  limits,
  optionalUrl,
} from "../fields/validators";

const robotsOptions = [
  { title: "Index, follow (default)", value: "index,follow" },
  { title: "No index, follow", value: "noindex,follow" },
  { title: "Index, no follow", value: "index,nofollow" },
  { title: "No index, no follow", value: "noindex,nofollow" },
] as const;

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  description: "Search and social metadata. Falls back to document title when empty.",
  groups: [
    { name: "meta", title: "Meta", default: true },
    { name: "social", title: "Social" },
    { name: "advanced", title: "Advanced" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Meta title",
      type: "string",
      group: "meta",
      description: `Recommended ≤ ${limits.seoTitle} characters.`,
      validation: (rule) =>
        rule.max(limits.seoTitle).warning(`Keep under ${limits.seoTitle} characters for best results`),
    }),
    defineField({
      name: "description",
      title: "Meta description",
      type: "text",
      rows: 3,
      group: "meta",
      description: `Recommended ≤ ${limits.seoDescription} characters.`,
      validation: (rule) =>
        rule
          .max(limits.seoDescription)
          .warning(`Keep under ${limits.seoDescription} characters for best results`),
    }),
    defineField({
      name: "canonical",
      title: "Canonical URL",
      type: "url",
      group: "meta",
      description: "Absolute URL override. Leave empty to use the page default.",
      validation: optionalUrl,
    }),
    defineField({
      name: "robots",
      title: "Robots",
      type: "string",
      group: "meta",
      description: "Controls index/follow directives for search engines.",
      options: {
        list: [...robotsOptions],
        layout: "radio",
      },
      initialValue: "index,follow",
    }),
    defineField({
      name: "keywords",
      title: "Keywords",
      type: "array",
      group: "meta",
      of: [defineArrayMember({ type: "string" })],
      options: {
        layout: "tags",
      },
      validation: (rule) => rule.max(12).unique(),
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph image",
      type: "imageWithAlt",
      group: "social",
      description: "Recommended 1200×630 px for social sharing previews.",
    }),
    defineField({
      name: "schema",
      title: "JSON-LD override",
      type: "text",
      group: "advanced",
      rows: 6,
      description: "Optional raw JSON-LD schema. Leave empty to use auto-generated schema.",
      validation: (rule) =>
        rule.custom((value: string | undefined) => {
          if (!value?.trim()) {
            return true;
          }

          try {
            JSON.parse(value);
            return true;
          } catch {
            return "Must be valid JSON";
          }
        }),
    }),
  ],
});
