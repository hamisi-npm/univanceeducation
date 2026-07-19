import { defineField, defineType } from "sanity";

import { requiredString, requiredText } from "../../fields/validators";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "Display name, e.g. first name + initial.",
      validation: requiredString("Name is required", 80),
    }),
    defineField({
      name: "destination",
      title: "Destination",
      type: "reference",
      to: [{ type: "destination" }],
      validation: (rule) => rule.required().error("Destination is required"),
    }),
    defineField({
      name: "university",
      title: "University",
      type: "reference",
      to: [{ type: "university" }],
      validation: (rule) => rule.required().error("University is required"),
    }),
    defineField({
      name: "course",
      title: "Course",
      type: "string",
      validation: requiredString("Course is required", 120),
    }),
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      validation: (rule) =>
        rule.required().min(1).max(5).integer().error("Rating must be 1–5"),
    }),
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 4,
      validation: requiredText("Quote is required", 600),
    }),
    defineField({
      name: "image",
      title: "Photo",
      type: "imageWithAlt",
      validation: (rule) => rule.required().error("Photo is required"),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "course",
      media: "image.asset",
      rating: "rating",
    },
    prepare({ title, subtitle, media, rating }) {
      return {
        title,
        subtitle: [subtitle, rating ? `${rating}/5` : null].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});
