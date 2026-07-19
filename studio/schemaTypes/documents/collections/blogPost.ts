import { defineField, defineType } from "sanity";

import { seoField, slugField } from "../../fields";
import {
  limits,
  requiredString,
  requiredText,
} from "../../fields/validators";

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog post",
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
      to: [{ type: "blogCategory" }],
      validation: (rule) => rule.required().error("Category is required"),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      group: "content",
      to: [{ type: "author" }],
      validation: (rule) => rule.required().error("Author is required"),
    }),
    defineField({
      name: "date",
      title: "Publish date",
      type: "datetime",
      group: "content",
      validation: (rule) => rule.required().error("Publish date is required"),
    }),
    defineField({
      name: "readTime",
      title: "Read time",
      type: "string",
      group: "content",
      description: 'e.g. "6 min read"',
      validation: requiredString("Read time is required", 40),
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "imageWithAlt",
      group: "content",
      validation: (rule) => rule.required().error("Cover image is required"),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      group: "content",
      validation: requiredText("Summary is required", 400),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "richText",
      group: "content",
      validation: (rule) =>
        rule.required().error("Body is required").min(1),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      group: "content",
      initialValue: false,
    }),
    seoField(),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category.label",
      media: "coverImage.asset",
      date: "date",
    },
    prepare({ title, subtitle, media, date }) {
      return {
        title,
        subtitle: [subtitle, date ? new Date(date).toLocaleDateString() : null]
          .filter(Boolean)
          .join(" · "),
        media,
      };
    },
  },
});
