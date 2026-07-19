import { defineField, defineType } from "sanity";

import { limits, requiredString } from "../fields/validators";

export const sectionHeader = defineType({
  name: "sectionHeader",
  title: "Section header",
  type: "object",
  description: "Eyebrow badge, heading, and supporting copy for a page section.",
  fields: [
    defineField({
      name: "badge",
      title: "Badge",
      type: "string",
      description: "Optional eyebrow label above the heading.",
      validation: (rule) => rule.max(limits.badge),
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: requiredString("A heading is required", limits.heading),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "Supporting paragraph below the heading.",
      validation: (rule) => rule.max(500),
    }),
  ],
  preview: {
    select: {
      title: "heading",
      subtitle: "badge",
    },
  },
});
