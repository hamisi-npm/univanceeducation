import { defineField, defineType } from "sanity";

import { slugField } from "../fields";
import { requiredString } from "../fields/validators";

export const studyGuideCategory = defineType({
  name: "studyGuideCategory",
  title: "Study guide category",
  type: "document",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: requiredString("Label is required", 80),
    }),
    slugField("label"),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
      validation: (rule) => rule.max(300),
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "slug.current" },
  },
});
