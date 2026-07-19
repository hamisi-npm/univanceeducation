import { defineArrayMember, defineField, defineType } from "sanity";

import {
  singletonDocumentIds,
  singletonDocumentRule,
} from "../../singletons";
import { requiredString } from "../../fields/validators";

export const faqsPage = defineType({
  name: "faqsPage",
  title: "FAQs page",
  type: "document",
  description: `FAQs page content (singleton ID: \`${singletonDocumentIds.faqsPage}\`).`,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "categories", title: "Categories" },
    { name: "cta", title: "CTA banner" },
  ],
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      group: "hero",
      fields: [
        defineField({
          name: "badge",
          title: "Badge",
          type: "string",
          validation: (rule) => rule.max(48),
        }),
        defineField({
          name: "heading",
          title: "Heading",
          type: "string",
          validation: requiredString("Heading is required", 120),
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 3,
          validation: (rule) => rule.required().max(500),
        }),
        defineField({
          name: "cta",
          title: "CTA",
          type: "ctaLink",
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "categories",
      title: "FAQ categories",
      type: "array",
      group: "categories",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "faqCategory" }],
        }),
      ],
      validation: (rule) =>
        rule.required().min(1).error("Add at least one FAQ category"),
    }),
    defineField({
      name: "cta",
      title: "CTA banner",
      type: "ctaBanner",
      group: "cta",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return { title: "FAQs page" };
    },
  },
  validation: singletonDocumentRule("faqsPage"),
});
