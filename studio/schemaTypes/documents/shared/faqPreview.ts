import { defineArrayMember, defineField, defineType } from "sanity";

/** FAQ preview block used on listing pages — matches `FaqPreviewContent`. */
export const faqPreview = defineType({
  name: "faqPreview",
  title: "FAQ preview",
  type: "object",
  fields: [
    defineField({
      name: "header",
      title: "Section header",
      type: "sectionHeader",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "items",
      title: "FAQ items",
      type: "array",
      of: [defineArrayMember({ type: "faqItem" })],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "viewAll",
      title: "View all link",
      type: "ctaLink",
      validation: (rule) => rule.required(),
    }),
  ],
});
