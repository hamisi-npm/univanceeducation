import { defineField, defineType } from "sanity";

import { limits, requiredString } from "../fields/validators";

export const selectOption = defineType({
  name: "selectOption",
  title: "Select option",
  type: "object",
  description: "Label/value pair for form selects and filter options.",
  fields: [
    defineField({
      name: "value",
      title: "Value",
      type: "string",
      description: "Stored value (slug-safe, no spaces).",
      validation: (rule) =>
        rule
          .required()
          .max(limits.slugSegment)
          .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
            name: "slug",
            invert: false,
          })
          .error("Use lowercase letters, numbers, and hyphens only"),
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description: "Human-readable label shown in the UI.",
      validation: requiredString("A label is required", limits.shortLabel),
    }),
  ],
  preview: {
    select: {
      title: "label",
      subtitle: "value",
    },
  },
});
