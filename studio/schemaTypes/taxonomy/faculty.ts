import { defineField, defineType } from "sanity";

import { orderField, slugField } from "../fields";
import { limits, requiredString } from "../fields/validators";

export const faculty = defineType({
  name: "faculty",
  title: "Faculty",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: requiredString("Name is required", limits.heading),
    }),
    slugField("name"),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(400),
    }),
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
