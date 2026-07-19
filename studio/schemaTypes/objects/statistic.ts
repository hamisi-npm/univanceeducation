import { defineField, defineType } from "sanity";

import { limits, requiredString } from "../fields/validators";

export const statistic = defineType({
  name: "statistic",
  title: "Statistic",
  type: "object",
  description: "Trust metric displayed as a large value with a label.",
  fields: [
    defineField({
      name: "value",
      title: "Value",
      type: "string",
      description: 'Displayed number or percentage, e.g. "2,400+" or "94%".',
      validation: requiredString("A value is required", 24),
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description: 'Short description, e.g. "Students placed".',
      validation: requiredString("A label is required", limits.shortLabel),
    }),
    defineField({
      name: "footnote",
      title: "Footnote",
      type: "string",
      description: 'Optional context, e.g. "Last 3 years".',
      validation: (rule) => rule.max(limits.footnote),
    }),
  ],
  preview: {
    select: {
      title: "value",
      subtitle: "label",
    },
  },
});
