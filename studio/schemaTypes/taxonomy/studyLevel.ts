import { defineField, defineType } from "sanity";

import { orderField, slugField } from "../fields";
import { popularCourseIconOptions } from "../fields/iconOptions";
import { limits, requiredString } from "../fields/validators";

export const studyLevel = defineType({
  name: "studyLevel",
  title: "Study level",
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
      rows: 2,
      validation: (rule) => rule.max(300),
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: { list: [...popularCourseIconOptions], layout: "dropdown" },
      validation: requiredString("Select an icon"),
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
