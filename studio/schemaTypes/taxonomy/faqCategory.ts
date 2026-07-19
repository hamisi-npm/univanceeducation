import { defineArrayMember, defineField, defineType } from "sanity";

import { orderField } from "../fields";
import { requiredString } from "../fields/validators";

export const faqCategory = defineType({
  name: "faqCategory",
  title: "FAQ category",
  type: "document",
  description: "Grouped FAQ items for the FAQs page and previews.",
  fields: [
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
      rows: 2,
      validation: (rule) => rule.max(300),
    }),
    defineField({
      name: "items",
      title: "FAQ items",
      type: "array",
      of: [defineArrayMember({ type: "faqItem" })],
      validation: (rule) =>
        rule.required().min(1).error("At least one FAQ item is required"),
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
    select: {
      title: "title",
      items: "items",
    },
    prepare({ title, items }) {
      const count = Array.isArray(items) ? items.length : 0;
      return {
        title: title || "FAQ category",
        subtitle: `${count} question${count === 1 ? "" : "s"}`,
      };
    },
  },
});
