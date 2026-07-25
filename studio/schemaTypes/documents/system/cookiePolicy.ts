import { defineArrayMember, defineField, defineType } from "sanity";

import { seoField } from "../../fields";
import { limits, requiredString } from "../../fields/validators";
import { singletonDocumentRule } from "../../singletons";
import { cookiePolicyDocumentId } from "./ids";

const cookieCategoryFields = [
  defineField({
    name: "title",
    title: "Title",
    type: "string",
    validation: requiredString("Title is required", limits.shortLabel),
  }),
  defineField({
    name: "description",
    title: "Description",
    type: "text",
    rows: 3,
    validation: (rule) =>
      rule.required().error("Description is required").max(800),
  }),
  defineField({
    name: "examples",
    title: "Examples",
    type: "array",
    of: [defineArrayMember({ type: "string" })],
  }),
  defineField({
    name: "retention",
    title: "Retention",
    type: "string",
    validation: (rule) => rule.max(200),
  }),
];

export const cookiePolicy = defineType({
  name: "cookiePolicy",
  title: "Cookie policy",
  type: "document",
  description: `Cookie policy singleton (ID: \`${cookiePolicyDocumentId}\`).`,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "categories", title: "Categories" },
    { name: "thirdParty", title: "Third parties" },
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
    defineField({
      name: "lastUpdated",
      title: "Last updated",
      type: "date",
      group: "content",
      validation: (rule) => rule.required().error("Last updated is required"),
    }),
    defineField({
      name: "introduction",
      title: "Introduction",
      type: "richText",
      group: "content",
      validation: (rule) =>
        rule.required().error("Introduction is required").min(1),
    }),
    defineField({
      name: "necessary",
      title: "Necessary cookies",
      type: "object",
      group: "categories",
      fields: cookieCategoryFields,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "functional",
      title: "Functional cookies",
      type: "object",
      group: "categories",
      fields: cookieCategoryFields,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "analytics",
      title: "Analytics cookies",
      type: "object",
      group: "categories",
      fields: cookieCategoryFields,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "marketing",
      title: "Marketing cookies",
      type: "object",
      group: "categories",
      fields: cookieCategoryFields,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "retentionSummary",
      title: "Retention summary",
      type: "text",
      rows: 3,
      group: "content",
      validation: (rule) => rule.max(800),
    }),
    defineField({
      name: "thirdPartyServices",
      title: "Third-party services",
      type: "array",
      group: "thirdParty",
      of: [
        defineArrayMember({
          type: "object",
          name: "thirdPartyService",
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "string",
              validation: requiredString("Name is required", limits.shortLabel),
            }),
            defineField({
              name: "purpose",
              title: "Purpose",
              type: "text",
              rows: 2,
              validation: (rule) =>
                rule.required().error("Purpose is required").max(400),
            }),
            defineField({
              name: "privacyUrl",
              title: "Privacy policy URL",
              type: "url",
            }),
          ],
          preview: {
            select: { title: "name", subtitle: "purpose" },
          },
        }),
      ],
    }),
    seoField(),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return {
        title: title || "Cookie policy",
        subtitle: "Legal",
      };
    },
  },
  validation: singletonDocumentRule("cookiePolicy"),
});
