import { defineField, defineType } from "sanity";

import { processStepIconOptions } from "../../fields/iconOptions";
import { requiredString, requiredText } from "../../fields/validators";

export const processStep = defineType({
  name: "processStep",
  title: "Process step",
  type: "document",
  fields: [
    defineField({
      name: "step",
      title: "Step number",
      type: "number",
      validation: (rule) => rule.required().min(1).integer(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: requiredString("Title is required", 120),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: requiredText("Description is required", 400),
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: {
        list: [...processStepIconOptions],
        layout: "dropdown",
      },
      validation: requiredString("Select an icon"),
    }),
  ],
  orderings: [
    {
      title: "Step order",
      name: "stepAsc",
      by: [{ field: "step", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "step",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Process step",
        subtitle: subtitle ? `Step ${subtitle}` : undefined,
      };
    },
  },
});
