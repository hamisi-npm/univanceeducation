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

export const servicesPage = defineType({
  name: "servicesPage",
  title: "Services page",
  type: "document",
  description: `Services listing page (singleton ID: \`${singletonDocumentIds.servicesPage}\`).`,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "overview", title: "Overview" },
    { name: "details", title: "Service details" },
    { name: "process", title: "Process" },
    { name: "faq", title: "FAQ preview" },
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
      name: "overview",
      title: "Overview",
      type: "sectionHeader",
      group: "overview",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "serviceDetails",
      title: "Service details",
      type: "object",
      group: "details",
      description:
        "Section intro only — service content lives in the Services collection.",
      fields: [
        defineField({
          name: "header",
          title: "Section header",
          type: "sectionHeader",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "services",
          title: "Services to display",
          type: "array",
          description: "Optional order override. Leave empty to show all services.",
          of: [
            defineArrayMember({
              type: "reference",
              to: [{ type: "service" }],
            }),
          ],
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "processOverview",
      title: "Process overview",
      type: "sectionHeader",
      group: "process",
      description: "Intro copy — process steps come from the Process Steps collection.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "faqPreview",
      title: "FAQ preview",
      type: "faqPreview",
      group: "faq",
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
      return { title: "Services page" };
    },
  },
  validation: singletonDocumentRule("servicesPage"),
});
