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

export const destination = defineType({
  name: "destination",
  title: "Destination",
  type: "document",
  groups: [
    { name: "content", title: "Card", default: true },
    { name: "detail", title: "Detail page" },
    { name: "relations", title: "Relations" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "country",
      title: "Country",
      type: "string",
      group: "content",
      validation: requiredString("Country name is required", limits.shortLabel),
    }),
    slugField("country"),
    defineField({
      name: "flag",
      title: "Flag emoji",
      type: "string",
      group: "content",
      description: "Country flag emoji, e.g. 🇨🇦",
      validation: requiredString("Flag emoji is required", 8),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      group: "content",
      description: "Short excerpt for listing cards.",
      validation: requiredText("Description is required", 500),
    }),
    defineField({
      name: "studyFields",
      title: "Popular study fields",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.required().min(1).max(12),
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
      title: "Card image",
      type: "imageWithAlt",
      group: "content",
      validation: (rule) => rule.required().error("Card image is required"),
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
      description: 'Card button text, e.g. "Explore Canada".',
      validation: requiredString("CTA label is required", limits.shortLabel),
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "imageWithAlt",
      group: "detail",
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      group: "detail",
      of: [defineArrayMember({ type: "imageWithAlt" })],
      validation: (rule) => rule.max(12),
    }),
    defineField({
      name: "overview",
      title: "Overview",
      type: "richText",
      group: "detail",
    }),
    defineField({
      name: "livingCost",
      title: "Living cost",
      type: "string",
      group: "detail",
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: "duration",
      title: "Typical duration",
      type: "string",
      group: "detail",
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: "workRights",
      title: "Work rights",
      type: "text",
      rows: 3,
      group: "detail",
    }),
    defineField({
      name: "visaInformation",
      title: "Visa information",
      type: "richText",
      group: "detail",
    }),
    defineField({
      name: "scholarships",
      title: "Scholarships",
      type: "richText",
      group: "detail",
    }),
    defineField({
      name: "universities",
      title: "Universities",
      type: "array",
      group: "relations",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "university" }],
        }),
      ],
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      group: "relations",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "testimonial" }],
        }),
      ],
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
      title: "Country A–Z",
      name: "countryAsc",
      by: [{ field: "country", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "country",
      subtitle: "slug.current",
      media: "image.asset",
    },
  },
});
