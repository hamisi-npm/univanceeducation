import { defineArrayMember, defineField, defineType } from "sanity";

import {
  orderField,
  publishedAtField,
  seoField,
  slugField,
} from "../../fields";
import { serviceIconOptions } from "../../fields/iconOptions";
import {
  limits,
  requiredString,
  requiredText,
} from "../../fields/validators";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "detail", title: "Detail page" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: requiredString("Title is required", limits.heading),
    }),
    slugField("title"),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      group: "content",
      validation: requiredText("Description is required", 500),
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      group: "content",
      options: {
        list: [...serviceIconOptions],
        layout: "dropdown",
      },
      validation: requiredString("Select an icon"),
    }),
    defineField({
      name: "benefits",
      title: "Benefits",
      type: "array",
      group: "detail",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.max(12),
    }),
    defineField({
      name: "timeline",
      title: "Timeline",
      type: "string",
      group: "detail",
      description: 'e.g. "2–4 weeks"',
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: "cta",
      title: "CTA",
      type: "ctaLink",
      group: "detail",
      description: "Call-to-action for the service detail page and cards.",
    }),
    orderField(),
    publishedAtField(),
    seoField(),
  ],
  orderings: [
    {
      title: "Sort order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "slug.current" },
  },
});
