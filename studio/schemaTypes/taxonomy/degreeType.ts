import { defineField, defineType } from "sanity";

import { orderField, slugField } from "../fields";
import { limits, requiredString } from "../fields/validators";

export const degreeType = defineType({
  name: "degreeType",
  title: "Degree type",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: requiredString("Name is required", limits.heading),
    }),
    slugField("name"),
    orderField(),
  ],
  orderings: [
    {
      title: "Sort order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "slug.current" },
  },
});
