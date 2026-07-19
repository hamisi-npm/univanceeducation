import { defineField, defineType } from "sanity";

import {
  limits,
  requiredHref,
  requiredString,
} from "../../fields/validators";

/** Card link with title, description, and destination — matches blog guide / resource items. */
export const contentLink = defineType({
  name: "contentLink",
  title: "Content link",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: requiredString("Title is required", limits.shortLabel),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(300),
    }),
    defineField({
      name: "href",
      title: "Link",
      type: "string",
      validation: requiredHref,
    }),
    defineField({
      name: "external",
      title: "Open in new tab",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "href",
    },
  },
});
