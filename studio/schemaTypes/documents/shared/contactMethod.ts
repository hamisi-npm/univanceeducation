import { defineField, defineType } from "sanity";

import { contactMethodIconOptions } from "../../fields/iconOptions";
import { requiredString } from "../../fields/validators";

/** Contact method card — matches `ContactMethod` in `features/contact/types`. */
export const contactMethod = defineType({
  name: "contactMethod",
  title: "Contact method",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: requiredString("Title is required", 80),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: "value",
      title: "Value",
      type: "string",
      validation: requiredString("Value is required", 200),
    }),
    defineField({
      name: "href",
      title: "Link",
      type: "string",
      description: "Optional tel:, mailto:, or URL.",
      validation: (rule) =>
        rule.custom((value: string | undefined) => {
          if (!value) {
            return true;
          }

          if (/^(https?:\/\/|mailto:|tel:|\/|#)/.test(value)) {
            return true;
          }

          return "Use an internal path, URL, mailto:, or tel: link";
        }),
    }),
    defineField({
      name: "external",
      title: "Open in new tab",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: {
        list: [...contactMethodIconOptions],
        layout: "dropdown",
      },
      validation: requiredString("Select an icon"),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "value" },
  },
});
