import { defineArrayMember, defineField, defineType } from "sanity";

import { legalPageDocumentIds, uniqueFieldDocumentRule } from "../../singletons";
import { legalPageKindOptions } from "../../fields/iconOptions";
import { seoField } from "../../fields";
import {
  limits,
  requiredString,
} from "../../fields/validators";

export const legalPage = defineType({
  name: "legalPage",
  title: "Legal page",
  type: "document",
  description: `Privacy policy or terms page. Fixed IDs: \`${legalPageDocumentIds.privacy}\`, \`${legalPageDocumentIds.terms}\`.`,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "kind",
      title: "Page type",
      type: "string",
      group: "content",
      options: {
        list: [...legalPageKindOptions],
        layout: "radio",
      },
      validation: (rule) => rule.required().error("Select privacy or terms"),
    }),
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      group: "content",
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
          rows: 2,
          validation: (rule) => rule.max(300),
        }),
        defineField({
          name: "lastUpdated",
          title: "Last updated",
          type: "date",
          validation: (rule) => rule.required().error("Last updated date is required"),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "object",
          name: "legalSection",
          fields: [
            defineField({
              name: "heading",
              title: "Heading",
              type: "string",
              validation: requiredString("Section heading is required", limits.heading),
            }),
            defineField({
              name: "paragraphs",
              title: "Content",
              type: "richText",
              validation: (rule) =>
                rule.required().error("Section content is required").min(1),
            }),
            defineField({
              name: "listItems",
              title: "List items",
              type: "array",
              of: [defineArrayMember({ type: "string" })],
            }),
          ],
          preview: {
            select: { title: "heading" },
          },
        }),
      ],
      validation: (rule) =>
        rule.required().min(1).error("At least one section is required"),
    }),
    seoField(),
  ],
  preview: {
    select: {
      kind: "kind",
      title: "hero.heading",
    },
    prepare({ kind, title }) {
      const label = kind === "privacy" ? "Privacy policy" : kind === "terms" ? "Terms" : "Legal page";
      return {
        title: title || label,
        subtitle: label,
      };
    },
  },
  validation: uniqueFieldDocumentRule("legalPage", "kind"),
});
