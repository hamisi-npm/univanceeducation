import { defineField, defineType } from "sanity";

import { orderField, seoField, slugField } from "../fields";
import { popularCourseIconOptions } from "../fields/iconOptions";
import { limits, requiredString } from "../fields/validators";

export const courseCategory = defineType({
  name: "courseCategory",
  title: "Course category",
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
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: { list: [...popularCourseIconOptions], layout: "dropdown" },
      validation: requiredString("Select an icon"),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    orderField(),
    seoField(),
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
