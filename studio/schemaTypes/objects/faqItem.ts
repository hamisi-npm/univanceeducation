import { defineField, defineType } from "sanity";

import { requiredString } from "../fields/validators";

export const faqItem = defineType({
  name: "faqItem",
  title: "FAQ item",
  type: "object",
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      validation: requiredString("A question is required", 200),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "richText",
      validation: (rule) =>
        rule.required().error("An answer is required").min(1),
    }),
  ],
  preview: {
    select: {
      title: "question",
    },
  },
});
