import { defineField, defineType } from "sanity";

import {
  limits,
  requiredHref,
  requiredString,
} from "../fields/validators";

export const ctaLink = defineType({
  name: "ctaLink",
  title: "CTA link",
  type: "object",
  description: "Call-to-action link with label and destination.",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: requiredString("A label is required", limits.shortLabel),
    }),
    defineField({
      name: "href",
      title: "Link",
      type: "string",
      description: "Internal path (/contact) or absolute URL (https://…).",
      validation: requiredHref,
    }),
    defineField({
      name: "external",
      title: "Open in new tab",
      type: "boolean",
      description: "Enable for external URLs (adds rel=\"noopener noreferrer\").",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "label",
      subtitle: "href",
    },
  },
});
