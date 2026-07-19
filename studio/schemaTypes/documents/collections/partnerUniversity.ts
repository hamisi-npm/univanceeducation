import { defineField, defineType } from "sanity";

import { orderField } from "../../fields";
import { requiredString } from "../../fields/validators";

export const partnerUniversity = defineType({
  name: "partnerUniversity",
  title: "Partner university",
  type: "document",
  description: "Trusted university logos/names shown on the homepage.",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: requiredString("Name is required", 120),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "imageWithAlt",
    }),
    defineField({
      name: "university",
      title: "Linked university",
      type: "reference",
      description: "Optional link to a full university profile.",
      to: [{ type: "university" }],
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
      title: "name",
      subtitle: "university.name",
      media: "logo.asset",
    },
  },
});