import { defineField, defineType } from "sanity";

import { slugField } from "../../fields";
import { requiredString } from "../../fields/validators";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: requiredString("Name is required", 120),
    }),
    slugField("name"),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(500),
    }),
    defineField({
      name: "image",
      title: "Photo",
      type: "imageWithAlt",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "slug.current",
      media: "image.asset",
    },
  },
});
