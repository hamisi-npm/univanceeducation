import { defineArrayMember, defineField, defineType } from "sanity";

import { seoField } from "../../fields";
import {
  limits,
  requiredString,
  requiredText,
} from "../../fields/validators";
import {
  singletonDocumentIds,
  singletonDocumentRule,
} from "../../singletons";

export const programsPage = defineType({
  name: "programsPage",
  title: "Programs page",
  type: "document",
  description: `Programs listing page (singleton ID: \`${singletonDocumentIds.programsPage}\`).`,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "stats", title: "Statistics" },
    { name: "filters", title: "Filters" },
    { name: "results", title: "Results" },
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
          validation: requiredText("Description is required", 600),
        }),
        defineField({
          name: "image",
          title: "Hero image",
          type: "imageWithAlt",
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "statistics",
      title: "Statistics",
      type: "array",
      group: "stats",
      of: [
        defineArrayMember({
          type: "object",
          name: "programStat",
          fields: [
            defineField({
              name: "value",
              title: "Value",
              type: "string",
              validation: requiredString("Value is required", 24),
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: requiredString("Label is required", limits.shortLabel),
            }),
          ],
          preview: {
            select: { title: "value", subtitle: "label" },
          },
        }),
      ],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: "filters",
      title: "Filter section",
      type: "object",
      group: "filters",
      fields: [
        defineField({
          name: "heading",
          title: "Heading",
          type: "string",
          validation: (rule) => rule.max(limits.heading),
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 2,
          validation: (rule) => rule.max(300),
        }),
        defineField({
          name: "destinationLabel",
          title: "Destination label",
          type: "string",
          initialValue: "Destination",
          validation: requiredString("Destination label is required", limits.shortLabel),
        }),
        defineField({
          name: "universityLabel",
          title: "University label",
          type: "string",
          initialValue: "University",
          validation: requiredString("University label is required", limits.shortLabel),
        }),
        defineField({
          name: "categoryLabel",
          title: "Category label",
          type: "string",
          initialValue: "Category",
          validation: requiredString("Category label is required", limits.shortLabel),
        }),
        defineField({
          name: "levelLabel",
          title: "Study level label",
          type: "string",
          initialValue: "Study level",
          validation: requiredString("Study level label is required", limits.shortLabel),
        }),
        defineField({
          name: "keywordLabel",
          title: "Keyword label",
          type: "string",
          initialValue: "Search",
          validation: requiredString("Keyword label is required", limits.shortLabel),
        }),
        defineField({
          name: "keywordPlaceholder",
          title: "Keyword placeholder",
          type: "string",
          initialValue: "Search programs…",
          validation: requiredString(
            "Keyword placeholder is required",
            limits.shortLabel,
          ),
        }),
        defineField({
          name: "submitLabel",
          title: "Submit button label",
          type: "string",
          initialValue: "Apply filters",
          validation: requiredString("Submit label is required", limits.shortLabel),
        }),
        defineField({
          name: "clearLabel",
          title: "Clear filters label",
          type: "string",
          initialValue: "Clear all",
          validation: requiredString("Clear label is required", limits.shortLabel),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "resultsCountLabel",
      title: "Results count label",
      type: "string",
      group: "results",
      description: 'Use {count} as a placeholder, e.g. "{count} programs found"',
      initialValue: "{count} programs found",
      validation: requiredString("Results count label is required", 120),
    }),
    defineField({
      name: "emptyState",
      title: "Empty state",
      type: "object",
      group: "results",
      fields: [
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
          validation: requiredText("Description is required", 400),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "ctaBanner",
      title: "CTA banner",
      type: "object",
      group: "cta",
      fields: [
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
          validation: requiredText("Description is required", 400),
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
    seoField(),
  ],
  validation: singletonDocumentRule("programsPage"),
  preview: {
    prepare: () => ({ title: "Programs page" }),
  },
});
