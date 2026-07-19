import { defineField, defineType } from "sanity";

import {
  limits,
  requiredHref,
  requiredString,
} from "../fields/validators";

const buttonVariants = [
  { title: "Primary", value: "default" },
  { title: "Outline", value: "outline" },
  { title: "Secondary", value: "secondary" },
  { title: "Ghost", value: "ghost" },
  { title: "Link", value: "link" },
] as const;

const buttonSizes = [
  { title: "Default", value: "default" },
  { title: "Small", value: "sm" },
  { title: "Large", value: "lg" },
] as const;

export const button = defineType({
  name: "button",
  title: "Button",
  type: "object",
  description:
    "Styled action control — extends CTA link with visual variant and size.",
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
      initialValue: false,
    }),
    defineField({
      name: "variant",
      title: "Variant",
      type: "string",
      options: {
        list: [...buttonVariants],
        layout: "radio",
      },
      initialValue: "default",
    }),
    defineField({
      name: "size",
      title: "Size",
      type: "string",
      options: {
        list: [...buttonSizes],
        layout: "radio",
      },
      initialValue: "default",
    }),
  ],
  preview: {
    select: {
      title: "label",
      subtitle: "variant",
      href: "href",
    },
    prepare({ title, subtitle, href }) {
      return {
        title: title || "Button",
        subtitle: [subtitle, href].filter(Boolean).join(" · "),
      };
    },
  },
});
