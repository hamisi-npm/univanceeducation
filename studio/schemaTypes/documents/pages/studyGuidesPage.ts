import { defineArrayMember, defineField, defineType } from "sanity";

import { seoField } from "../../fields";
import {
  singletonDocumentIds,
  singletonDocumentRule,
} from "../../singletons";
import {
  limits,
  requiredString,
  requiredText,
} from "../../fields/validators";

export const studyGuidesPage = defineType({
  name: "studyGuidesPage",
  title: "Study guides page",
  type: "document",
  description: `Study guides listing page (singleton ID: \`${singletonDocumentIds.studyGuidesPage}\`).`,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "featured", title: "Featured guides" },
    { name: "categories", title: "Guide categories" },
    { name: "checklist", title: "Study checklist" },
    { name: "resources", title: "Resources" },
    { name: "cta", title: "CTA banner" },
    { name: "seo", title: "SEO" },
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
          validation: (rule) => rule.max(limits.badge),
        }),
        defineField({
          name: "heading",
          title: "Heading",
          type: "string",
          validation: requiredString("Heading is required", limits.heading),
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 3,
          validation: requiredText("Description is required", 500),
        }),
        defineField({
          name: "cta",
          title: "CTA",
          type: "ctaLink",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "image",
          title: "Hero image",
          type: "imageWithAlt",
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featuredGuides",
      title: "Featured guides",
      type: "sectionHeader",
      group: "featured",
      description: "Section intro — guides come from the Guides collection.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "guideCategories",
      title: "Guide categories",
      type: "object",
      group: "categories",
      fields: [
        defineField({
          name: "header",
          title: "Section header",
          type: "sectionHeader",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "categories",
          title: "Categories",
          type: "array",
          of: [
            defineArrayMember({
              type: "reference",
              to: [{ type: "studyGuideCategory" }],
            }),
          ],
          validation: (rule) => rule.required().min(1),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "studyChecklist",
      title: "Study checklist",
      type: "object",
      group: "checklist",
      fields: [
        defineField({
          name: "header",
          title: "Section header",
          type: "sectionHeader",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "items",
          title: "Checklist items",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "checklistItem",
              fields: [
                defineField({ name: "title", type: "string", validation: requiredString("Title required", 120) }),
                defineField({ name: "description", type: "text", rows: 2, validation: (rule) => rule.required().max(300) }),
              ],
              preview: { select: { title: "title" } },
            }),
          ],
          validation: (rule) => rule.required().min(1),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "resources",
      title: "Resources",
      type: "object",
      group: "resources",
      fields: [
        defineField({
          name: "header",
          title: "Section header",
          type: "sectionHeader",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "links",
          title: "Resource links",
          type: "array",
          of: [defineArrayMember({ type: "contentLink" })],
          validation: (rule) => rule.required().min(1),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "cta",
      title: "CTA banner",
      type: "ctaBanner",
      group: "cta",
      validation: (rule) => rule.required(),
    }),
    seoField(),
  ],
  preview: {
    prepare() {
      return { title: "Study guides page" };
    },
  },
  validation: singletonDocumentRule("studyGuidesPage"),
});
