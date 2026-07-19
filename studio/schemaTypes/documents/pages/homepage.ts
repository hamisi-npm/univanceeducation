import { defineArrayMember, defineField, defineType } from "sanity";

import {
  singletonDocumentIds,
  singletonDocumentRule,
} from "../../singletons";
import {
  limits,
  requiredHref,
  requiredString,
} from "../../fields/validators";

export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  description: `Homepage sections (singleton ID: \`${singletonDocumentIds.homepage}\`).`,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "trust", title: "Trust" },
    { name: "services", title: "Services" },
    { name: "destinations", title: "Destinations" },
    { name: "process", title: "Process" },
    { name: "testimonials", title: "Testimonials" },
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
        defineField({
          name: "floatingCards",
          title: "Floating cards",
          type: "array",
          of: [defineArrayMember({ type: "heroFloatingCard" })],
          validation: (rule) => rule.max(4),
        }),
      ],
      validation: (rule) => rule.required().error("Hero section is required"),
    }),
    defineField({
      name: "trustStats",
      title: "Trust statistics",
      type: "array",
      group: "trust",
      of: [defineArrayMember({ type: "statistic" })],
      validation: (rule) =>
        rule.required().min(3).max(3).error("Exactly 3 trust statistics are required"),
    }),
    defineField({
      name: "trustedUniversities",
      title: "Trusted universities",
      type: "object",
      group: "trust",
      fields: [
        defineField({
          name: "heading",
          title: "Heading",
          type: "string",
          validation: requiredString("Heading is required", limits.heading),
        }),
        defineField({
          name: "partners",
          title: "Partner universities",
          type: "array",
          of: [
            defineArrayMember({
              type: "reference",
              to: [{ type: "partnerUniversity" }],
            }),
          ],
          validation: (rule) =>
            rule.required().min(1).error("Add at least one partner university"),
        }),
      ],
      validation: (rule) => rule.required(),
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
      name: "processPreview",
      title: "Application process",
      type: "object",
      group: "process",
      fields: [
        defineField({
          name: "header",
          title: "Section header",
          type: "sectionHeader",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "steps",
          title: "Process steps",
          type: "array",
          of: [
            defineArrayMember({
              type: "reference",
              to: [{ type: "processStep" }],
            }),
          ],
          validation: (rule) =>
            rule.required().min(1).error("Add at least one process step"),
        }),
        defineField({
          name: "cta",
          title: "Section CTA",
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: requiredString("CTA label is required", limits.shortLabel),
            }),
            defineField({
              name: "href",
              title: "Link",
              type: "string",
              validation: requiredHref,
            }),
            defineField({
              name: "supportingText",
              title: "Supporting text",
              type: "string",
              validation: (rule) => rule.max(200),
            }),
          ],
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "testimonialsPreview",
      title: "Testimonials preview",
      type: "object",
      group: "testimonials",
      fields: [
        defineField({
          name: "header",
          title: "Section header",
          type: "sectionHeader",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "testimonials",
          title: "Testimonials",
          type: "array",
          of: [
            defineArrayMember({
              type: "reference",
              to: [{ type: "testimonial" }],
            }),
          ],
          validation: (rule) =>
            rule.required().min(1).error("Select at least one testimonial"),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "ctaBanner",
      title: "CTA banner",
      type: "ctaBanner",
      group: "cta",
      validation: (rule) => rule.required().error("CTA banner is required"),
    }),
  ],
  preview: {
    prepare() {
      return { title: "Homepage" };
    },
  },
  validation: singletonDocumentRule("homepage"),
});
