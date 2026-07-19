import { defineField, defineType } from "sanity";

import { orderField } from "../../fields";
import { requiredString, requiredText } from "../../fields/validators";

export const teamMember = defineType({
  name: "teamMember",
  title: "Team member",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: requiredString("Name is required", 120),
    }),
    defineField({
      name: "position",
      title: "Position",
      type: "string",
      validation: requiredString("Position is required", 120),
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 4,
      validation: requiredText("Bio is required", 600),
    }),
    defineField({
      name: "image",
      title: "Photo",
      type: "imageWithAlt",
      validation: (rule) => rule.required().error("Photo is required"),
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
      subtitle: "position",
      media: "image.asset",
    },
  },
});
