import { defineField, defineType } from "sanity";

import { slugField } from "../fields";
import { requiredString } from "../fields/validators";

export const blogCategory = defineType({
  name: "blogCategory",
  title: "Blog category",
  type: "document",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: requiredString("Label is required", 80),
    }),
    slugField("label"),
  ],
  preview: {
    select: { title: "label", subtitle: "slug.current" },
  },
});
