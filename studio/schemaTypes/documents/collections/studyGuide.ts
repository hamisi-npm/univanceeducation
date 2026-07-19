import { defineField, defineType } from "sanity";

import { seoField, slugField } from "../../fields";
import {
  limits,
  requiredString,
  requiredText,
} from "../../fields/validators";

export const studyGuide = defineType({
  name: "studyGuide",
  title: "Study guide",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: requiredString("Title is required", limits.heading),
    }),
    slugField("title"),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      group: "content",
      to: [{ type: "studyGuideCategory" }],
      validation: (rule) => rule.required().error("Category is required"),
    }),
    defineField({
      name: "readTime",
      title: "Read time",
      type: "string",
      group: "content",
      validation: requiredString("Read time is required", 40),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      group: "content",
      validation: requiredText("Description is required", 400),
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "imageWithAlt",
      group: "content",
      validation: (rule) => rule.required().error("Cover image is required"),
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA label",
      type: "string",
      group: "content",
      validation: requiredString("CTA label is required", limits.shortLabel),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "richText",
      group: "content",
    }),
    seoField(),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category.label",
      media: "coverImage.asset",
    },
  },
});
