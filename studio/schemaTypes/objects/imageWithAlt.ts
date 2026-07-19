import { defineField, defineType } from "sanity";

/**
 * Native Sanity image type with required alt text.
 * Prefer this over wrapping `type: "image"` inside an object field named `asset`
 * (that nesting can leave temporary `_upload` state on the asset reference and
 * cause "Key _upload not allowed in ref" mutation errors).
 */
export const imageWithAlt = defineType({
  name: "imageWithAlt",
  title: "Image",
  type: "image",
  options: {
    hotspot: true,
  },
  fields: [
    defineField({
      name: "alt",
      title: "Alternative text",
      type: "string",
      description:
        "Describe the image for screen readers and SEO. Required for accessibility.",
      validation: (rule) =>
        rule
          .required()
          .min(2)
          .max(200)
          .error("Alt text is required (2–200 characters)"),
    }),
  ],
  preview: {
    select: {
      title: "alt",
      media: "asset",
    },
    prepare({ title, media }) {
      return {
        title: title || "Image",
        media,
      };
    },
  },
});
