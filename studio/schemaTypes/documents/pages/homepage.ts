import { defineArrayMember, defineField, defineType } from "sanity";

import {
  singletonDocumentIds,
  singletonDocumentRule,
} from "../../singletons";
import { limits, requiredString } from "../../fields/validators";

export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  description: `Homepage sections (singleton ID: \`${singletonDocumentIds.homepage}\`).`,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "finder", title: "Program finder" },
    { name: "services", title: "Services" },
    { name: "destinations", title: "Destinations" },
    { name: "why", title: "Why choose us" },
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
          title: "Eyebrow / badge",
          type: "heroBadge",
          validation: (rule) => rule.required().error("Hero badge is required"),
        }),
        defineField({
          name: "headline",
          title: "Headline",
          type: "string",
          validation: requiredString("Headline is required", limits.heading),
        }),
        defineField({
          name: "subheadline",
          title: "Subheadline",
          type: "text",
          rows: 3,
          validation: (rule) => rule.required().max(500),
        }),
        defineField({
          name: "trustMicrocopy",
          title: "Trust microcopy",
          type: "string",
          validation: (rule) => rule.max(200),
        }),
        defineField({
          name: "ctas",
          title: "CTAs",
          type: "object",
          fields: [
            defineField({
              name: "primary",
              title: "Primary CTA",
              type: "ctaLink",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "secondary",
              title: "Secondary CTA",
              type: "ctaLink",
              validation: (rule) => rule.required(),
            }),
          ],
        }),
        defineField({
          name: "image",
          title: "Hero image",
          type: "imageWithAlt",
          validation: (rule) => rule.required().error("Hero image is required"),
        }),
      ],
      validation: (rule) => rule.required().error("Hero section is required"),
    }),
    defineField({
      name: "trustStats",
      title: "Hero statistics",
      type: "array",
      group: "hero",
      description: "Exactly three stats shown under the hero CTAs.",
      of: [defineArrayMember({ type: "statistic" })],
      validation: (rule) =>
        rule.required().min(3).max(3).error("Exactly 3 trust statistics are required"),
    }),
    defineField({
      name: "programFinder",
      title: "Program finder",
      type: "programFinder",
      group: "finder",
      validation: (rule) => rule.required().error("Program finder is required"),
    }),
    defineField({
      name: "servicesPreview",
      title: "Featured services",
      type: "object",
      group: "services",
      fields: [
        defineField({
          name: "header",
          title: "Section header",
          type: "sectionHeader",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "services",
          title: "Services",
          type: "array",
          of: [
            defineArrayMember({
              type: "reference",
              to: [{ type: "service" }],
            }),
          ],
          validation: (rule) =>
            rule.required().min(1).error("Select at least one service"),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featuredDestinations",
      title: "Featured destinations",
      type: "object",
      group: "destinations",
      fields: [
        defineField({
          name: "header",
          title: "Section header",
          type: "sectionHeader",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "viewAll",
          title: "View all link",
          type: "ctaLink",
          description: 'e.g. "View All Destinations" → /destinations',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "destinations",
          title: "Destinations",
          type: "array",
          of: [
            defineArrayMember({
              type: "reference",
              to: [{ type: "destination" }],
            }),
          ],
          validation: (rule) =>
            rule.required().min(1).error("Select at least one destination"),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "whyChooseUs",
      title: "Why choose us",
      type: "object",
      group: "why",
      fields: [
        defineField({
          name: "header",
          title: "Section header",
          type: "sectionHeader",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "features",
          title: "Features",
          type: "array",
          of: [defineArrayMember({ type: "whyChooseUsFeature" })],
          validation: (rule) =>
            rule.required().min(1).max(4).error("Add 1–4 features"),
        }),
        defineField({
          name: "cta",
          title: "Section CTA",
          type: "ctaLink",
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "ctaBanner",
      title: "CTA banner",
      type: "ctaBanner",
      group: "cta",
      description: 'e.g. "Have Questions? We\'re Here to Help!"',
      validation: (rule) => rule.required().error("CTA banner is required"),
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Homepage" };
    },
  },
  validation: singletonDocumentRule("homepage"),
});
