import { defineArrayMember, defineField, defineType } from "sanity";

import {
  orderField,
  publishedAtField,
  seoField,
  slugField,
} from "../../fields";
import {
  limits,
  requiredString,
  requiredText,
} from "../../fields/validators";

export const university = defineType({
  name: "university",
  title: "University",
  type: "document",
  groups: [
    { name: "content", title: "Card", default: true },
    { name: "detail", title: "Detail page" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      group: "content",
      validation: requiredString("University name is required", limits.heading),
    }),
    slugField("name"),
    defineField({
      name: "destination",
      title: "Destination",
      type: "reference",
      group: "content",
      to: [{ type: "destination" }],
      validation: (rule) => rule.required().error("Destination is required"),
    }),
    defineField({
      name: "city",
      title: "City",
      type: "string",
      group: "content",
      validation: requiredString("City is required", limits.shortLabel),
    }),
    defineField({
      name: "type",
      title: "Institution type",
      type: "string",
      group: "content",
      description: 'e.g. "Public research university"',
      validation: requiredString("Institution type is required", 120),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      group: "content",
      validation: requiredText("Description is required", 600),
    }),
    defineField({
      name: "programs",
      title: "Programs",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.required().min(1).max(20),
    }),
    defineField({
      name: "tuitionRange",
      title: "Tuition range",
      type: "string",
      group: "content",
      validation: requiredString("Tuition range is required", 80),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "imageWithAlt",
      group: "content",
      validation: (rule) => rule.required().error("Image is required"),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      group: "content",
      initialValue: false,
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA label",
      type: "string",
      group: "content",
      validation: requiredString("CTA label is required", limits.shortLabel),
    }),
    defineField({
      name: "ranking",
      title: "Ranking",
      type: "string",
      group: "detail",
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: "scholarships",
      title: "Scholarships",
      type: "richText",
      group: "detail",
    }),
    orderField(),
    publishedAtField(),
    seoField(),
  ],
  orderings: [
    {
      title: "Sort order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Name A–Z",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "destination.country",
      media: "image.asset",
    },
  },
});
